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

## 1. Download "compose" folder

Start by downloading the "compose" folder from the HOPR repository to your local machine:

```md
wget https://github.com/hoprnet/hoprnet/archive/refs/heads/release/singapore.zip && unzip singapore.zip "hoprnet-release-singapore/deploy/compose/*" -d extracted_files && mv extracted_files/hoprnet-release-singapore/deploy/compose . && rm -rf singapore.zip extracted_files
```

## 2. Set up environment variables

Inside "**compose**" folder, rename `.env.sample` to `.env`:

```md
mv .env.sample .env
```

Adjust the following environment variables as needed:

- "**HOPRD_API_PORT**": The REST API port, default is **3001**. (Connects your node with the HOPR Admin UI)
- "**HOPRD_P2P_PORT**": The peer-to-peer communication port, default is **9091**. (If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port `9091` to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).This port should be exposed to enable external connections to your node).

## 3. Set up secrets environment variables

Inside "**compose**" folder, rename `.env-secrets.sample` to `.env-secrets`:

```md
mv .env-secrets.sample .env-secrets
```

Adjust the following secrets environment variables as needed:

- "**HOPRD_PASSWORD**": Please replace "**\<YOUR HOPRD IDENTITY PASSWORD>**" with the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on how to create a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

- "**HOPRD_API_TOKEN**": Replace the "**\<YOUR HOPRD API TOKEN>**" within your docker command with your own security token which is required to connect to your node via HOPR Admin UI or REST API. For guidance on how to create a secure secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

## 4. Configure node strategies

Inside the "**compose**" folder, navigate to the "**hoprd_data**" folder and edit the "**hoprd.cfg.yaml**" file. Make adjustments according to these [guidelines](./manage-node-strategies.md) (refer to the "**Docker Compose**" section).

## 5. Setup Prometheus

Set up Prometheus to monitor your node’s performance. (**Note:** This step is optional and only supports monitoring a single node running on the same machine.)

Inside the "**compose**" folder, navigate to the "**prometheus**" folder and edit the "**prometheus.yml**" file:

- **Credentials**: Enter your secret token, the same one you set in the "**HOPRD_API_TOKEN**" environment variable in step 3.
- **Targets**: If you haven’t changed the default API port (defined by the "**HOPRD_API_PORT**" environment variable), you can leave this setting as is. If you did change the port, update only the port number accordingly.
- **job**: This is a label to identify your node on the grafana dashboard. Default value is "**hoprd-node-1**", you can name it the way you like or leave as is.
- **namespace**: This label is like a category to which your node is assigned. Default value is "**Specify the name of the company/investor**", you can name it the way you like or leave as is.
- **hoprd_peer_id**: Enter your HOPRd node peerID (Starts with **12D3Ko...** ), if you don't have it yet, you can update this later.
- **hoprd_address**: Enter your HOPRd node address (Starts with **0x...** ), if you don't have it yet, you can update this later.

:::info

After completing the Docker Compose setup, you can access the Grafana dashboard by entering your VPS/machine IP along with the default Grafana port: **3030**.

For example: **http://1.2.3.4:3030**

The default login credentials are:

- **Username**: `admin`
- **Password**: `hopr`

:::

## 6. Manage the identity file

If you have previously run a node, transfer the identity file to the "**hoprd_data**" folder inside the "**compose**" folder, and rename it to `hopr.id`. If this is your first time running a node, the **hopr.id** file will be automatically generated when the HOPRd node is launched.

## 7. Launch Docker Compose

Docker compose supports multiple profiles. Use profile "**hoprd**" for the node and profile "**admin-ui**" for the user interface. Make sure you are in the "**compose**" folder when executing these commands:

**To launch the HOPR node only**:
  
```md
COMPOSE_PROFILES=hoprd docker compose up -d
```

**To launch the HOPR Admin UI only**:
```md
  COMPOSE_PROFILES=admin-ui docker compose up -d
```

**To launch both the HOPRd node and the HOPR Admin UI**:
```md
  COMPOSE_PROFILES=hoprd,admin-ui docker compose up -d
```

**To launch the HOPRd node, HOPR Admin UI, and metrics** (this applies if you completed step 5): 
```md
  COMPOSE_PROFILES=hoprd,admin-ui,metrics,metrics-vis docker compose up -d
```

## 8. What's next?

Once you’ve completed the onboarding process, ensure your node is fully synced (100%) and that you've opened at least one outgoing payment channel with a random peer. These are the requirements for Cover Traffic, which allows your node to start earning rewards. Follow these steps:

(**1**) Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) On the "**INFO**" page, under the "**Network**" section, confirm that the "**Sync Process**" is at "**100%**". If it’s not fully synced yet, you will need to wait until the process is complete.

(**3**) Once your node is fully synced, go to the "**PEERS**" page and select a random peer with a connection quality above 90%. Click the "**OPEN Outgoing Channel**" icon, enter **1** as the amount (or any other amount of your choice), and then click "**Open Channel**". Within a minute, you will receive a notification confirming that the payment channel has been opened.

(**4**) Navigate to the "**CHANNELS: OUT**" page to verify that the outgoing payment channel has been successfully opened.

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).