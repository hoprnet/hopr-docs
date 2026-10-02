---
id: node-docker-compose
title: Docker Compose
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

:::info

Please note that you must complete the onboarding process before setting up your node. To begin, visit the [Overview](./run-a-node-overview.md) page. Once you have your Safe and Module addresses, you can proceed here.

:::

Setting up a HOPR node with Docker Compose is intended for advanced users. It provides a sophisticated setup, allowing the use of a configuration file and node monitoring tools to enhance the node management experience.

## Download compose folder

Start by downloading the `compose` folder from the HOPR repository to your local machine:

```bash
curl -fL -o main.zip https://github.com/hoprnet/hoprd/archive/refs/heads/main.zip && unzip main.zip "hoprd-main/deploy/compose/*" -d extracted_files && mv extracted_files/hoprd-main/deploy/compose . && rm -rf main.zip extracted_files.
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

Make adjustments according to these [configuration guidelines](./manage-node-configuration?config=docker-compose) under the **Docker Compose** section.

---

## Manage the identity file

If you've previously run a node, move your identity file into the `compose/hoprd/conf` folder and rename it to `hopr.id`.

If this is your first time running a node, the `hopr.id` file will be generated automatically when the HOPRd node is launched.

---

## Launch Docker Compose

Docker Compose supports multiple profiles. Use the `hoprd` profile for the node and the `admin-ui` profile for the user interface. Make sure you're inside the `compose` folder before executing the following commands:

<NoCounter>

### To launch the HOPR node only:

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
</NoCounter>
---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

To start earning rewards through Cover Traffic, follow these steps to meet the necessary requirements:

1. **Install the HOPR Admin UI** 

   Install HOPR Admin UI and connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#installing-hopr-admin-ui).

2. **Check if the node is 100% synced**

   On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. **Open outgoing channel and verify**

   1. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.
   
   2. Navigate to the `CHANNELS: OUT` page to verify that the outgoing payment channel has been successfully opened. 

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).