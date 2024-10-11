---
id: troubleshooting
title: Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Troubleshooting HOPR node issues

<details>
<summary> 
  
### How to check if my node is performing normally?  
</summary>

(**1**) Connect to your node via the [Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) Ensure you are using the latest versions of both **HOPRd** and the **HOPR Admin UI**. 

- You can check your current HOPRd node version on the "**INFO**" page under the "**Node**" section. To find the latest HOPRd version, visit [this link](./releases.md#hoprd-node-public-releases). 

- For the HOPR Admin UI version, check the bottom right corner of the interface. The most recent HOPR Admin UI version can be found [here](./releases.md#hopr-admin-ui-public-releases).

(**3**) On the "**INFO**" page, navigate to the "**Network**" section and ensure the "**Eligible**" status displays "**Yes**." If your node was recently created, it must be fully synced (**100%**) before it becomes eligible.

(**4**) In the "**INFO**" page, under the "**Network**" section, verify that the "**Sync process**" is at "**100%**."

(**5**) In the "**INFO**" page, check the "**Balances**" section and confirm that the "**xDai: Node**" balance is at least "**0.03 xDai**."

(**6**) In the "**INFO**" page, scroll to the "**Nodes on the network**" section and ensure the "**Announced**" node count exceeds **700** and the "**Connected**" node count is above **150**.

(**7**) On the "**TICKETS**" page, ensure that there are no "**Neglected**" or "**Rejected**" tickets.

(**8**) On the "**PEERS**" page, ensure that most of your peers have 100% quality (assuming your node has been running for at least 1 hour).

For DAppNode users, if the peer quality is below 100%, follow these steps:

- Connect to your DAppNode and navigate to the [HOPR package Config tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).
   
- In the bottom-right corner, click "**SHOW ADVANCED EDITOR**". 

- Check the values for "**HOPRD_HEARTBEAT_INTERVAL**" and ensure it is set to the default value of "**20**". Similarly, confirm that "**HOPRD_HEARTBEAT_THRESHOLD**" is set to its default value of "**60**".

(**9**) On the "**CHANNELS: IN**" page, review the "**Unredeemed**" column for each incoming payment channel. Ensure that the values do not exceed **20%** above the threshold (the default threshold for ticket redemption is **30 wxHOPR**). If you’ve set a custom threshold, make sure the unredeemed value remains within **20%** of your custom setting.

The redemption process works as follows: once the unredeemed value reaches **30 wxHOPR** (or your custom threshold), the system will automatically trigger a redemption in the next ticket distribution cycle. To ensure optimal performance, it’s recommended that unredeemed values stay within **20%** of the threshold to prevent delays in the redemption process.
 
**Note**: If one of above mentioned steps doesn't meet requirements, please refer to the topics on this troubleshooting page. If you are still unable to find a solution, feel free to reach out to the Ambassadors via Telegram or Discord channels for further assistance.
</details>

<details>
<summary> 
  
### What should I do if my node is receiving rejected tickets? 
</summary>
If your node is receiving rejected tickets, several issues could be causing this, such as:

- Your node is not properly synced, which may indicate limitations with your RPC provider.
- There may be off-chain issues where the node deems tickets invalid and marks them as rejected.

Follow these steps to troubleshoot the issue:

(**1**) Connect to your node [via the HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) Navigate to the "**CHANNELS: IN**" page. Under the "**Unredeemed**" column, perform one of the following:

:::info  
We assume you haven't customized your node strategies, so the hardcoded minimum redeem ticket value is **30 wxHOPR**. If you’ve changed this, please refer to your customized **minimum_redeem_ticket_value**.  
:::

- (**a**) Check if there is a payment channel with **more than 34 - 35 wxHOPR** in unredeemed tokens. If so, close this specific payment channel to prevent receiving further rejected tickets.

- (**b**) If no payment channels have **more than 34 - 35 wxHOPR** in unredeemed tokens, close all incoming payment channels. Follow the guideline on how to do this [here](./interaction-with-node.md#close-incoming-channel). Please note that closing an incoming payment channel will result in the loss of unredeemed ticket value, which will be marked as neglected tickets because they were not redeemed.

(**3**) After completing either step **(a)** or **(b)** from **step 2**, go to the "**TICKETS**" page and monitor the "**Rejected value**." If the value continues to increase, take one of the following actions:

- (**a**) If you performed action **(a)** in **step 2**, close all incoming payment channels. Follow the guideline on how to do this [here](./interaction-with-node.md#close-incoming-channel). Please note that closing an incoming payment channel will result in the loss of unredeemed ticket value, which will be marked as neglected tickets because they were not redeemed. 

    If the "**Rejected value**" continues to increase after closing all channels, you will need to [re-sync your node](#how-to-re-sync-my-hoprd-node).

- (**b**) If you performed action **(b)** in **step 2**, proceed directly to [re-syncing your node](#how-to-re-sync-my-hoprd-node).

(**4**) If you continue receiving rejected tickets after re-syncing your node, please contact the HOPR Ambassadors via Telegram or Discord for further assistance.
</details>

<details>
<summary> 
  
### What should I do if my node is receiving neglected tickets? 
</summary>
There might be several causes on why your node received neglected tickets:

- Tickets are marked as neglected when you close an incoming payment channel with unredeemed value. Since the tickets were not redeemed during the closure, they will be labeled as neglected tickets. This typically occurs when your node experiences issues, such as rejected tickets. To prevent continuous loss of rewards, it’s important to address the underlying issue.

- When a payment channel is closed and the node's strategy value for "**on_close_redeem_single_tickets_value_min**" is set higher than the value of the channel’s individual tickets, those tickets will be marked as neglected. This happens because the ticket value does not meet the minimum threshold specified by the strategy. In this case, you need to customize your node strategies by following this [guide](./manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).
</details>


<details>
<summary> 
  
### How to re-sync my HOPRd node?
</summary>
Please select platform to re-sync node:

<Tabs>
<TabItem value="docker_resync" label="Docker">

(**1**) **Stop your node**: follow this [guide](./node-operations.md#stop-your-hopr-node) to stop your HOPR node.

(**2**) **Backup your node**: ensure you back up your node before proceeding. Refer to this guide for detailed backup instructions follow this [guide](./backup-restore-update.md#backup-your-node-identity).

(**3**) **Delete the necessary files:** on your machine, navigate to the **.hoprd-db-dufour** folder. Inside, locate the **db** folder and delete these files:

```md
hopr_index.db
hopr_index.db-shm
hopr_index.db-wal
```

**P.S.** If some files are missing, that's okay. Just ensure that the specified files mentioned above are removed.

(**4**) **Start your node**: once the cleanup is done, start your node again by following this [guide](./node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode_resync" label="Dappnode">

(**1**) **Connect to your DAppNode dashboard.**

(**2**) **Backup your node**: Before proceeding with the re-sync process, ensure you back up your node:

- Go to the [HOPR package Backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).
- Click "**Backup now**" and download the archived file "**hopr.public.dappnode.eth_backup.tar.xz**" to your computer. Make an additional copy and store it securely on your computer.

(**3**) **Unarchive and clean up files**: This step is necessary to force your node to re-sync without affecting the tickets data.

- Create a temporary folder, copy the archived file "**hopr.public.dappnode.eth_backup.tar.xz**" into the folder, and use an archiving tool to extract it.
- After extracting the file, navigate to the "**db**" folder, then into the second "**db**" folder, and delete the following files:

    ```md
    hopr_index.db
    hopr_index.db-shm
    hopr_index.db-wal
    ```

    **P.S.** If some files are missing, that's okay. Just ensure that the files listed above are deleted.

- Open your **Terminal** (macOS/Linux) or **Command Prompt** (Windows), and navigate to the temporary folder where you extracted the files (**db**, **config**, **identity**).
- Execute the following command to re-archive the files into a new archive named "**hopr.public.dappnode.eth_backup_resync.tar.xz**" with the changes:

    ```md
    tar -cJf hopr.public.dappnode.eth_backup_resync.tar.xz db config identity
    ```

(**4**) **Remove the volume for the HOPR package**: Go to the [Info tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info). Under the "**All volumes**" section, locate the volume size and click the "**trash can**" icon to remove the package volume. This will delete the package storage, including all databases.

(**5**) **Restore the modified backup file**: Go to the [Backup tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup), click "**Restore**", and select the modified archive "**hopr.public.dappnode.eth_backup_resync.tar.xz**". On the "**Restoring backup**" popup, click "**Restore**". Once you receive the notification message "Restored backup for HOPR", the process has been completed successfully.

(**6**) **Verify the restore process**: Go to the [Logs tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs). In the logs, you should see syncing process lines, indicating the restore was successful and the re-sync process is underway. Wait for the node to fully sync to 100%.

Example log:

```md
2024-09-26T06:48:50.267519Z  INFO ThreadId(18) chain_indexer::block: Sync progress 2.94% @ block 29897241
```
</TabItem>
</Tabs>
</details>

---

## Troubleshooting HOPR Admin UI issues

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

<Tabs>
<TabItem value="migration_method_ssh" label="Connect using SSH">

#### 1. Find your Avado internal IP address

(**1**) To locate the internal IP address of your Avado device, first connect to your router. Please follow only the specific step outlined in [this guide](./port-forwarding.md#2-find-your-routers-gateway-ip-address) to identify your router's gateway IP address.

(**2**) Log in to your router by entering the router's gateway IP address into your browser's address bar. Since router interfaces vary, search for sections labeled "**DHCP Clients**," "**Connected Devices**," or "**Connected Clients**." Within this section, look for the client named "**dappnode**" to find its associated IP address.

#### 2. Connect to your Avado device

(**1**) Connect to your Avado device by entering the following command into your terminal/windows powershell:

```md
ssh dappnode@<avado_internal_ip_address>
```

Please replace "**\<avado_internal_ip_address>**" with your Avado internal IP address.

Example:

```md
ssh dappnode@192.168.5.68
```

(**2**) If this is your first time connecting via SSH, you'll be prompted to confirm the connection to your node. Type **yes** and press enter. Next, you'll be asked to enter a password; the default password is `dappnode.s0`.

**Important**: On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.

#### 3. Finalise migration process

(**1**) Once you've logged in, install "**kbd**" package:

```md
sudo apt-get install -y kbd
```

(**2**) Install the prerequisites using the following command:

```md
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**3**) Install the dappnode package using the following command:

```md
sudo wget -O - https://installer.dappnode.io | sudo bash
```

(**4**) Once the installation is complete, please restart your Avado device by executing the following command:

```md
sudo reboot
```

(**5**) Please wait 5 minutes, then check if "**DappNodeWifi**" appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="migration_method_external" label="Connect using external monitor and keyboard">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Power on your monitor and Avado device, and wait for the login screen to appear. Log in using the following default credentials:

```bash
Username: dappnode
Password: dappnode.s0
```

**Important**: On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.

#### 3. Finalise migration process

(**1**) Once you've logged in, install "**kbd**" package:

```md
sudo apt-get install -y kbd
```

(**2**) Install the prerequisites using the following command:

```md
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**3**) Install the dappnode package using the following command:

```md
sudo wget -O - https://installer.dappnode.io | sudo bash
```

(**4**) Once the installation is complete, please restart your Avado device by executing the following command:

```md
sudo reboot
```

(**5**) Please wait 5 minutes, then check if "**DappNodeWifi**" appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.

</TabItem>
</Tabs>

</details>

<details>
<summary>

### What should I do if only my Avado Wi-Fi appears but "DappNodeWifi" is missing from my computer's Wi-Fi list?
</summary>

If the Avado Wi-Fi appears on your computer's Wi-Fi list, it suggests a problem with the USB's boot settings, as the device did not attempt to initiate the installation process. Please select connection method to your Avado device:

<Tabs>
<TabItem value="migration_method_ssh_avado" label="Connect using SSH">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- Physical access to your Avado device
- Micro Phillips head screwdriver
- A bootable USB stick with Dappnode software

#### 2. Avado disassembly guide: accessing the internal battery

(**1**) Remove the power cable and any other cables from your Avado device.

(**2**) Detach the bottom panel of your Avado using a micro Phillips screwdriver.

(**3**) Carefully release the RAM module by gently pushing the two clips outward. The module will pop up slightly. Remove the angled module to expose the circular battery located beneath it.

(**4**) Remove the battery and wait **10 minutes**.

(**5**) Reinsert the battery and the RAM module into the device, then secure the bottom panel by replacing and tightening the screws.

(**5**) Re-attach the power supply and ethernet cable.

#### 3. Finalise migration process

(**1**) Power on the Avado device for **2 minutes**.

(**2**) Turn off Avado device.

(**3**) Insert the **bootable USB stick containing the Dappnode software** and power the device back on.

(**4**) Leave the device running for **15 minutes**, then turn it off.

(**5**) Remove the USB stick and power on the device again.

(**6**) Wait for **5 minutes** and check if "**DappNodeWifi**" has appeared in your computer's wifi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="migration_method_external_avado" label="Connect using external monitor and keyboard">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.
- A bootable USB stick with Dappnode software

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Connect an Ethernet cable to your Avado device.

(**5**) Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

#### 3. Finalise migration process

(**1**) Power on your monitor and Avado device and start pressing the "**Esc**" key until you enter the "**BIOS**". This should be visible on the monitor you have connected.

(**2**) Use the arrow keys to navigate to the "**Boot**" tab.

(**3**) Under "**Boot Option Priorities**", select "**Boot Option #**" and then change it to your attached USB.

(**4**) Now, using your arrow keys, navigate to the "**Save & Exit**" tab and save your settings.

(**5**) Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#3-finalise-migration-process) but now starting directly from the **3rd step**.
</TabItem>
</Tabs>
</details>

<details>
<summary>

### What should I do if my DappNode isn't reachable via Wi-Fi and I've forgotten the SSH password?
</summary>

If you've forgotten the SSH password and cannot access your DappNode, you will need to physically connect to the device and perform a reinstall of the DappNode software.

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.
- A bootable USB stick with Dappnode software

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

#### 3. Finalise migration process

(**1**) Power on your monitor and Avado device and start pressing the "**Esc**" key until you enter the "**BIOS**". This should be visible on the monitor you have connected.

(**2**) Use the arrow keys to navigate to the "**Boot**" tab.

(**3**) Under "**Boot Option Priorities**", select "**Boot Option #**" and then change it to your attached USB.

(**4**) Now, using your arrow keys, navigate to the "**Save & Exit**" tab and save your settings.

(**5**) Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#3-finalise-migration-process) but now starting directly from the **3rd step**.
</details>

---

## Troubleshooting the RPC provider

<details>
<summary> 

### How to check public RPC provider's execution client?
</summary>
To ensure your RPC provider uses the Nethermind execution client:

(**1**) Visit [Etherflow](https://etherflow.quiknode.io) and enter your RPC endpoint.

(**2**) Select **web3_clientVersion** and send the request.

(**3**) Verify that the response indicates the use of the Nethermind execution client.
</details>