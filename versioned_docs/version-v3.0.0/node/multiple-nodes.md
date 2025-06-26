---
id: multiple-nodes
title: Running Multiple Nodes
#toc_min_heading_level: 3
#toc_max_heading_level: 5
#hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Select method to run additional node

:::info important

When running multiple nodes with third-party RPC providers, you must assign a different RPC provider to each node to avoid potential conflicts and ensure optimal performance, as third-party RPC providers have limitations. This requirement does not apply if you are using a local RPC provider. For more details about RPC providers, you can find information [here](./custom-rpc-provider.md).

:::

Please select Docker method to run multiple nodes:

<Tabs queryString="multi_nodes">
<TabItem value="docker" label="Docker">

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
<TabItem value="docker-compose" label="Docker compose">

:::note

Metrics setup is not supported when running multiple nodes on the same machine.

:::

To operate multiple nodes on the same device or VPS, you must use distinct "compose" folders for each node and ensure that their assigned ports do not overlap. To set up an additional node, follow these steps to avoid conflicts and ensure proper operation:

1. Change the folder name of your first node from **compose** to **HOPRd-node-1**.

2. Make a copy of a first node folder **HOPRd-node-1** and rename to **HOPRd-node-2** to differentiate this node's environment.

3. Modify the environment variables. Make adjustments in the **.env** file within your new **HOPRd-node-2** folder, assuming you are using the default ports:
    
    - Change the **HOPRD_API_PORT** from `3001` to `3002`.
    - Adjust the **HOPRD_P2P_PORT** from `9091` to `9092`.

4. Modify secret environment variables, make adjustments if needed under **.env-secrets** file within your new **HOPRd-node-2** folder.

5. Modify the docker compose file. Make adjustments in the **docker-compose.yml** file within your new **HOPRd-node-2** folder:

    Under **services.hoprd**, change the **container_name** from `hoprd` to `hoprd-2`.

6. Configure node strategies, inside **HOPRd-node-2** folder, navigate to **hoprd_data** folder and edit **hoprd.cfg.yaml** file, assuming you are using the same safe wallet:

    Find **port** and Change port from `9091` to `9092`.

7. Manage the identity file. If you have previously run a second node, transfer the identity file to the **hoprd_data** folder inside the **HOPRd-node-2** folder, and rename it to `hopr.id`. If this is your first time running a second node, the **hopr.id** file will be automatically generated when the HOPRd node is launched.

8. Launch Docker Compose. When running multiple nodes, for the second node, you only need to use the **hoprd** profile. Ensure you are in the **HOPRd-node-2** folder when executing the command:

    ```md
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

These changes ensure that each node operates independently without interference, allowing for efficient management and scalability.

</TabItem>
</Tabs>

## Register your node

Once you have started your additional node, you have to link your node with your current HOPR Safe.

1. Access the recently launched HOPR Admin UI. Assuming you used the default port numbers, you should be able to access the HOPR Admin UI at [http://localhost:4677](http://localhost:4677) (replace **localhost** with your **server IP address** if you are using a VPS).

    **Example:** 

    ```md
    http://127.0.0.1:4677
    ```

2. Click **CONNECT TO NODE** in the top right corner.  In the popup under **Node credentials:**, do the following: 

    - In the **API endpoint** field, the default API endpoint should be set to `http://localhost:3001`. However, you may need to replace `localhost` with your server's IP address if you used a VPS, and adjust the port if you changed the mapping during installation.
    - In the **API token** field, enter the custom security token you created during the [initial HOPRd setup](./node-docker.md#configure-hoprd-command).

3. Click the button **Connect to the node** where popup should appear with your node address which starts with **0x**. Copy your node address.

    :::note
    You don’t need to manually fund your node with **xDai** tokens. You will fund your node through the HOPR Staking Hub during the short onboarding process for the additional nodes. 
    :::

    Go to the [Nodes tab on the Staking Hub](https://hub.hoprnet.org/staking/dashboard#node), click the **Add New Node** button to register on the waitlist, and wait for approval, which occurs on a tri-weekly basis.

4. Once your node is granted access to the HOPR network, go to the [Nodes tab on the Staking Hub](https://hub.hoprnet.org/staking/dashboard#node), where you will find your recently approved node address. Click the **train** icon to complete the short onboarding process.