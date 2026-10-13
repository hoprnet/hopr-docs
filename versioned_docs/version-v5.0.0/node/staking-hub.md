---
id: staking-hub
title: Manage your HOPR Safe
---

import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

Your HOPR Safe holds the wxHOPR your node uses for payment channels, and it receives your rewards. You manage it with [Safe\{Wallet\}](https://app.safe.global) on Gnosis Chain.

:::note
The [HOPR Staking Hub](https://hub.hoprnet.org) is used only to [wrap and unwrap HOPR tokens](../token/token-wrapping.md) and to [withdraw wxHOPR from your Safe](#withdraw-wxhopr-from-your-safe).
:::

---

## Open your Safe

1. Go to [Safe\{Wallet\}](https://app.safe.global) and connect a wallet that is a signer (owner) of your Safe.
2. Make sure you are on **Gnosis Chain**, then open your Safe: the `safe` address you got when you created it with `hopli`.

---

## Monitor your node

To check that your node is online, relaying traffic and earning tickets, see [How to check if my node is working correctly?](./troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful) and the [HOPR Network Dashboard](https://network.hoprnet.org/dashboard).

---

## Add another node

To add another node to your Safe, follow [Running multiple nodes](./multiple-nodes.md). You add the node to your Safe with `hopli`.

---

## Withdraw wxHOPR from your Safe

Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking), connect your Safe owner wallet, and withdraw your `wxHOPR` to the address you choose.

Your node funds its payment channels from your Safe. If you withdraw too much, it can't keep at least 5 channels with `100 wxHOPR` each, and it stops being eligible for Cover Traffic.

---

## Remove a node from your Safe

1. **Open your Safe module on Gnosis Scan**

   Go to `https://gnosisscan.io/address/<MODULE_ADDRESS>`, replacing `<MODULE_ADDRESS>` with your `node_module` address. It is the same value as `hopr.safe_module.module_address` in your configuration file.

2. **Open Write Contract as Proxy**

   In the middle of the page, click the **Contract** tab, then select **Write Contract as Proxy**.

   ![Gnosis scan write contract](/img/node/gnosis-scan-write-contract.png)

3. **Connect to Web3 with WalletConnect**

   Find and click **Connect to Web3**, approve the disclaimer by clicking **OK**, and in the wallet connection popup, select **WalletConnect**. Next to **Connect your wallet**, click the **Copy** icon.

   ![Gnosis scan write contract](/img/node/gnosis-scan-WalletConnect.png)

4. **Open your Safe on Safe\{Wallet\}**

   In a new browser tab, open your Safe as described in [Open your Safe](#open-your-safe).

   :::note
   If you see a **Connect Wallet** button in the top right corner and don't see your Safe owner wallet address, click **Connect Wallet** and connect with your wallet that owns the Safe.
   :::

   ![Gnosis scan write contract](/img/node/safe-global-connected.png)

5. **Click the WalletConnect icon**

   In the top right corner, just to the left of your connected wallet address, click the **WalletConnect** icon.

   ![Gnosis scan write contract](/img/node/safe-global-walletconnect.png)

6. **Paste the pairing code**

   In the **WalletConnect** popup, paste the pairing code you previously copied from the Gnosis Scan website into the **Pairing code** field. If the connection is successful, you should see a screen similar to this:

   ![Gnosis scan write contract](/img/node/safe-global-walletconnect-connected.png)

7. **Check the connection on Gnosis Scan**

   Now that your Safe wallet is connected to the Gnosis Scan website, return to the Gnosis Scan page. If the connection is successful, instead of **Connect to Web3**, you should see your Safe wallet address. It should be similar to this screenshot:

   ![Gnosis scan write contract](/img/node/gnosis-scan-safe-connected.png)

8. **Call removeNode**

   Scroll down to the bottom of the page until you find and click **7. removeNode (0xb2b99ec9)**. Enter your node address and click **Write**.

   ![Gnosis scan write contract](/img/node/gnosis-scan-safe-connected-remove-node.png)

9. **Execute the transaction**

   Return to **Safe\{Wallet\}**, where you should see the **Confirm transaction** screen. Scroll to the bottom and click **Execute**. Your wallet will prompt you to confirm the transaction.

   ![Gnosis scan write contract](/img/node/safe-wallet-confirm-tx.png)

---

## Add or remove Safe signers

Safe\{Wallet\} calls the owners of a Safe **signers**.

1. **Open your Safe**

   Open your Safe as described in [Open your Safe](#open-your-safe).

2. **Open the signer settings**

   In the left menu, click **Settings**. On the **Setup** tab, under **Signers**, click **Manage signers**.

3. **Change your signers**

   Add or remove signers, and set how many confirmations a transaction needs. Then sign and execute the transaction with your wallet.

   :::note Recommendation
   To enhance the security and recoverability of your Safe account, we recommend configuring it with **a minimum of 3 signers**, and requiring **2 confirmations** to authorize transactions. This setup ensures that if one signer loses access, the remaining two can continue managing and executing transactions without disruption.
   :::

   Only add wallets you fully control. To change only the number of required confirmations, click **Change** under **Required confirmations** on the same page.

</NoCounter>
