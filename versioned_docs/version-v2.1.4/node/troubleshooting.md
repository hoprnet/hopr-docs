---
id: troubleshooting
title: Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details>
<summary> 
  
### How to check if my node is performing normally?  
</summary>

(**1**) Connect to your node via the [Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) Ensure you are using the latest versions of both **HOPRd** and the **Admin UI**. 

- You can check your current HOPRd node version on the "**INFO**" page under the "**Node**" section. To find the latest HOPRd version, visit [this link](./releases.md#hoprd-node-public-releases). 

- For the Admin UI version, check the bottom right corner of the interface. The most recent Admin UI version can be found [here](./releases.md#hopr-admin-ui-public-releases).

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
 
**Note**: If one of above mentioned steps doesn't meet requirements, please reach out to Ambassadors via Telegram or Discord channels.
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
hopr_peers.db
hopr_peers.db-shm
hopr_peers.db-wal
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
    hopr_peers.db
    hopr_peers.db-shm
    hopr_peers.db-wal
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