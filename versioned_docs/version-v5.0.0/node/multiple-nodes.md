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

Each additional node needs its own identity file, added to your existing node module. You can add one node or several at once. There is no waitlist: once a node is added, you can run it.

You create the identities with Docker on any computer with Docker Desktop, then add the nodes in Safe\{Wallet\} with a wallet that is a signer of your Safe. You never paste a private key.

1. **Create the identities**

    Create an empty `hopr-identity` folder and create the identities in it, as described in [Create your node identity](./node-docker.md#create-your-node-identity-safe-and-node-module) (steps 2.2 and 2.3). Every node needs its own identity, so set `--number` to how many nodes you want to add: `--number 1` for one more node, `--number 3` for three. The files are named `hopr0.id`, `hopr1.id`, and so on.

    The folder must contain only these new identity files, so the next step shows only the new nodes' addresses.

2. **Read the new nodes' addresses**

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

    The output shows the node addresses in square brackets, one per identity, separated by commas. Copy the whole list, including the brackets: you paste it in step 1.4.4. Example for two identities:

    ```text
    Identity addresses: [0x24046f39f0a4ef55dbe975e70ea0c6ac9a2d970e, 0x8f1c2a6d3b4e5f60718293a4b5c6d7e8f9012345]
    ```

3. **Gather the values for adding the nodes**

    | What | Where to find it |
    |---|---|
    | Your node module address | The `--moduleAddress` value of your first node, or `hopr.safe_module.module_address` in its `hoprd.cfg.yaml` for Docker Compose. |
    | Your new nodes' addresses | The list from step 1.2, with the square brackets. |

4. **Add the nodes in Safe\{Wallet\}**

    You send one transaction from your Safe that calls `includeNodes` on your node module. Your Safe doesn't need any xDai for this: the signer wallet that executes the transaction pays the fee, so that wallet needs a small amount of xDai.

    1. **Open your Safe**

        Open your Safe in Safe\{Wallet\} with a wallet that is a signer of your Safe, as described in [Open your Safe](./staking-hub.md#open-your-safe).

    2. **Open Transaction Builder**

        Click **New transaction**, then **Transaction Builder**. If Safe\{Wallet\} shows a disclaimer about third-party apps, read it, select the checkbox to agree, then click **Continue**.

    3. **Enter your node module address**

        In **Enter Address or ENS Name**, paste your node module address. The node module is a proxy contract, so Transaction Builder asks which ABI to use: click **Use Implementation ABI**.

    4. **Fill in the includeNodes call**

        - In **Contract Method Selector**, select `includeNodes`.
        - In **nodeAddresses (address[])**, paste the list of addresses from step 1.2, with the square brackets, for example `[0x24046f39f0a4ef55dbe975e70ea0c6ac9a2d970e]`. With several identities, the list adds all the new nodes in one transaction.
        - Leave the **XDAI value** at `0`.

    5. **Create the batch**

        Click **Add new transaction**, then **Create Batch**.

    6. **Send the batch**

        Check the transaction, click **Send Batch**, and sign and execute it with your wallet. If your Safe needs more than one confirmation, the other signers confirm the transaction in Safe\{Wallet\} before it can be executed.

5. **Move the identity files to your node machines**

    Each node gets one identity file, renamed to `hopr.id`:

    - Copy `hopr0.id` into the second node's folder: `~/hoprd-2` for Docker, or `hoprd/conf` inside the **HOPRd-node-2** folder for Docker Compose. Rename it to `hopr.id`.
    - If you created more identities, copy `hopr1.id` into the third node's folder (`~/hoprd-3` or **HOPRd-node-3**), and so on. Rename each one to `hopr.id`.
    - Keep a backup of every identity file and its password somewhere safe outside the node folders. Note which file went to which node, then delete the temporary `hopr-identity` folder.

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
