---
id: multiple-nodes
title: Running Multiple Nodes
#toc_min_heading_level: 3
#toc_max_heading_level: 5
#hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Add a node to your Safe

Each additional node needs its own identity file, added to your existing Safe and node module. There is no waitlist: once the node is added, you can run it.

Run these steps on any computer with Docker Desktop. This can be your node machine if it is your own computer. Don't run them on a rented or shared server, because step 1.4 asks for a private key.

1. **Create the identity**

    Create an empty `hopr-identity` folder and create one identity in it, as described in [Create your node identity](./node-docker.md#create-your-node-identity-safe-and-node-module) (steps 2.2 and 2.3). Use `--number 1`. The folder must contain only the new identity file, `hopr0.id`, so the next step shows only its address.

2. **Read the new node's address**

    **Linux / macOS** (Terminal):

    ```bash
    docker run --rm -it --pull always \
    -v ~/hopr-identity:/data \
    -e IDENTITY_PASSWORD='<YOUR_IDENTITY_PASSWORD>' \
    europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest \
    identity read \
    --identity-directory /data
    ```

    **Windows** (PowerShell):

    ```powershell
    docker run --rm -it --pull always `
    -v "$HOME\hopr-identity:/data" `
    -e 'IDENTITY_PASSWORD=<YOUR_IDENTITY_PASSWORD>' `
    europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
    identity read `
    --identity-directory /data
    ```

    The output shows the node address in square brackets. Write it down without the brackets. Example:

    ```text
    Identity addresses: [0x24046f39f0a4ef55dbe975e70ea0c6ac9a2d970e]
    ```

3. **Gather the values for adding the node**

    | Placeholder | What it is | Where to find it |
    |---|---|---|
    | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint, used only for this command. Your node doesn't need it. | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
    | `<SAFE_ADDRESS>` | Your existing Safe | The `--safeAddress` value of your first node, or `hopr.safe_module.safe_address` in its `hoprd.cfg.yaml` for Docker Compose. |
    | `<MODULE_ADDRESS>` | Your existing node module | The `--moduleAddress` value of your first node, or `hopr.safe_module.module_address` in its `hoprd.cfg.yaml` for Docker Compose. |
    | `<NODE_ADDRESS>` | The address of the new node | The address from step 1.2. |

4. **Add the node to your Safe and node module**

    :::important
    Before you run the command, create a new **burner wallet** (a fresh wallet with no other funds) and send it `0.02 xDai`. The command asks for this wallet's private key and uses it only to pay the transaction fees, so you never need to paste your Safe owner's private key.
    :::

    Replace every value in `<...>` with your own from the previous step. Then run the command for your system. Only the line-continuation character differs.

    **Linux / macOS** (Terminal):

    ```bash
    docker run --rm -it --pull always \
    europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest \
    safe-module add-node \
    --network piz-palu-prod \
    --provider-url <YOUR_RPC_PROVIDER_URL> \
    --safe-address <SAFE_ADDRESS> \
    --module-address <MODULE_ADDRESS> \
    --node-address <NODE_ADDRESS>
    ```

    **Windows** (PowerShell):

    ```powershell
    docker run --rm -it --pull always `
    europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
    safe-module add-node `
    --network piz-palu-prod `
    --provider-url <YOUR_RPC_PROVIDER_URL> `
    --safe-address <SAFE_ADDRESS> `
    --module-address <MODULE_ADDRESS> `
    --node-address <NODE_ADDRESS>
    ```

    At the **Enter private key:** prompt, paste the private key of your **burner wallet** and press Enter. Nothing appears on screen while you paste, which is expected.

5. **Move the identity file to your node machine**

    - In the `hopr-identity` folder, rename `hopr0.id` to `hopr.id`.
    - Copy it into the second node's folder: `~/hoprd-2` for Docker, or `hoprd/conf` inside the **HOPRd-node-2** folder for Docker Compose.
    - Keep a backup of `hopr.id` and its password somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.

---

## Select method to run additional node

Please select Docker method to run multiple nodes:

<Tabs queryString="multi_nodes">
<TabItem value="docker" label="Docker">

To run several nodes on the same machine, give each node its own folder, container name and ports. Ports must not overlap between nodes on the same machine.

Start from the [Docker command](./node-docker.md#configure-hoprd-command) and change these values for the second node:

| Setting | First node | Second node |
|---|---|---|
| Node folder | `-v $HOME/hoprd/:/app/hoprd-db` | `-v $HOME/hoprd-2/:/app/hoprd-db` |
| Container name | `--name hoprd` | `--name hoprd-2` |
| P2P port | `-p 9091:9091/tcp -p 9091:9091/udp` and `hopr.host.port: 9091` | `-p 9092:9092/tcp -p 9092:9092/udp` and `hopr.host.port: 9092` |
| API port | `-p 3001:3001` | `-p 3002:3001` |
| Session port | `-p 1422:1422/udp -p 1422:1422/tcp` | `-p 1423:1423/udp -p 1423:1423/tcp` |
| Configuration file | `~/hoprd/hoprd-docker.cfg.yaml` | `~/hoprd-2/hoprd-docker.cfg.yaml`: a copy with `hopr.host.port: 9092` and the second node's identity password |
| Identity file | `~/hoprd/hopr.id` | `~/hoprd-2/hopr.id`, the second node's own file |

</TabItem>
<TabItem value="docker-compose" label="Docker compose">

:::note

Metrics setup is not supported when running multiple nodes on the same machine.

:::

To operate multiple nodes on the same device or VPS, you must use distinct "compose" folders for each node and ensure that their assigned ports do not overlap. To set up an additional node, follow these steps to avoid conflicts and ensure proper operation:

1. **Change the folder name**

    Change the folder name of your first node from **compose** to **HOPRd-node-1**.

2. **Copy the first node folder**

    Make a copy of a first node folder **HOPRd-node-1** and rename to **HOPRd-node-2** to differentiate this node's environment.

3. **Modify the environment variables**

    Make adjustments in the **.env** file within your new **HOPRd-node-2** folder, assuming you are using the default ports:
    
    - Change the **HOPRD_API_PORT** from `3001` to `3002`.
    - Adjust the **HOPRD_P2P_PORT** from `9091` to `9092`.

4. **Modify secret environment variables**

    Modify secret environment variables, make adjustments if needed under **.env-secrets** file within your new **HOPRd-node-2** folder.

5. **Modify the docker compose file**

    Make adjustments in the **docker-compose.yml** file within your new **HOPRd-node-2** folder:

    Under **services.hoprd**, change the **container_name** from `hoprd` to `hoprd-2`.

6. **Configure your node**

    Inside the **HOPRd-node-2** folder, open `hoprd/conf/hoprd.cfg.yaml` and change `hopr.host.port` from `9091` to `9092`.

7. **Copy the identity file**

    Copy the second node's identity file from [Add a node to your Safe](#add-a-node-to-your-safe) into `hoprd/conf` inside the **HOPRd-node-2** folder and name it `hopr.id`.

8. **Launch Docker Compose**

    When running multiple nodes, for the second node, you only need to use the **hoprd** profile. Ensure you are in the **HOPRd-node-2** folder when executing the command:

    ```md
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

These changes ensure that each node operates independently without interference, allowing for efficient management and scalability.

</TabItem>
</Tabs>

## Fund your node with xDai

When the second node starts, it shows its address and waits until it has xDai. Find the address with `docker logs hoprd-2 2>&1 | grep "blockchain_address"` and send at least `0.01 xDai` to it. Look for `node announced successfully` in `docker logs -f hoprd-2`.
