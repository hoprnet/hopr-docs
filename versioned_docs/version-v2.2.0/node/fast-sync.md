---
id: fast-sync
title: Fast Sync
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is a Fast Sync?

Fast Sync is a feature that allows your node to complete synchronization in as little as 10 to 20 minutes, even without a local RPC provider. The exact syncing duration may vary depending on your machine's hardware specifications.

## How to configure Fast Sync?

Please select platform to configure Fast Sync feature:

<Tabs>
<TabItem value="docker_fast_sync" label="Docker">

(**1**) Download the archived file "**hopr-logs-dufour-20250109.zip**" from the HOPR google cloud storage: [https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip](https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip)

(**2**) Ensure that you have stopped the HOPRd node Docker container. You can find more details [here](node-operations.md#stop-your-hopr-node).

(**3**) On your machine, navigate to the "**.hoprd-db-dufour**" folder. Inside, locate the "**db**" folder and delete all files in it.

(**4**) Extract the recently downloaded file "**hopr-logs-dufour-20250109.zip**". This will produce three database files: "**hopr_logs.db**", "**hopr_logs.db-shm**", "**hopr_logs.db-wal**". Copy all three files into the "**db**" folder.

(**5**) Configure your node by creating and applying a configuration file. Follow this [guide](manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).

(**6**) Update your configuration file, inside configuration file locate the "**chain**" section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

(**7**) Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="docker_compose_fast_sync" label="Docker Compose">

(**1**) Download the archived file "**hopr-logs-dufour-20250109.zip**" from the HOPR google cloud storage: [https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip](https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip)

(**2**) Ensure that you have stopped the HOPRd node. You can find more details [here](node-operations.md#stop-your-hopr-node).

(**3**) On your machine, navigate to the "**compose**" folder. Navigate to "**hoprd_data**" find configuration file "**hoprd.cfg.yaml**" inside it locate the "**chain**" section and add the following settings below, aligned with the other configurations: `keep_logs: true` and `fast_sync: true`. Save the changes to the configuration file.

(**4**) Locate the "**db**" folder by following the path "**/hoprd/db/**".

(**5**) Extract the recently downloaded file "**hopr-logs-dufour-20250109.zip**". This will produce three database files: "**hopr_logs.db**", "**hopr_logs.db-shm**", "**hopr_logs.db-wal**". Copy all three files into the "**db**" folder.

(**6**) Start your HOPRd node. More details can be found [here](node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode_fast_sync" label="Dappnode">

(**1**) Download the archived file "**hopr-logs-dufour-20250109.zip**" from the HOPR google cloud storage: [https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip](https://storage.cloud.google.com/hoprd-sync-data-staging/dufour/hopr-logs-dufour-20250109.zip)

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

(**7**) Extract the newly downloaded "**hopr-logs-dufour-20250109.zip**" file. This will produce three database files:  "**hopr_logs.db**", "**hopr_logs.db-shm**", "**hopr_logs.db-wal**".

(**7.1**) In your temporary folder, navigate to the "**db**" folder, then enter the "**second db**" folder. Delete the old "**hopr_logs.db**", "**hopr_logs.db-shm**", "**hopr_logs.db-wal**" files.

(**7.2**) Copy the newly extracted log files into current "**db**" folder.

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