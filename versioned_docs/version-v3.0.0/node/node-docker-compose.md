---
id: node-docker-compose
title: For Docker Compose
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must complete the onboarding process before setting up your node. To begin, visit the [Overview](./run-a-node-overview.md) page. Once you have your Safe and Module addresses, you can proceed here.

:::

Setting up a HOPR node with Docker Compose is intended for advanced users. It provides a sophisticated setup, allowing the use of a configuration file and node monitoring tools to enhance the node management experience.

## Download "compose" folder

Start by downloading the "compose" folder from the HOPR repository to your local machine:

```bash
wget https://github.com/hoprnet/hoprnet/archive/refs/heads/release/kaunas.zip && unzip kaunas.zip "hoprnet-release-kaunas/deploy/compose/*" -d extracted_files && mv extracted_files/hoprnet-release-kaunas/deploy/compose . && rm -rf kaunas.zip extracted_files
```

---

## Set up environment variables

Inside the `compose` folder, rename `.env.sample` to `.env`:

```bash
mv .env.sample .env
```

Adjust the following environment variables in the `.env` file:

- `HOPRD_API_PORT`:  
  Sets the REST API port. Default is `3001`.  
  This connects your node to the HOPR Admin UI.

- `HOPRD_P2P_PORT`:  
  Sets the peer-to-peer communication port. Default is `9091`.  
  If you plan to run your node behind NAT (e.g., at home or in an office), you must expose port `9091` to the public so other nodes can connect.  

  For help, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding). This port must remain open to allow external peer connections.

---

## Set up secrets environment variables

Inside the `compose` folder, rename `.env-secrets.sample` to `.env-secrets`:

```bash
mv .env-secrets.sample .env-secrets
```

Adjust the following secrets environment variables in the `.env-secrets` file:

- `HOPRD_PASSWORD`:  
  Replace the placeholder value `YOUR_HOPRD_IDENTITY_PASSWORD` with the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on how to create a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

- `HOPRD_API_TOKEN`:  
  Replace the placeholder `YOUR_HOPRD_API_TOKEN` within your docker command with your own security token which is required to connect to your node via HOPR Admin UI or REST API. For guidance on how to create a secure secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

---

## Configure node strategies

Inside the `compose` folder, navigate to the `hoprd/conf` subfolder and open the `hoprd.cfg.yaml` file.

Make adjustments according to these [configuration guidelines](./manage-node-strategies?config=docker-compose) under the **Docker Compose** section.

---

## (Optional) Setup Prometheus

Prometheus allows you to monitor your node’s performance. 

**Note:** This step is optional and only applies to a single node running on the same machine.

Inside the `compose` folder, navigate to the `prometheus` directory and open the `prometheus.yml` file. Update the following fields:

| Field            | Description                                                                                       | Default Value                                |
|------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------|
| `credentials`    | Secret token defined in your `HOPRD_API_TOKEN` (set in [Step 3](#set-up-secrets-environment-variables)).                                   | *(User-defined)*                             |
| `targets`        | API target port. Use `HOPRD_API_PORT`. Only change if port differs from the default.             | `3001`                                       |
| `job`            | Label to identify your node on the Grafana dashboard.                                             | `hoprd-node-1`                               |
| `namespace`      | Category/group label for your node. Useful for organization-wide node tracking.                  | `Specify the name of the company/investor`   |
| `hoprd_peer_id`  | Your HOPRd node's peer ID (starts with `12D3Ko...`). Can be added later if unknown.              | *(Optional – to be filled)*                  |
| `hoprd_address`  | Your HOPRd node's address (starts with `0x...`). Can also be filled in later.                    | *(Optional – to be filled)*                  |

:::info

After launching Docker Compose, access Grafana at: `http://<your-ip>:3030`

For example: [http://1.2.3.4:3030](http://1.2.3.4:3030)

Default login credentials:

- **Username**: `admin`  
- **Password**: `hopr`

:::

---

## Manage the identity file

If you've previously run a node, move your identity file into the `compose/hoprd/conf` folder and rename it to `hopr.id`.

If this is your first time running a node, the `hopr.id` file will be generated automatically when the HOPRd node is launched.

---

## Launch Docker Compose

Docker Compose supports multiple profiles.  
Use the `hoprd` profile for the node and the `admin-ui` profile for the user interface.

Make sure you're inside the `compose` folder before executing the following commands:

---

### To launch the HOPR node only: {#no-counter}

```bash
COMPOSE_PROFILES=hoprd docker compose up -d
```

### To launch the HOPR Admin UI only: {#no-counter}

```bash
COMPOSE_PROFILES=admin-ui docker compose up -d
```

### To launch both the HOPRd node and the HOPR Admin UI: {#no-counter}

```bash
COMPOSE_PROFILES=hoprd,admin-ui docker compose up -d
```

### To launch the HOPRd node, Admin UI, and metrics (if you completed Step 5): {#no-counter}

```bash
COMPOSE_PROFILES=hoprd,admin-ui,metrics,metrics-vis docker compose up -d
```

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

These are the requirements for Cover Traffic, which allows your node to start earning rewards.

Follow these steps:

1. Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

2. On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.

4. Navigate to the `CHANNELS: OUT` page to verify the outgoing payment channel has been successfully opened.

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).