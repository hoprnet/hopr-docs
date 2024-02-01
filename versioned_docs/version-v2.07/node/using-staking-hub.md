---
id: using-staking-hub
title: Using Staking Hub
---

The [HOPR Staking Hub](https://hub.hoprnet.org/) is where you can complete the onboarding process for your HOPR Safe and HOPR Node. You can also access the Staking Hub Dashboard here to manage your nodes, Safe and incoming transactions.

## How To Access The Dashboard

(**1**) Go to [hub.hoprnet.org/](https://hub.hoprnet.org/)

(**2**) Connect the wallet associated with your HOPR Safe

(**3**) On the left menu, select `Dashboard`. You should be greeted with a dashboard with the tabs: `STAKING`, `NODES`, `SAFE` and `TRANSACTIONS`.

![Dashboard Image](/img/node/Dashboard-image.png)

## Node Settings

Under the `NODES` tab, you can view, add and fund nodes. You can associate multiple nodes with a single HOPR Safe, but be careful not to allow your stake per node to drop below 10,000 wxHOPR if you have an NR NFT or 30,000 wxHOPR per node if you don't have one. 

For example, run no more than six nodes if you have 60,000 wxHOPR staked with an NR NFT in your HOPR Safe. Otherwise, you will become ineligible for cover traffic.

### How To Add Multiple Nodes

You can associate multiple HOPR Nodes to a single HOPR Safe. To add a new node to your HOPR Safe:

(**1**) Go to the `Node` tab of the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard#node).

**Note:** Make sure your wallet is connected.

![Node Tab of Dashboard](/img/node/nodes-tab-of-dashboard.png)

(**2**) Press the `Show` button under the `Docker run command` section.

(**3**) Copy the command, edit it with the [required details](./using-docker.md#2-configure-command) and run the command to start a new node. 

**Note:** Make sure to change the `API Token`, `Public IP Address` and `Custom RPC Provider.`

![Copy Docker Command](/img/node/copy-docker-command.png)

(**4**) Copy the node address of your new node.

For assistance on this, you can view the docs [here](./using-docker.md#2-configure-command).

(**5**) After copying your node address, press the `Add New Node` button on the dashboard. This should open the waitlist form.

(**6**) Fill out the waitlist form with your details and the new node address you should have copied.

**Note:** You can apply to add multiple nodes at once through this method. Just start more nodes and enter all of their addresses under the 6th section of the form.

(**7**) Wait for your new nodes to be added to the network. Once this is done, they should become visible in the dashboard.

![New Node on the Dashboard Table](/img/node/new-node-on-dashboard-table.png)

(**8**) Once your new node appears on the dashboard, press `onboarding` on the main menu. The main menu should be visible on the left side of the staking hub.

(**9**) Complete the onboarding for your new node. You can use [this video](https://youtu.be/tcs3VzEW7dM?t=714) as guidance for the onboarding process.

## Safe Settings

Under the `SAFE` tab, you can transfer an NR NFT and manage your owners / multisig settings.

### How To Setup Multisig

To set up a multisig, you can add new owners to your HOPR Saf and change the number of required confirmations for a transaction to be considered valid. You can view how to do each of these things individually below.

### How To Add Owners

(**1**) Go to the `Safe` tab of the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard#safe).

**Note:** Make sure your wallet is connected.

(**2**) Press the `Edit` button on the top right of the `Safe Owners` section.

![Safe Owners Section](/img/node/Safe-owners-section.png)

(**3**) Enter the Ethereum address of the new owner wallet you want to add in the field `Add Owner`.

(**4**) Press the button `Add`, and sign the prompted transaction.

**Note:** If you already have a multisig set up, you must confirm this transaction from the required number of owners to add a new owner.

### How To Change Required Confirmations

(**1**) Go to the `Safe` tab of the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard#safe).

**Note:** Make sure your wallet is connected.

(**2**) Press the `Edit` button on the top right of the `Safe Owners` section.

(**3**) Change the `Required Confirmations` in the drop-down menu and press update. Then, sign the transaction prompt in your wallet.

### How To Remove Owners

(**1**) Go to the `Safe` tab of the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard#safe).

**Note:** Make sure your wallet is connected.

(**2**) Press the `Edit` button on the top right of the `Safe Owners` section.

(**3**) Press the bin icon next to the wallet you would like to remove, then sign the prompted transaction.

**Note:** You must sign this transaction as many times as is required by your current multisig settings.