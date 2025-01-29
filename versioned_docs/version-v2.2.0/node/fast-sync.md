---
id: fast-sync
title: Fast Sync
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Fast Sync?

The Fast Sync feature, introduced in HOPRd version 2.2.0, speeds up node synchronization by using HOPR logs database files. These files store logs from a previous sync performed via an RPC provider, allowing your node to read on-chain data efficiently. With Fast Sync, your node can complete synchronization in just 10 to 20 minutes, even without a local RPC provider. However, the exact duration may vary based on your hardware specifications.

## Preparing for Fast Sync

(**1**) First, you must upgrade your node to the latest version. To update your node, follow this [guide](backup-restore-update.md#update-your-node).

(**2**) You must fully synchronize your node from scratch. Once your node is fully synchronized, check if it is performing normally by following this [guide](troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

(**3**) Make a backup of your fully synchronized node, select your platform:

<Tabs>
<TabItem value="docker_fast_sync_backup" label="Docker">

(**3.1**) Find the database log files "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**" at the path "**/\<computer username>/.hoprd-db-dufour/**". Store these files for future use in a Fast Sync.

</TabItem>
<TabItem value="docker_compose_fast_sync_backup" label="Docker Compose">

(**3.1**) Find the database log files "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**" at the path "**/\<computer username>/compose/hoprd_data/hoprd/db/**". Store these files for future use in a Fast Sync.

</TabItem>
<TabItem value="dappnode_fast_sync_backup" label="Dappnode">

(**3.1**) Go to the [HOPR package backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).

(**3.2**) Click the "**Backup now**" button to download a backup of your HOPR node.  
**Important:** If you are using a browser like Brave, the backup file may not download automatically. You will need to click "**Keep**" in your browser’s downloads section.

(**3.3**) Unarchive the downloaded backup file and navigate to the path **"/\hopr.public.dappnode.eth_backup/db/db/"** to find the database log files: "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**". Store these files for future use in a Fast Sync.

</TabItem>
</Tabs>

## Enabling Fast Sync on your node

Please select platform to configure Fast Sync feature:

<Tabs>
<TabItem value="docker_fast_sync" label="Docker">

(**1**) Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

(**2**) Ensure that you have stopped the HOPRd node Docker container. You can find more details [here](node-operations.md#stop-your-hopr-node).

(**3**) On your machine, navigate to the "**.hoprd-db-dufour**" folder. Inside, locate the "**db**" folder and delete all files in it.

(**4**) Extract the recently downloaded file "**hopr_logs.tar.gz**". This will create an "**app**" folder. Navigate to the "**hoprd-db**" directory within it, then go to the "**db**" folder. Inside, you will find three database files: "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**". Copy all three files into the destination "**db**" folder.

(**5**) Configure your node by creating and applying a configuration file. Follow this [guide](manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).

(**6**) Update your configuration file, inside configuration file locate the "**chain**" section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

(**7**) Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="docker_compose_fast_sync" label="Docker Compose">

(**1**) Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

(**2**) Ensure that you have stopped the HOPRd node. You can find more details [here](node-operations.md#stop-your-hopr-node).

(**3**) On your machine, navigate to the "**compose**" folder. Navigate to "**hoprd_data**" find configuration file "**hoprd.cfg.yaml**" inside it locate the "**chain**" section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

(**4**) Locate the "**db**" folder by following the path "**/hoprd/db/**".

(**5**) Extract the recently downloaded file "**hopr_logs.tar.gz**". This will create an "**app**" folder. Navigate to the "**hoprd-db**" directory within it, then go to the "**db**" folder. Inside, you will find three database files: "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**". Copy all three files into the destination "**db**" folder.

(**6**) Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode_fast_sync" label="Dappnode">

(**1**) Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

(**2**) Connect to your DAppNode dashboard.

(**3**) Before proceeding with Fast sync process, ensure you back up your node:

- Go to the [HOPR package Backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).
- Click "**Backup now**" and download the archived file "**hopr.public.dappnode.eth_backup.tar.xz**" to your computer. Make an additional copy and store it securely on your computer.

(**4**) Create a temporary folder, copy the archived file "**hopr.public.dappnode.eth_backup.tar.xz**" into the folder, and use an archiving tool to extract it.

(**5**) Locate configuration file "**config**" and make changes:

- Find "**network_options.quality_bad_threshold**" and ensure it is set to a value of `0.1`.
- Find "**network_options.quality_offline_threshold**" and ensure it is set to a value of `0.0`.
- Locate the "**chain**" section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`.

Save the changes to the configuration file.

(**7**) In your temporary folder, navigate to the "**db**" folder, then enter the "**second db**" folder. Delete the old "**hopr_logs.db**", "**hopr_logs.db-shm**", "**hopr_logs.db-wal**" files.

(**7.1**) Extract the recently downloaded file "**hopr_logs.tar.gz**". This will create an "**app**" folder. Navigate to the "**hoprd-db**" directory within it, then go to the "**db**" folder. Inside, you will find three database files: "**hopr_logs.db**", "**hopr_logs.db-shm**", and "**hopr_logs.db-wal**". Copy the newly extracted log files into current "**db**" folder.

(**8**) **Archive files back**: Follow strict guide.

- Open your **Terminal** (macOS/Linux) or **Command Prompt** (Windows), and navigate to the temporary folder where you extracted the files (**db**, **config**, **identity**).
- Execute the following command to re-archive the files into a new archive named "**hopr.public.dappnode.eth_backup_resync.tar.xz**" with the changes:

    ```md
    tar -cJf hopr.public.dappnode.eth_backup_resync.tar.xz db config identity
    ```

(**9**) **Remove the volume for the HOPR package**: Go to the [Info tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info). Under the "**All volumes**" section, locate the volume size and click the "**trash can**" icon to remove the package volume. This will delete the package storage, including all databases.

(**10**) **Restore the modified backup file**: Go to the [Backup tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup), click "**Restore**", and select the modified archive "**hopr.public.dappnode.eth_backup_resync.tar.xz**". On the "**Restoring backup**" popup, click "**Restore**". Once you receive the notification message "Restored backup for HOPR", the process has been completed successfully.

(**11**) **Verify the restore process**: Go to the [Logs tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs). In the logs, you should see syncing process lines, indicating the restore was successful and the re-sync process is underway. Wait for the node to fully sync to 100%.

</TabItem>
</Tabs>