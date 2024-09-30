---
id: staking-hub
title: HOPR Staking Hub
---

The [HOPR Staking Hub](https://hub.hoprnet.org) is a platform for onboarding HOPR node operators. It enables you to create a [HOPR Safe](../token/safestaking.md#why-does-hopr-use-safe) for securely depositing and managing your stake. Through the hub, you can easily add and manage multiple nodes, handle transactions, monitor your nodes with essential performance metrics, use the token wrapper to wrap or unwrap HOPR tokens, and much more.

---

## Connect to the HOPR Staking Hub

(**1**) Go to [HOPR Staking Hub](https://hub.hoprnet.org).

(**2**) Before connecting your EOA wallet, make sure you are using Gnosis chain network. On the top right corner click on "**Connect Wallet**" on a popup select your wallet type to connect to the Staking Hub.

---

## Manage and monitor your node(s) performance

(**1**) Connect to the [HOPR Staking Hub](https://hub.hoprnet.org).

(**2**) On the left-hand side, click on "**Dashboard**," then select the "**Nodes**" tab. On this page, you will see all the nodes associated with your current HOPR Safe account. Each node is accompanied by key metrics and action buttons:

- **Node Address**: This is your node’s unique address. Next to it, you can either copy the address or view its on-chain activity on [https://gnosisscan.io](https://gnosisscan.io/).

- **Onboarding**: Displays 4 onboarding indicators, showing the current status of your node's onboarding process. Hover over each indicator for detailed explanations.

- **Version**: Shows the software version your node is currently running.

- **Last Seen**: The last date and time your node was detected by the Network Dashboard bots.

- **30-Day Availability**: Indicates your node’s uptime percentage over the past 30 days.

- **Balance**: Displays the native token (xDai) balance, which is used for on-chain activities related to your node.

- **Actions**: There are currently two action buttons available:
    
    - **Train**: This icon appears when you've added a new node that requires a quick onboarding process to finalize its setup.
    - **Wallet**: Allows you to fund your node with xDai. It's important to regularly check and maintain your node's balance to ensure it can redeem tickets or perform other on-chain actions.

![Staking hub dashboard nodes](/img/node/staking-hub-dashboard-nodes.png)

---

## Add additional node

Before adding an additional node, ensure you have enough stake allocated per node. For more details, refer to the [requirements to participate in the HOPR network](./run-a-node-overview.md#requirements-to-participate-in-the-hopr-network).

(**1**) Start your additional node, you can find more detailed instructions [here](./multiple-nodes.md).

(**2**) Connect to the [HOPR Staking Hub](https://hub.hoprnet.org).

(**3**) On the left-hand side, click on "**Dashboard**," then select the "**NODES**" tab. Click on "**Add New Node**," which will redirect you to a waitlist form. Fill in the information for your newly started node. Once your node is granted access to the network, please refer to the [FAQ section](./frequently-asked-questions.md#waitlist-related-faq) for further guidance.

---

## Remove node from your HOPR Safe account

(**1**) Connect to the [HOPR Staking Hub](https://hub.hoprnet.org).

(**2**) On the left-hand side, click on "**Dashboard**, find "**Module address**" and click the second icon which will redirect you to the gnosis scan website to interact directly with your Safe module smart contract.

(**3**) In the middle of a page find and click on "**Contract**" tab and then click on "**Write Contract as Proxy**".

![Gnosis scan write contract](/img/node/gnosis-scan-write-contract.png)

(**4**) Find and click on "**Connect to Web3**" approve disclaimer by clicking on "**OK**", on a wallet connection popup select "**WalletConnect**". Next to "**Connect your wallet**" click on the "**Copy**" icon.

![Gnosis scan write contract](/img/node/gnosis-scan-WalletConnect.png)

(**5**) Go to the HOPR Staking Hub, on the left-hand side, click on "**Dashboard**, then select the "**SAFE**" tab, at the bottom of the page click on "**safe.global**" button which will redirect you and automatically connect with your Safe wallet.

**Note**: On the top right corner if you see "**Connect**" button and don't see your Safe owner wallet address. Please click on "**Connect**" and connect with your wallet which is the owner of your Safe wallet.

![Gnosis scan write contract](/img/node/safe-global-connected.png)

(**6**) On the top right corner on the left side of your connected wallet address find and click on "**WalletConnect**" icon.

![Gnosis scan write contract](/img/node/safe-global-walletconnect.png)

(**7**) On the "**WalletConnect**" popup, paste pairing code (you previously copied on the gnosis scan website) into "**Pairing code**". If connection was successfull, you should see similar screenshot:

![Gnosis scan write contract](/img/node/safe-global-walletconnect-connected.png)

(**8**) Now your Safe wallet is connected with gnosis scan website, go back to Gnosis scan page, if connection was successfull instead of "**Connect to Web3**" you should see your Safe wallet address. It should look similar to this screenshot:

![Gnosis scan write contract](/img/node/gnosis-scan-safe-connected.png)

(**9**) Scroll to the bottom until you will find and click on "**7. removeNode (0xb2b99ec9)**". Enter your node address and click on "**Write**"

![Gnosis scan write contract](/img/node/gnosis-scan-safe-connected-remove-node.png)

(**10**) Go back to your **Safe.global** website where you should see "**Confirm transaction**" screen, scroll to the bottom and click on "**Execute**". Your wallet will popup to confirm the transaction.

![Gnosis scan write contract](/img/node/safe-wallet-confirm-tx.png)

---

## Add additional owner to your HOPR Safe account

(**1**) Connect to the [HOPR Staking Hub](https://hub.hoprnet.org).

(**2**) On the left-hand side, click on "**Dashboard**", then select the "**SAFE**" tab. Next to "**Safe Owners:**", click the "**Edit**" button.

(**3**) In the field next to "**ADD OWNER**," enter the wallet address of the additional owner (ensure you have full control rights over this new owner wallet). Then, click "**ADD**." In the popup, if you agree to proceed, click "**ADD**" again and confirm the transaction through your wallet.

(**4**) Once the transaction is complete, you should see the new owner added. While optional, we recommend increasing the "**Required confirmations**" from "**1**" to "**2**." This will require both owners to sign off before any on-chain action can be executed, ensuring that a single compromised wallet owner cannot perform unauthorized on-chain activities.

To do this, change the "**Required confirmations**" from "**1**" to "**2**," click "**UPDATE**," and approve the transaction in your wallet.

---

## Remove additional owner from your HOPR Safe account

(**1**) Connect to the [HOPR Staking Hub](https://hub.hoprnet.org).

(**2**) On the left-hand side, click on "**Dashboard**", then select the "**SAFE**" tab. First you need to decrease number of required confirmations, before removing one of the owners. 

Next to "**Required confirmations:**" change to the lower number (for example if you have 2/2 confirmations, lower to 1) click on "**UPDATE**" in the popup, if you agree to proceed, click "**SIGN UPDATE**".

(**3**) From the your second owner you have to connect to the [HOPR Staking Hub](https://hub.hoprnet.org), on the left-hand side, click on "**Dashboard**", then select the "**TRANSACTIONS**" tab. Find pending transaction which is named "**changeThreshold**" click on "**APPROVE**" and approve the transaction in your wallet.

(**4**) After transaction was completed, go back to your first owner. On the left-hand side, click on "**Dashboard**", then select the "**SAFE**" tab and click on "**Edit**".

(**5**) Next to "**Safe Owners:**", pick the owner you would like to remove and click on "**Trash**" icon and approve the transaction in your wallet.