---
id: fast-sync
title: Fast Sync
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

## What is Fast Sync?

Fast Sync, a feature introduced in HOPRd version 2.2.0, significantly accelerates node synchronization by leveraging HOPR logs database files. These files store logs from a previous synchronization performed via an RPC provider, allowing your node to read on-chain data with enhanced efficiency. With Fast Sync, you can complete synchronization in just 10 to 20 minutes, even without a local RPC provider. Please note that the exact duration may vary depending on your hardware specifications.

There are two methods for using Fast Sync:

- **Manual Fast Sync:** This method requires you to use your own pre-synced database files to initiate the fast sync process. To use this, you must have already fully synced your node at least once.

- **Automatic Fast Sync:** This method uses pre-synced database files provided by HOPR, which are automatically downloaded and used to proceed with the fast sync. 

:::note Disclaimer

By selecting the **Automatic Fast Sync** method, you acknowledge and agree to trust the integrity and accuracy of the pre-synced database files **provided by HOPR**. You assume all responsibility for using these files with your node and do so at your own risk. 

:::

Please select method to implement Fast Sync feature:

<Tabs queryString="fast_sync_method">
<TabItem value="manual" label="Manual Fast Sync">

## Preparing for Manual Fast Sync

1. First, you must upgrade your node to the latest version. To update your node, follow this [guide](backup-restore-update.md#update-your-node).

2. You must fully synchronize your node from scratch. Once your node is fully synchronized, check if it is performing normally by following this [guide](troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

3. Make a backup of your fully synchronized node, select your platform:

    <Tabs queryString="fs_backup">
    <TabItem value="docker" label="Docker">

    Find the database log files **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal** at the path **/\<computer username>/.hoprd-db-dufour/**. Store these files for future use in a Fast Sync.

    </TabItem>
    <TabItem value="docker-compose" label="Docker Compose">

    Find the database log files **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal** at the path **/\<computer username>/compose/hoprd_data/hoprd/db/**. Store these files for future use in a Fast Sync.

    </TabItem>
    <TabItem value="dappnode" label="Dappnode">

    1. Go to the [HOPR package backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).

    2. Click the **Backup now** button to download a backup of your HOPR node.  
    **Important:** If you are using a browser like Brave, the backup file may not download automatically. You will need to click **Keep** in your browser’s downloads section.

    3. Unarchive the downloaded backup file and navigate to the path **/hopr.public.dappnode.eth_backup/db/db/** to find the database log files: **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal**. Store these files for future use in a Fast Sync.

    </TabItem>
    </Tabs>

## Enabling Fast Sync on your node

Please select platform to configure Fast Sync feature:

<Tabs queryString="fs_config">
<TabItem value="docker" label="Docker">

1. Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

2. Ensure that you have stopped the HOPRd node Docker container. You can find more details [here](node-operations.md#stop-your-hopr-node).

3. On your machine, navigate to the **.hoprd-db-dufour** folder. Inside, locate the **db** folder and delete all files in it.

4. Locate the previously backed-up files: **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal**. Copy all three files into the destination **db** folder.

5. Configure your node by creating and applying a configuration file. Follow this [guide](manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).

6. Update your configuration file, inside configuration file locate the **chain** section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

7. Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

2. Ensure that you have stopped the HOPRd node. You can find more details [here](node-operations.md#stop-your-hopr-node).

3. On your machine, navigate to the **compose** folder. Navigate to **hoprd_data** find configuration file **hoprd.cfg.yaml** inside it locate the **chain** section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

4. Locate the **db** folder by following the path **/hoprd/db/**.

5. Locate the previously backed-up files: **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal**. Copy all three files into the destination **db** folder.

6. Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. Locate the database log files that you previously gathered from this [guide](#preparing-for-fast-sync).

2. Connect to your DAppNode dashboard.

3. Before proceeding with Fast sync process, ensure you back up your node:

    1. Go to the [HOPR package Backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).

    2. Click **Backup now** and download the archived file **hopr.public.dappnode.eth_backup.tar.xz** to your computer. Make an additional copy and store it securely on your computer.

4. Create a temporary folder, copy the archived file **hopr.public.dappnode.eth_backup.tar.xz** into the folder, and use an archiving tool to extract it.

5. Locate configuration file **config** and make changes:

    1. Find **network_options.quality_bad_threshold** and ensure it is set to a value of `0.1`.
    2. Find **network_options.quality_offline_threshold** and ensure it is set to a value of `0.0`.
    3. Locate the **chain** section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`.

    Save the changes to the configuration file.

6. In your temporary folder, navigate to the **db** folder, then enter the **second db** folder. Delete the old **hopr_logs.db**, **hopr_logs.db-shm**, **hopr_logs.db-wal** files.

    Locate the previously backed-up files: **hopr_logs.db**, **hopr_logs.db-shm**, and **hopr_logs.db-wal**. Copy all three files into the destination **db** folder.

7. **Archive files back** (Follow strict guide)

    1. Open your **Terminal** (macOS/Linux) or **Command Prompt** (Windows), and navigate to the temporary folder where you extracted the files (**db**, **config**, **identity**).
    2. Execute the following command to re-archive the files into a new archive named **hopr.public.dappnode.eth_backup_resync.tar.xz** with the changes:

        ```md
        tar -cJf hopr.public.dappnode.eth_backup_resync.tar.xz db config identity
        ```

8. **Remove the volume for the HOPR package**: Go to the [Info tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info). Under the **All volumes** section, locate the volume size and click the **trash can** icon to remove the package volume. This will delete the package storage, including all databases.

9. **Restore the modified backup file**: Go to the [Backup tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup), click **Restore**, and select the modified archive **hopr.public.dappnode.eth_backup_resync.tar.xz**. On the **Restoring backup** popup, click **Restore**. Once you receive the notification message "Restored backup for HOPR", the process has been completed successfully.

10. **Verify the restore process**: Go to the [Logs tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs). In the logs, you should see syncing process lines, indicating the restore was successful and the re-sync process is underway. Wait for the node to fully sync to 100%.

</TabItem>
</Tabs> 

</TabItem>
<TabItem value="automatic" label="Automatic Fast Sync">

## Enabling Fast Sync on your node

Please select platform to configure Fast Sync feature:

<Tabs queryString="auto_fast_sync">
<TabItem value="docker" label="Docker">

1. Ensure that you have stopped the HOPRd node. You can find more details [here](node-operations.md#stop-your-hopr-node).

2. Update your configuration file, inside configuration file locate the **chain** section and add the following settings below, aligned with the other configurations: `enable_logs_snapshot: true` and `logs_snapshot_url: "https://logs-snapshots-rotsee.hoprnet.org/rotsee-v3.0-latest.tar.xz"`. Save the changes to the configuration file.

3. Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. Ensure that you have stopped the HOPRd node. You can find more details [here](node-operations.md#stop-your-hopr-node).

2. On your machine, navigate to the **compose** folder. Navigate to **hoprd_data** find configuration file **hoprd.cfg.yaml** inside it locate the **chain** section and add the following settings below, aligned with the other configurations: `enable_logs_snapshot: true` and `logs_snapshot_url: "https://logs-snapshots-rotsee.hoprnet.org/rotsee-v3.0-latest.tar.xz"`. Save the changes to the configuration file.

3. Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Backup your node**

    Before proceeding with Fast sync process, ensure you back up your node:

    1. Connect to your DAppNode dashboard.

    1. Go to the [HOPR package Backup page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/backup).

    2. Click **Backup now** and download the archived file **hopr.public.dappnode.eth_backup.tar.xz** to your computer. Make an additional copy and store it securely on your computer.

2. **Adjust Your Configuration File**

    1. Download the example file specifically for the Dappnode: [hoprd.cfg.yaml](pathname:///files/hoprd.cfg.yaml)
    2. Inside configuration file locate the **chain** section and add the following settings below, aligned with the other configurations: `enable_logs_snapshot: true` and `logs_snapshot_url: "https://logs-snapshots-rotsee.hoprnet.org/rotsee-v3.0-latest.tar.xz"`. Save the changes to the configuration file.

3. **Upload Configuration File**

    1. After adjusting the configuration file, connect to your Dappnode dashboard, locate the **HOPR** package, and navigate to the **File Manager** tab.

        ![File Manager](/img/node/dappnode-file-manager.png)

    2. In the **Upload file** section, click the **Browse** button next to the **Choose file** field, then select your newly created configuration file. Ensure that the configuration file is named **hoprd.cfg.yaml**.

    3. In the text field under the **Upload file** section, enter the path **`/app/hoprd/conf/`**.

        ![Dappnode file upload path](/img/node/dappnode-prefilled-config-data.png)

    4. Click the **Upload** button and wait for the upload to finish.

4. **Restart HOPRd package**

    1. Go to the **Info** page within your HOPR package, and click the **Restart** button to restart your node.

    2. Wait for about 5 minutes, then [connect to your node](./node-management-admin-ui#connecting-your-node) via the HOPR Admin UI. Navigate to the **CONFIGURATION** page to verify that the strategy settings have been updated. If the changes aren't visible, try performing a hard refresh of the HOPR Admin UI page.


</TabItem>
</Tabs>

</TabItem>
</Tabs>

</NoCounter>