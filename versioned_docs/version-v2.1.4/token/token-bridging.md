---
id: token-bridging
title: Bridging HOPR tokens
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The HOPR token can be bridged between the **Ethereum** and **Gnosis** chains. Please choose the direction of the bridge:

<Tabs>
  <TabItem value="htoxh" label="Bridge HOPR (Ethereum) to xHOPR (Gnosis)">

#### 1. Navigate to the bridge
   
   Go to the [Gnosis Bridge page](https://bridge.gnosischain.com).

#### 2. Connect your wallet
   
   In the top-right corner, click "**Connect Wallet**" to link your wallet with the Gnosis Bridge.

#### 3. Select Ethereum chain & token
   
   In the "**Transfer from**" section, ensure that "**Ethereum**" is selected as the chain. Then, click on "**Select token**" and search for "**HOPR token**". In the input field, enter the amount of HOPR tokens you want to bridge to Gnosis.
   
   :::warning important

    If you are using a [Safe wallet](https://safe.global), you must use a different recipient address. Safe wallets are smart contracts built on specific blockchains, and they cannot be used across multiple chains. To avoid losing your funds, ensure the recipient address **supports the Gnosis chain**.

    To use a different recipient address, click "**Send to a different wallet**" and enter an address that is compatible with the Gnosis chain.

   :::

   ![Bridging HOPR tokens](/img/token/token-bridging-1.jpg)

#### 4. Approve token spending
   
   Click "**Approve**" to set the spending limit. In the MetaMask popup, confirm that the spending cap matches the amount you want to bridge.

   ![Bridging HOPR tokens](/img/token/token-bridging-2.jpg)

#### 5. Finalize approval
   
   After setting the spending cap, click "**Next**" and then "**Approve**" to finalize the approval process.

   ![Bridging HOPR tokens](/img/token/token-bridging-3.jpg)

#### 6. Execute the bridge transaction
   
   Once the approval transaction is successful (you can verify this in your wallet or on Etherscan), click the "**Bridge**" button to start transferring your HOPR tokens to the Gnosis chain.

   ![Bridging HOPR tokens](/img/token/token-bridging-4.jpg)

#### 7. Confirm bridging
   
   In the MetaMask popup, verify that the bridging amount is correct and click "**Confirm**" to proceed with the HOPR token bridging.

   ![Bridging HOPR tokens](/img/token/token-bridging-5.jpg)

#### 8. Wait for transaction completion 
   
   After the bridging transaction has been initiated, you will see a "**Bridge initiated**" screen. Wait for all required block confirmations to reach 100% completion.

   ![Bridging HOPR tokens](/img/token/token-bridging-6.jpg)

#### 9. Verify completion & import tokens 
   
    Once the bridging process is 100% complete, your HOPR tokens will be successfully transferred to the Gnosis chain. You can now import the bridged HOPR token (**xHOPR**) into your wallet using the correct smart contract address, which can be found [here](./acquiring-hopr-tokens.md#hopr-tokens-on-different-chains).

   ![Bridging HOPR tokens](/img/token/token-bridging-7.jpg)

  </TabItem>
  <TabItem value="xhtoh" label="Bridge xHOPR (Gnosis) to HOPR (Ethereum)">

#### 1. Navigate to the bridge

   Go to the [Gnosis Bridge page](https://bridge.gnosischain.com).

#### 2. Connect your wallet

   In the top-right corner, click "**Connect Wallet**" to link your wallet to the Gnosis Bridge.

#### 3. Switch the bridge direction to transfer from Gnosis to Ethereum

   Between the "**Transfer from**" and "**Transfer to**" sections, click on the "**bidirectional arrows**" icon to switch the bridging direction from "**Ethereum to Gnosis**" to "**Gnosis to Ethereum**". Ensure that "**Gnosis**" is selected under "**Transfer from**". Then, click "**Select token**" and search for "**HOPR token**". Enter the amount of xHOPR tokens you want to bridge to Ethereum.

    :::warning important

    If you are using a [Safe wallet](https://safe.global), you must use a different recipient address. Safe wallets are smart contracts built on specific blockchains, and they cannot be used across multiple chains. To avoid losing your funds, ensure the recipient address **supports the Ethereum chain**.

    To use a different recipient address, click "**Send to a different wallet**" and enter an address that is **compatible with the Ethereum chain**.

   :::

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-1.jpg)

#### 4. Start the Bridge Transaction

   Click the "**Bridge**" button to begin transferring your HOPR tokens to the Ethereum chain.

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-1.jpg)

#### 5. Wait for Transaction Completion

   Once the bridge transaction starts, you'll see a "**Bridge initiated**" screen. Wait until the required block confirmations reach 100%.

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-3.jpg)

#### 6. Navigate to "My Transactions"
   
   After the bridging process reaches 100%, your HOPR tokens will need to be claimed on the Ethereum chain. First, switch your wallet network from "**Gnosis**" to "**Ethereum**". Then, on the Gnosis Bridge page, click your wallet address in the top-right corner and select "**My Transactions**".

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-4.jpg)

#### 7. Claim HOPR Tokens on Ethereum
   
   Find your recent transaction and click the "**Claim**" button. You’ll need to pay gas fees on the Ethereum chain to complete the claim.

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-5.jpg)

#### 8. Verify Completion & Import Tokens
   
   After clicking "**Claim**", confirm the transaction in your wallet and wait for it to be executed. Once the transaction is complete, you can now import the bridged HOPR token (**HOPR**) into your wallet using the correct smart contract address, which can be found [here](./acquiring-hopr-tokens.md#hopr-tokens-on-different-chains).

   ![Bridging HOPR tokens](/img/token/token-bridging-to-mainnet-6.jpg)

  </TabItem>
</Tabs>