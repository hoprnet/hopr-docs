---
id: multiple-nodes
title: Running multiple nodes
#toc_min_heading_level: 3
#toc_max_heading_level: 5
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Please select Docker method to run multiple nodes:

<Tabs>
<TabItem value="docker_multiple_nodes" label="Docker">

:::info important

When running multiple nodes without a local RPC provider, it is essential to use a different RPC provider for each node. This ensures optimal performance and prevents potential conflicts due to RPC provider limitations. For more details about RPC providers, you can find information [here](./custom-rpc-provider.md).

:::

To run multiple nodes on the same device or VPS, change the ports associated with your node and the location of your node database. Every node has to have different ports and they should not match between each nodes you are running on the same device or VPS.

For example, the second node should make these changes:

- Change `-p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001` to `-p 9092:9092/tcp -p 9092:9092/udp -p 3002:3002`
- Change `-v $HOME/.hoprd-db-dufour:/app/hoprd-db` to `-v $HOME/.hoprd-db-dufour-2:/app/hoprd-db`
- Add `--apiPort 3002` (where first defaults to 3001)
- Make sure to suffix your IP address with the new port instead of `9091` in this example it would now be `9092`
- Give a different name to your second node by changing `--name hoprd` to `--name hoprd-2`

All these changes implemented would be similar to the following:

![New Node Comparison](/img/node/new-node-comparison.png)

Here, the first node's command (on the left in the image above) is:

```md
docker run --pull always -d --restart on-failure -m 2g --security-opt seccomp=unconfined --platform linux/x86_64 --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db --name hoprd -p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001 -e RUST_LOG=info europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable --network dufour --init --api --announce --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --apiHost '0.0.0.0' --apiToken '<YOUR_SECURITY_TOKEN>' --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <MODULE_ADDRESS> --host <YOUR_PUBLIC_IP>:9091 --provider <CUSTOM_RPC_PROVIDER>
```
And the second node's command (on the right in the image above) is:

```md
docker run --pull always -d --restart on-failure -m 2g --security-opt seccomp=unconfined --platform linux/x86_64 --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour-2:/app/hoprd-db --name hoprd-2 -p 9092:9092/tcp -p 9092:9092/udp -p 3002:3002 -e RUST_LOG=info europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable --network dufour --init --api --announce --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --apiHost '0.0.0.0' --apiPort 3002 --apiToken '<YOUR_SECURITY_TOKEN>' --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <MODULE_ADDRESS> --host <YOUR_PUBLIC_IP>:9092 --provider <CUSTOM_RPC_PROVIDER>
```

</TabItem>
<TabItem value="docker_compose_multiple_nodes" label="Docker compose">

Below, we will explain how to start a single node using Docker Compose and how to add an additional node.

## Run a single node

Docker Compose provides a sophisticated setup, allowing the use of a configuration file and node monitoring tools to enhance your node management experience.

(**1**) Download the "compose" Folder, start by downloading the "compose" folder from the HOPR repository to your local machine:

```md
wget -O saint-louis.zip https://github.com/hoprnet/hoprnet/archive/refs/heads/master.zip && unzip saint-louis.zip "hoprnet-master/deploy/compose/*" -d extracted_files && mv extracted_files/hoprnet-master/deploy/compose . && rm -rf saint-louis.zip extracted_files
```

(**2**) Set up environment variables, inside "**compose**" folder, rename `.env.sample` to `.env`:

```md
mv .env.sample .env
```

Adjust the following environment variables as needed:

- "**HOPRD_API_PORT**": The REST API port, default is **3001**. (Connects your node with the HOPR Admin UI)
- "**HOPRD_P2P_PORT**": The peer-to-peer communication port, default is **9091**. (This port should be exposed to enable external connections to your node)

(**3**) Set up secrets environment variables, inside "**compose**" folder, rename `.env-secrets.sample` to `.env-secrets`:

```md
mv .env-secrets.sample .env-secrets
```

Adjust the following secrets environment variables as needed:

- "**HOPRD_PASSWORD**": Please replace "**\<YOUR HOPRD IDENTITY PASSWORD>**" with the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on how to create a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

- "**HOPRD_API_TOKEN**": Replace the "**\<YOUR HOPRD API TOKEN>**" within your docker command with your own security token which is required to connect to your node via Admin UI or REST API. For guidance on how to create a secure secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

(**4**) Configure node strategies. Inside the "**compose**" folder, navigate to the "**hoprd_data**" folder and edit the "**hoprd.cfg.yaml**" file. Make adjustments according to these [guidelines](./manage-node-strategies.md) (refer to the "**Docker Compose**" section).

(**5**) Set up Prometheus to monitor your node’s performance. (**Note:** This step is optional and only supports monitoring a single node running on the same machine.)

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

(**6**) Manage the identity file. If you have previously run a node, transfer the identity file to the "**hoprd_data**" folder inside the "**compose**" folder, and rename it to `hopr.id`. If this is your first time running a node, the **hopr.id** file will be automatically generated when the HOPRd node is launched.

(**7**) Launch Docker Compose, which supports multiple profiles. Use "**hoprd**" for the node and "**admin-ui**" for the user interface. Make sure you are in the "**compose**" folder when executing these commands:

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

---

## Run additional node on the same machine

:::info important

- When running multiple nodes without a local RPC provider, it's crucial to assign a different RPC provider to each node. This ensures optimal performance and avoids potential conflicts caused by RPC provider limitations. For more information about RPC providers, refer to [this guide](./custom-rpc-provider.md).

- If you're running multiple nodes on the same machine, note that metrics setup is not supported in this configuration.

:::

To operate multiple nodes on the same device or VPS, you must use distinct "compose" folders for each node and ensure that their assigned ports do not overlap. To set up an additional node, follow these steps to avoid conflicts and ensure proper operation:

(**1**) Change the folder name of your first node from "**compose**" to "**HOPRd-node-1**".

(**2**) Make a copy of a first node folder "**HOPRd-node-1**" and rename to "**HOPRd-node-2**" to differentiate this node's environment.

(**3**) Modify the environment variables. Make adjustments in the "**.env**" file within your new "**HOPRd-node-2**" folder, assuming you are using the default ports:
    
- Change the "**HOPRD_API_PORT**" from `3001` to `3002`.
- Adjust the "**HOPRD_P2P_PORT**" from `9091` to `9092`.

(**4**) Modify secret environment variables, make adjustments if needed under "**.env-secrets**" file within your new "**HOPRd-node-2**" folder.

(**5**) Configure node strategies, inside "**HOPRd-node-2**" folder, navigate to "**hoprd_data**" folder and edit "**hoprd.cfg.yaml**" file, assuming you are using the same safe wallet:

- **port**: Change port from `9091` to `9092`.

(**6**) Manage the identity file. If you have previously run a second node, transfer the identity file to the "**hoprd_data**" folder inside the "**HOPRd-node-2**" folder, and rename it to `hopr.id`. If this is your first time running a second node, the **hopr.id** file will be automatically generated when the HOPRd node is launched.

(**7**) Launch Docker Compose. When running multiple nodes, for the second node, you only need to use the "**hoprd**" profile. Ensure you are in the "**HOPRd-node-2**" folder when executing the command:

```md
COMPOSE_PROFILES=hoprd docker compose up -d
```

These changes ensure that each node operates independently without interference, allowing for efficient management and scalability.

</TabItem>
</Tabs>