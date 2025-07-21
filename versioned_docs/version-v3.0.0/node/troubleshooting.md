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
  
### How to check if my node is performing normally?  
</summary>

1. Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui). If you encounter an error while trying to connect to your node, please refer to the [error codes](#troubleshooting-hopr-admin-ui-issues).

2. Ensure you are using the latest versions of both **HOPRd** and the **HOPR Admin UI**. 

    - You can check your current HOPRd node version on the **INFO** page under the **Node** section. To find the latest HOPRd version, visit [this link](./releases.md#hoprd-node-public-releases). 

    - For the HOPR Admin UI version, check the bottom right corner of the interface. The most recent HOPR Admin UI version can be found [here](./releases.md#hopr-admin-ui-public-releases).

3. On the **INFO** page, navigate to the **Network** section:

    - If the Eligible status displays **Yes**, your node has successfully joined the HOPRd network.  
    - If it displays **No**, and your node was recently created, it must reach **100%** sync before becoming eligible.

4. On the **INFO** page, under the **Network** section, verify that the **Sync process** is at **100%**.

5. On the **INFO** page, check the **Balances** section and confirm that the **xDai: Node** balance is at least **0.03 xDai**.

6. On the **INFO** page, scroll to the **Nodes on the network** section and ensure the **Announced** node count exceeds **1000** and the **Connected** node count is above **300**.

7. On the **CONFIGURATION** page, under the **Strategies** section check the following:

    - The **aggregation_threshold** value does not exceed **450**.
    - The **minimum_redeem_ticket_value** value does not exceed **25000000000000000000" // = 25 wxHOPR**

8. On the **TICKETS** page, ensure that there are no **Neglected** or **Rejected** tickets.

9. On the **PEERS** page, ensure that most of your peers have **100%** quality (assuming your node has been running for at least 1 hour).

    For DAppNode users, if the peer quality is **below 100%**, follow these steps:

    - Connect to your DAppNode and navigate to the [HOPR package Config tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).
    
    - In the bottom-right corner, click **SHOW ADVANCED EDITOR**.

    - Check the values for **HOPRD_HEARTBEAT_INTERVAL** and ensure it is set to the default value of **20**. Similarly, confirm that **HOPRD_HEARTBEAT_THRESHOLD** is set to its default value of **60**.

10. On the **CHANNELS: IN** page, review the **Unredeemed** column for each incoming payment channel. Ensure that the values do not exceed **20%** above the threshold (the default threshold for ticket redemption is **2.5 wxHOPR**). If you’ve set a custom threshold, make sure the unredeemed value remains within **20%** of your custom setting.

    The redemption process works as follows: once the unredeemed value reaches **2.5 wxHOPR** (or your custom threshold), the system will automatically trigger a redemption in the next ticket distribution cycle. To ensure optimal performance, it’s recommended that unredeemed values stay within **20%** of the threshold to prevent delays in the redemption process.

11. Visit [HOPR Network Dashboard](https://network.hoprnet.org/dashboard) and search for your node by entering your **Node address**. If your node appears, it indicates that it is reachable by network nodes.

12. To ensure stable connectivity and eligibility for rewards, try pinging each Cover Traffic node individually. If you can successfully ping all of them, it indicates that you have a stable connection to the Cover Traffic nodes. Below are the current addresses of the Cover Traffic nodes:

    #### Cover Traffic node 1 
    ```
    Node address: 0x5927c321Ca2a925d17EdCf9c58343E24337D18BA
    ```

    #### Cover Traffic node 2
    ```
    Node address: 0x0543aa9d1DAfA9Cc49bF87Ce5ea1E18277b3ae0f
    ```

    #### Cover Traffic node 3 
    ```
    Node address: 0x29D61dDbc682f272fc7F0DFb203938e211471826
    ```

    #### Cover Traffic node 4 
    ```
    Node address: 0x8Fd1766b4215944f2Eb21F03e6820Bc3c75d936c
    ```

    #### Cover Traffic node 5 
    ```
    Node address: 0x633382b748e34432dF1dBDFDd234833454B3D768
    ```

    :::note
    If one of above mentioned steps doesn't meet requirements, please refer to the topics on this troubleshooting page. If you are still unable to find a solution, feel free to reach out to the Ambassadors via Telegram or Discord channels for further assistance.
    :::
</details>

<details>
<summary> 
  
### How can I verify if Cover Traffic is being relayed through my node(s) and if I'm receiving rewards?
</summary>

1. Ensure your node is functioning correctly by following the steps outlined in the [troubleshooting guide](#how-to-check-if-my-node-is-performing-normally).
 
2. Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui). If you encounter an error while trying to connect to your node, refer to the [error codes](#troubleshooting-hopr-admin-ui-issues).

3. On the **CHANNELS: IN** page, ensure you have at least 5 incoming payment channels from the following Cover Traffic nodes:

    ```md
    0x5927c321Ca2a925d17EdCf9c58343E24337D18BA
    0x0543aa9d1DAfA9Cc49bF87Ce5ea1E18277b3ae0f
    0x29D61dDbc682f272fc7F0DFb203938e211471826
    0x8Fd1766b4215944f2Eb21F03e6820Bc3c75d936c
    0x633382b748e34432dF1dBDFDd234833454B3D768
    ```

4. Under the **Unredeemed** column, you should see an increasing number of unredeemed tickets. By default, once a channel accumulates **2.5 wxHOPR** in unredeemed tickets, it will automatically aggregate and redeem them. After a successful redemption, the funds will be sent to your Safe address.

    If you notice that your node is not redeeming tickets or is consistently receiving rejected tickets, ensure the following settings are correctly configured:

    Go to the **CONFIGURATION** page and check the **Strategies** section:

    - Ensure the **aggregation_threshold** is set to **250**.
    - Ensure the **minimum_redeem_ticket_value** is set to **2500000000000000000 HOPR**. We recommend keeping this value low to avoid losing larger amounts of earned HOPR tokens in case the node underperforms.

</details>

<details>
<summary> 
  
### What should I do if my node is receiving rejected tickets?
</summary>
If your node is receiving rejected tickets, several issues could be causing this, such as:

- Your node is not properly synced, which may indicate limitations with your RPC provider.
- There may be off-chain issues where the node deems tickets invalid and marks them as rejected.

Follow these steps to troubleshoot the issue:

1. Connect to your node [via the HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

2. Navigate to the **CHANNELS: IN** page. Under the **Unredeemed** column, perform one of the following:

    :::info  
    We assume you haven't customized your node strategies, so the hardcoded minimum redeem ticket value is **2.5 wxHOPR**. If you’ve changed this, please refer to your customized **minimum_redeem_ticket_value**.  
    :::

    - Check if there is a payment channel with **more than 34 - 35 wxHOPR** in unredeemed tokens. If so, close this specific payment channel to prevent receiving further rejected tickets.

    - If no payment channels have **more than 34 - 35 wxHOPR** in unredeemed tokens, close all incoming payment channels. Follow the guideline on how to do this [here](./interaction-with-node.md#close-incoming-channel). Please note that closing an incoming payment channel will result in the loss of unredeemed ticket value, which will be marked as neglected tickets because they were not redeemed.

3. After completing either step **(a)** or **(b)** from **step 2**, go to the **TICKETS** page and monitor the **Rejected value**. If the value continues to increase, take one of the following actions:

    - If you performed action **(a)** in **step 2**, close all incoming payment channels. Follow the guideline on how to do this [here](./interaction-with-node.md#close-incoming-channel). Please note that closing an incoming payment channel will result in the loss of unredeemed ticket value, which will be marked as neglected tickets because they were not redeemed. 

    If the **Rejected value** continues to increase after closing all channels, you will need to [re-sync your node](#how-to-re-sync-my-hoprd-node).

    - If you performed action **(b)** in **step 2**, proceed directly to [re-syncing your node](#how-to-re-sync-my-hoprd-node).

4. If you continue receiving rejected tickets after re-syncing your node, please contact the HOPR Ambassadors via Telegram or Discord for further assistance.
</details>

<details>
<summary> 
  
### What should I do if my node is receiving neglected tickets? 
</summary>
There might be several causes on why your node received neglected tickets:

- Tickets are marked as neglected when you close an incoming payment channel with unredeemed value. Since the tickets were not redeemed during the closure, they will be labeled as neglected tickets. This typically occurs when your node experiences issues, such as rejected tickets. To prevent continuous loss of rewards, it’s important to address the underlying issue.

- When a payment channel is closed and the node's strategy value for **minimum_redeem_ticket_value** is set higher than the value of the channel’s individual tickets, those tickets will be marked as neglected. This happens because the ticket value does not meet the minimum threshold specified by the strategy. In this case, you need to customize your node strategies by following this [guide](./manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).
</details>


<details>
<summary> 
  
### How to re-sync my HOPRd node?
</summary>

:::warning Note
During the re-sync process, **all tickets in your database will be removed**, including any unredeemed tickets. This step is necessary to ensure optimal node performance, but please be aware that **unredeemed tickets will be lost**.
:::

Please select platform to re-sync node:

<Tabs queryString="resync">
<TabItem value="docker" label="Docker">

1. **Stop your node**: follow this [guide](./node-operations.md#stop-your-hopr-node) to stop your HOPR node.

2. **Backup your node**: ensure you back up your node before proceeding. Refer to this guide for detailed backup instructions follow this [guide](./backup-restore-update.md#backup-your-node-identity).

3. **Delete the necessary files:** On your machine, navigate to the **.hoprd-db-dufour** folder and perform the following steps:

    3.1 Delete the **tbf** file.  

    3.2 Locate the **db** folder and remove **all** files inside it.

4. **Start your node**: once the cleanup is done, start your node again by following this [guide](./node-operations.md#start-your-hopr-node).

5. (**Optional**) If you want to use the [fast synchronization feature](fast-sync.md#what-is-fast-sync) during the re-sync process, follow the [fast-sync guide](fast-sync.md#preparing-for-fast-sync).

</TabItem>
<TabItem value="docker_compose" label="Docker Compose">

1. Navigate to the **compose** folder and stop the **hoprd** services by running the following command:

    ```md
    COMPOSE_PROFILES=hoprd docker compose down
    ```

2. **Backup your node**: ensure you back up your node before proceeding. Refer to this guide for detailed backup instructions follow this [guide](./backup-restore-update.md#backup-your-node-identity).

3. Within the **compose** directory, go to **hoprd_data**, then **hoprd**, delete the **tbf** file. Then locate the **db** folder. Remove **all** files inside **db** folder.

4. Return to the main **compose** folder and restart the **hoprd** services by running the following command:

    ```md
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

5. (**Optional**) If you want to use the [fast synchronization feature](fast-sync.md#what-is-fast-sync) during the re-sync process, follow the [fast-sync guide](fast-sync.md#preparing-for-fast-sync).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Connect to your DAppNode dashboard**.

2. **Backup your node identity**: Before proceeding with the re-sync process, ensure you back up your node identity by follwing this [guide](backup-restore-update.md#backup-your-node-identity).

3. **Remove the volume for the HOPR package**: Go to the [Info tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info). Under the **All volumes** section, locate the volume size and click the **trash can** icon to remove the package volume. This will delete the package storage, including all databases.

4. **Restore your node identity**: Follow this guide to [restore your node identity](backup-restore-update.md#restore-your-node-identity).

5. (**Optional**) If you want to use the [fast synchronization feature](fast-sync.md#what-is-fast-sync) during the re-sync process, follow the [fast-sync guide](fast-sync.md#preparing-for-fast-sync).

6. **Verify the restore process**: Go to the [Logs tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs). In the logs, you should see syncing process lines, indicating the restore was successful and the re-sync process is underway. Wait for the node to fully sync to 100%.

    Example log:

    ```md
    2025-01-14T14:11:51.005595Z  INFO ThreadId(04) chain_indexer::block: Sync progress to last known head indexer="rpc" progress=97.97430830039525 block=38036660 head=38038341
    ```
</TabItem>
</Tabs>
</details>

<details>
<summary> 
  
### How to retrieve logs from your node?
</summary>

<Tabs queryString="retrieve-logs">
<TabItem value="docker" label="Docker">

1. Connect to your machine and execute the command `docker ps`. This will provide you with a list of Docker containers you are currently running. Among them, locate the container with the label **europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable** and note the **container ID**.

2. Get the logs from the docker container using the following command: `docker logs -t <Your_Container_ID> >> <File_name.log>`. Replace **\<Your_Container_ID\>** with your docker container ID. Replace **\<File_name.log\>** with your container ID and **\<File_name.log\>** with your chosen file name. After executing the command, wait until it finishes writing the logs to the file.

    **Example:**

    ```md
    docker logs -t 4951b2990936 >> logs_from_hopr_node.log
    ```
</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. Connect to your Dappnode dashboard.

2. Go to the [HOPR package logs page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs).

3. On the right side, click the **Download all** button to download HOPR node logs.

</TabItem>
</Tabs>
</details>

---

## Troubleshooting HOPR Admin UI issues

<details>
<summary>

### HTTP Status code 422
</summary>

**Error description**: Your RPC provider is either unavailable or malfunctioning. Please switch to a functional RPC provider. If you are using a local RPC provider, please troubleshoot the issue.

**Error message**:

```md
Error fetching: {"name":"APIError","status":422,"statusText":"Unprocessable Entity","description":"HTTP Status code 422"}
```
</details>

<details>
<summary>

### UNAUTHORIZED/Authenticaltion Failed
</summary>

**Error description**: If you provided incorrect security token.

**Error message**:

```md
ERROR
Unable to connect.
Error fetching: {"status":"UNAUTHORIZED","error":"authentication failed"}
```
</details>

<details>
<summary>

### Network Request Failed
</summary>

**Error description**: If HOPR Admin can't connect to your node, please check if the provided API endpoint is correct, or if your node is working.

**Error message**:

```md
ERROR
Unable to connect.
Unknown error: "Network request failed"
```
</details>

<details>
<summary>

### Balance Too Low
</summary>

**Error description**: When your node has just been created, it will not be funded. You can't connect to the unfunded node.

**Error message**:

```md
ERROR
Unable to connect.
Your xDai balance seems to low to operate the node.
Please top up your node.
Address: 0xa6512ad...657730b0313
```
</details>

---

## Troubleshooting the migration from Avado

<details>
<summary>

### What should I do if "DappNodeWifi" and my Avado Wi-Fi network don't appear in my computer's Wi-Fi list?
</summary>

Please select connection method to your Avado device:

<Tabs queryString="connection">
<TabItem value="ssh" label="Connect using SSH">

1. **Find your Avado internal IP address**

    1. To find the internal IP address of your Avado device, first connect to your router. Then follow only the [2nd step in this guide](./port-forwarding.md#how-to-configure-port-forwarding) to identify your router’s gateway IP address.

    2. Log in to your router by entering the router's gateway IP address into your browser's address bar. Since router interfaces vary, search for sections labeled **DHCP Clients**," **Connected Devices**," or **Connected Clients**. Within this section, look for the client named **dappnode** to find its associated IP address.

2. **Connect to your Avado device**

    1. Connect to your Avado device by entering the following command into your terminal/windows powershell:

        ```md
        ssh dappnode@<avado_internal_ip_address>
        ```

        Please replace **\<avado_internal_ip_address>** with your Avado internal IP address.

        **Example:**

        ```md
        ssh dappnode@192.168.5.68
        ```

    2. If this is your first time connecting via SSH, you'll be prompted to confirm the connection to your node. Type **yes** and press enter. Next, you'll be asked to enter a password; the default password is `dappnode.s0`.

        :::note
        On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.
        :::

3. **Finalise migration process**

    1. Once you've logged in, install **kbd** package:

        ```md
        sudo apt-get install -y kbd
        ```

    2. Install the prerequisites using the following command:

        ```md
        sudo wget -O - https://prerequisites.dappnode.io | sudo bash
        ```

    3. Install the dappnode package using the following command:

        ```md
        sudo wget -O - https://installer.dappnode.io | sudo bash
        ```

    4. Once the installation is complete, please restart your Avado device by executing the following command:

        ```md
        sudo reboot
        ```

    5. Please wait 5 minutes, then check if **DappNodeWifi** appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="peripherals" label="Connect using external monitor and keyboard">

1. **Prerequisites for connection to your Avado device**

    Make sure you have:

    - An external monitor & HDMI cable.
    - External keyboard.

2. **Connect to your Avado device**

    1. Connect your monitor to your Avado device using an HDMI cable.

    2. Connect an external keyboard to your Avado device.

    3. Connect an Ethernet cable to your Avado device.

    4. Power on your monitor and Avado device, and wait for the login screen to appear. Log in using the following default credentials:

        ```bash
        Username: dappnode
        Password: dappnode.s0
        ```

        :::note
        On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.
        :::

3. **Finalise migration process**

    1. Once you've logged in, install **kbd** package:

        ```md
        sudo apt-get install -y kbd
        ```

    2. Install the prerequisites using the following command:

        ```md
        sudo wget -O - https://prerequisites.dappnode.io | sudo bash
        ```

    3. Install the dappnode package using the following command:

        ```md
        sudo wget -O - https://installer.dappnode.io | sudo bash
        ```

    4. Once the installation is complete, please restart your Avado device by executing the following command:

        ```md
        sudo reboot
        ```

    5. Please wait 5 minutes, then check if **DappNodeWifi** appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.

</TabItem>
</Tabs>

</details>

<details>
<summary>

### What should I do if only my Avado Wi-Fi appears but "DappNodeWifi" is missing from my computer's Wi-Fi list?
</summary>

If the Avado Wi-Fi appears on your computer's Wi-Fi list, it suggests a problem with the USB's boot settings, as the device did not attempt to initiate the installation process. Please select connection method to your Avado device:

<Tabs queryString="connection">
<TabItem value="ssh" label="Connect using SSH">

1. **Prerequisites for connection to your Avado device**

    Make sure you have:

    - Physical access to your Avado device
    - Micro Phillips head screwdriver
    - A bootable USB stick with Dappnode software

2. **Avado disassembly guide: accessing the internal battery**

    1. Remove the power cable and any other cables from your Avado device.

    2. Detach the bottom panel of your Avado using a micro Phillips screwdriver.

    3. Carefully release the RAM module by gently pushing the two clips outward. The module will pop up slightly. Remove the angled module to expose the circular battery located beneath it.

    4. Remove the battery and wait **10 minutes**.

    5. Reinsert the battery and the RAM module into the device, then secure the bottom panel by replacing and tightening the screws.

    5. Re-attach the power supply and ethernet cable.

3. **Finalise migration process**

    1. Power on the Avado device for **2 minutes**.

    2. Turn off Avado device.

    3. Insert the **bootable USB stick containing the Dappnode software** and power the device back on.

    4. Leave the device running for **15 minutes**, then turn it off.

    5. Remove the USB stick and power on the device again.

    6. Wait for **5 minutes** and check if **DappNodeWifi** has appeared in your computer's wifi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="peripherals" label="Connect using external monitor and keyboard">

1. **Prerequisites for connection to your Avado device**

    Make sure you have:

    - An external monitor & HDMI cable.
    - External keyboard.
    - A bootable USB stick with Dappnode software

2. **Connect to your Avado device**

    1. Connect your monitor to your Avado device using an HDMI cable.

    2. Connect an external keyboard to your Avado device.

    3. Connect an Ethernet cable to your Avado device.

    4. Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

3. **Finalise migration process**

    1. Power on your monitor and Avado device and start pressing the **Esc** key until you enter the **BIOS**. This should be visible on the monitor you have connected.

    2. Use the arrow keys to navigate to the **Boot** tab.

    3. Under **Boot Option Priorities**, select **Boot Option #** and then change it to your attached USB.

    4. Now, using your arrow keys, navigate to the **Save & Exit** tab and save your settings.

    5. Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#finalise-migration-process) but now starting directly from the **3rd step**.
</TabItem>
</Tabs>
</details>

<details>
<summary>

### What should I do if my DappNode isn't reachable via Wi-Fi and I've forgotten the SSH password?
</summary>

If you've forgotten the SSH password and cannot access your DappNode, you will need to physically connect to the device and perform a reinstall of the DappNode software.

1. **Prerequisites for connection to your Avado device**

    Make sure you have:

    - An external monitor & HDMI cable.
    - External keyboard.
    - A bootable USB stick with Dappnode software

2. **Connect to your Avado device**

    1. Connect your monitor to your Avado device using an HDMI cable.

    2. Connect an external keyboard to your Avado device.

    3. Connect an Ethernet cable to your Avado device.

    4. Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

3. **Finalise migration process**

    1. Power on your monitor and Avado device and start pressing the **Esc** key until you enter the **BIOS**. This should be visible on the monitor you have connected.

    2. Use the arrow keys to navigate to the **Boot** tab.

    3. Under **Boot Option Priorities**, select **Boot Option #** and then change it to your attached USB.

    4. Now, using your arrow keys, navigate to the **Save & Exit** tab and save your settings.

    5. Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#finalise-migration-process) but now starting directly from the **3rd step**.
</details>

---

## Troubleshooting the RPC provider

<details>
<summary> 

### How to check public RPC provider's execution client?
</summary>
To ensure your RPC provider uses the Nethermind execution client:

1. Visit [Etherflow](https://etherflow.quiknode.io) and enter your RPC endpoint.

2. Select **web3_clientVersion** and send the request.

3. Verify that the response indicates the use of the Nethermind execution client.
</details>

</NoCounter>