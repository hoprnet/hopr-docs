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
wget -O saint-louis.zip https://github.com/hoprnet/hoprnet/archive/refs/heads/release/saint-louis.zip && unzip saint-louis.zip "hoprnet-release-saint-louis/deploy/compose/*" -d extracted_files && mv extracted_files/hoprnet-release-saint-louis/deploy/compose . && rm -rf saint-louis.zip extracted_files
```

(**2**) Set Up Environment Variables, inside "**compose**" folder, rename `.env.example` to `.env`:

```md
mv .env.example .env
```

Adjust the following environment variables as needed:

- "**HOPRD_API_PORT**": The REST API port, default is **3001**. (Connects your node with the Admin UI)
- "**HOPRD_P2P_PORT**": The peer-to-peer communication port, default is **9091**. (This port should be exposed to enable external connections to your node)

(**3**) Configure the YAML file, modify the configuration file "**hoprd.cfg.yaml**" according to these [guidelines][TUTORIAL].

(**4**) Manage the identity file. If you have previously run a node, transfer the identity file to the "**compose**" folder and rename it to `hopr.id`. If this is your first time running a node, the "**hopr.id**" file will be automatically generated upon launching the HOPRd node.

(**5**) Launch Docker Compose, which supports multiple profiles. Use "**hoprd**" for the node and "**admin-ui**" for the user interface. Make sure you are in the "**compose**" directory when executing these commands:

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

---

## Run additional node

:::info important

When running multiple nodes without a local RPC provider, it is essential to use a different RPC provider for each node. This ensures optimal performance and prevents potential conflicts due to RPC provider limitations. For more details about RPC providers, you can find information [here](./custom-rpc-provider.md).

:::

To operate multiple nodes on the same device or VPS, you must use distinct "compose" folders for each node and ensure that their assigned ports do not overlap. To set up an additional node, follow these steps to avoid conflicts and ensure proper operation:

(**1**) Change the folder name from `compose` to `HOPRd-node-2` to differentiate this node's environment.

(**2**) Modify Environment Variables, make adjustments under "**.env**" file within your new "**HOPRd-node-2**" folder:
    
- Change the "**HOPRD_API_PORT**" from `3001` to `3002`.
- Adjust the "**HOPRD_P2P_PORT**" from `9091` to `9092`.

(**3**) Modify YAML file, make adjustments under configuration file "**hoprd.cfg.yaml**":
   
    - Change the "**hopr -> host -> port**" from `3001` to `3002`.
    - Adjust the "**HOPRD_P2P_PORT**" from `9091` to `9092`.

(**4**) Modify identity file, if you have previously run a node, move the identity file into the "**HOPRd-node-2**" folder and rename it to `hopr.id`. If this is your first time running a node, "**hopr.id**" will be generated automatically when you launch the HOPRd node. 

(**5**) Launch multiple nodes, make sure you are on a directory where all the Nodes docker compose folders are listed in one place. Then execute this command to launch all the nodes:

```md
COMPOSE_PROFILES=hoprd find . -maxdepth 1 -type d -not -path "." -exec bash -c "cd {} && docker compose up  && cd .." \;
```

These changes ensure that each node operates independently without interference, allowing for efficient management and scalability.

</TabItem>
</Tabs>