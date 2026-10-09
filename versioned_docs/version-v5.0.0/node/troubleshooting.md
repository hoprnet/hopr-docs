---
id: troubleshooting
title: Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

## Troubleshooting HOPR node issues

<details>
<summary> 

### How to check if my node is working correctly? {#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful}
</summary>

Every HOPRd node comes with the **Node API Swagger UI**, a web page where you can send requests to your node and see its answers.

1. **Open the Swagger UI**

    In your browser, go to:

    ```
    http://<NODE_IP>:<API_PORT>/swagger-ui/
    ```

    - `<NODE_IP>`: the IP address of the machine your node runs on. If the node runs on the same computer as your browser, use `localhost`.
    - `<API_PORT>`: your node's API port. The default is `3001`.
        - **Docker**: the first port in `-p 3001:3001` in your Docker command.
        - **Docker Compose**: `HOPRD_API_PORT` in your `.env` file.

    Example: `http://192.168.1.50:3001/swagger-ui/`

    :::note
    If the page doesn't load, make sure your node is running and that your server's firewall allows connections to the API port from your computer.
    :::

2. **Authorize with your API token**

    1. Click **Authorize** at the top right of the page.
    2. In the **api_token (apiKey)** field, enter your API token and click **Authorize**, then **Close**.

    Your API token is:
    - **Docker**: `api.auth` in `~/hoprd/hoprd-docker.cfg.yaml`.
    - **Docker Compose**: `HOPRD_API_TOKEN` in your `.env-secrets` file.

3. **Run a request**

    Click a request to expand it, click **Try it out**, then click **Execute**. The answer appears under **Response body**.

    If you get a `401` response, your API token is wrong. Repeat step 2.

4. **Check the results**

    Run these requests and compare the results:

    | Section | Request | Field | Expected value |
    |---|---|---|---|
    | Node | `GET …/node/status` | `overall` | `Ready`. If it shows `Initializing`, your node is still syncing. Wait a few minutes and run it again. |
    | Node | `GET …/node/version` | (response) | The latest version on the [Releases](./releases.md#hoprd-node-public-releases) page. |
    | Node | `GET …/node/info` | `hoprNodeSafe` | Your Safe address. If you migrated, your **new** Safe. If it shows your old Safe, your node uses the wrong `hopr.safe_module.safe_address`. |
    | Node | `GET …/node/info` | `chainStatus` | `Ready` |
    | Node | `GET …/node/info` | `connectivityStatus` | `Green` or `Yellow`. `Orange` means only minimal connectivity, `Red` means not connected. |
    | Node | `GET …/node/info` | `announcedAddress` | Your public IP and P2P port, for example `/ip4/1.2.3.4/tcp/9091`. |
    | Account | `GET …/account/addresses` | `native` | Your node address. If you migrated, the same address you had on v3.0.x. If it's different, your node didn't load your backed-up identity file. |
    | Account | `GET …/account/balances` | `native` | At least `0.01 xDai` |
    | Account | `GET …/account/balances` | `safeHopr` | The `wxHOPR` in your Safe. If you migrated, the `wxHOPR` you moved to your new Safe. |
    | Account | `GET …/account/balances` | `safeHoprAllowance` | More than `0 wxHOPR`. |

5. **Check that your node appears in the network dashboard**

    Go to the [HOPR Network Dashboard](https://network.hoprnet.org/dashboard) and enter your node address in **Search Node**. Use the `native` value from `GET …/account/addresses` in step 4. Your node should be listed, with **Last Seen** showing **Online**. If it isn't listed yet, wait a few minutes and search again.

If all values match and your node appears in the dashboard, your node is working correctly.

</details>

<details>
<summary> 
  
### How can I verify if Cover Traffic is being relayed through my node(s) and if I'm receiving rewards?
</summary>

On the Piz Palu network, Cover Traffic doesn't depend on your stake. Five Cover Traffic nodes send short bursts of traffic through every eligible node, so each eligible node gets a burst about once every 20 minutes. Your node earns a ticket for every packet it relays, the same as for any other traffic. There is no APR and no fixed daily reward. For background, see [Cover Traffic on HOPR Piz Palü](https://medium.com/hoprnet/cover-traffic-on-hopr-piz-pal%C3%BC-8023ea67bdbd).

The Cover Traffic nodes on Piz Palu are:

```text
0x51624c828c175cc81d6a7dd22a9a30d68c6a1ae0
0xa64109ed980c902ac554662b9d569a6a3f71e7a7
0x02d7d9ca7788e674676f809ac984cbf59e4b6099
0x50eac8e328847e5389aabb267398386db7225644
0x991a376c646274d74adb3b25ccc292a775f352f1
```

:::note
The eligibility and burst settings below are the first values used on Piz Palu. They may change as the network grows.
:::

1. **Check that your node is running**

    Follow [How to check if my node is working correctly?](#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful). Your node must appear in the network dashboard and show **Online**, because a Cover Traffic node skips nodes it can't reach.

2. **Check that your node is eligible**

    Your node is eligible when it has at least **5 open outgoing payment channels**, each with at least **100 wxHOPR**. Your stake, your Safe balance and your location don't count.

    In the Swagger UI, run `GET …/channels` and look at the `outgoing` list. Count the channels with `status` `Open` and a `balance` of `100 wxHOPR` or more.

    Keep at least **150 wxHOPR** in each channel. When your node relays traffic, it pays the next node from its channel, so the balance drops over time and could fall below 100 wxHOPR. The default channel strategy doesn't fund your channels this high. To have your node keep them at about `150 wxHOPR`, change your funding values as described in [Fund your channels for Cover Traffic](./manage-node-strategies.md#fund-your-channels-for-cover-traffic).

3. **Check that your node relays traffic and earns tickets**

    In the [HOPR Network Dashboard](https://network.hoprnet.org/dashboard), search for your node address. **Last measured throughput** and **Throughput 24h avg.** show the Cover Traffic your node relayed.

    Then, in the Swagger UI, run `GET …/tickets/statistics`:

    | Field | Expected value |
    |---|---|
    | `winningCount` | Goes up over time. Check again after an hour: your node gets a burst about every 20 minutes. |
    | `unredeemedValue` | Can stay low, because your node redeems winning tickets as they arrive. |
    | `neglectedValue` | `0 wxHOPR` |
    | `rejectedValue` | `0 wxHOPR` |

    Whether a ticket wins depends on the ticket winning probability, and its value depends on the ticket price. Both are still being tuned, so the number of winning tickets per burst can change.

4. **Make sure your node can handle bursts**

    A burst lasts about 10 seconds at 30 Mbit/s, and bursts from different Cover Traffic nodes can arrive at the same time. A node that can't keep up drops packets and loses the tickets for them, and other nodes may close their channels to it.

    The minimum for a relay node is **4 CPU cores, 4 GB of RAM and 5 GB of disk**, with an uplink that handles **10 Mbit/s in both directions**. Give your node some headroom above this, especially on a VPS.

:::tip Cover Traffic is only part of your earnings
A node that is eligible for Cover Traffic also relays real traffic, for example from Gnosis VPN, and earns tickets for it in the same way.
:::

</details>

<details>
<summary> 
  
### How to retrieve logs from your node?
</summary>

<Tabs queryString="retrieve-logs">
<TabItem value="docker" label="Docker">

1. **Find your container ID**

   Connect to your machine and execute the command `docker ps`. This will provide you with a list of Docker containers you are currently running. Among them, locate the container with the label **europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable** and note the **container ID**.

2. **Get the logs**

   Get the logs from the docker container using the following command: `docker logs -t <Your_Container_ID> >> <File_name.log>`. Replace **\<Your_Container_ID\>** with your docker container ID. Replace **\<File_name.log\>** with your container ID and **\<File_name.log\>** with your chosen file name. After executing the command, wait until it finishes writing the logs to the file.

   **Example:**

   ```md
   docker logs -t 4951b2990936 >> logs_from_hopr_node.log
   ```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Connect to your Dappnode dashboard**

2. **Open the HOPR package logs page**

   Go to the [HOPR package logs page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs).

3. **Download the logs**

   On the right side, click the **Download all** button to download HOPR node logs.

</TabItem>
</Tabs>
</details>

</NoCounter>