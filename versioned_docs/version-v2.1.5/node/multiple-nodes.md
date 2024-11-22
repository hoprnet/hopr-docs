---
id: multiple-nodes
title: Running Multiple Nodes
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

To run multiple nodes on the same device or VPS, change the ports associated with your node and the location of your node database. Each node must have different ports, and they should not match between the nodes you are running on the same device or VPS.

For example, the second node should implement the following changes:

- Change `-p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001` to `-p 9092:9092/tcp -p 9092:9092/udp -p 3002:3002`
- Change `-v $HOME/.hoprd-db-dufour:/app/hoprd-db` to `-v $HOME/.hoprd-db-dufour-2:/app/hoprd-db`
- Add `--apiPort 3002` (where first defaults to 3001)
- Ensure you suffix your IP address with the new port, which in this example would now be `9092` instead of `9091`.
- Assign a different name to your second node by changing `--name hoprd` to `--name hoprd-2`

These changes would result in the following configuration:

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