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

(**2**) On the "**INFO**" page, navigate to the "**Network**" section and ensure the "**Eligible**" status displays "**Yes**." If your node was recently created, it must be fully synced (**100%**) before it becomes eligible.

(**3**) In the "**INFO**" page, under the "**Network**" section, verify that the "**Sync process**" is at "**100%**."

(**4**) In the "**INFO**" page, check the "**Balances**" section and confirm that the "**xDai: Node**" balance is at least "**0.03 xDai**."

(**5**) In the "**INFO**" page, scroll to the "**Nodes on the network**" section and ensure the "**Announced**" node count exceeds **700** and the "**Connected**" node count is above **150**.

(**6**) On the "**TICKETS**" page, ensure that there are no "**Neglected**" or "**Rejected**" tickets.

(**7**) On the "**PEERS**" page, ensure that most of your peers have 100% quality (assuming your node has been running for at least 1 hour).

For DAppNode users, if the peer quality is below 100%, follow these steps:

- Connect to your DAppNode and navigate to the [HOPR package Config tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).
   
- In the bottom-right corner, click "**SHOW ADVANCED EDITOR**". 

- Check the values for "**HOPRD_HEARTBEAT_INTERVAL**" and ensure it is set to the default value of "**20**". Similarly, confirm that "**HOPRD_HEARTBEAT_THRESHOLD**" is set to its default value of "**60**".

(**8**) On the "**CHANNELS: IN**" page, review the "**Unredeemed**" column for each incoming payment channel. Ensure that the values do not exceed **20%** above the threshold (the default threshold for ticket redemption is **30 wxHOPR**). If you’ve set a custom threshold, make sure the unredeemed value remains within **20%** of your custom setting.

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

(**2**) **Backup your node**: ensure you back up your node before proceeding. Refer to this guide for detailed backup instructions.follow this [guide](./backup-restore-node.md#backup-your-node-identity).

(**3**) **Delete the "hopr_index.db" file:** on your machine, navigate to the **.hoprd-db-dufour** folder. Inside, locate the **db** folder and delete the **hopr_index.db** file.

(**4**) **Start your node**: once the cleanup is done, start your node again by following this [guide](./node-operations.md#start-your-hopr-node).

</TabItem>
<TabItem value="dappnode_resync" label="Dappnode">

(**1**) **Stop your node**: follow this [guide](./node-operations.md#stop-your-hopr-node) to stop your HOPR node.

(**2**) **Backup your node**: ensure you back up your node before proceeding. Refer to this guide for detailed backup instructions.follow this [guide](./backup-restore-node.md#backup-your-node-identity).

(**3**) **Remove volume**: navigate to the [info tab](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info). In the "**All volumes**" row, locate the volume size and click the "**trash can**" icon to remove the package volume. This will delete the entire package storage, including all databases.

(**4**) **Restore indentity file**: restore identity file by following this [guide](./backup-restore-node.md#restore-your-node-identity).

(**4**) **Start your node**: once the identity file restore is done, start your node again by following this [guide](./node-operations.md#start-your-hopr-node).

</TabItem>
</Tabs>

</details>