---
id: safe-erc777-bug
title: Allow Safe to receive ERC777 tokens
---

This is a quick guide on how to allow Safe to receive ERC777 tokens. This is a required step to claim HOPR tokens.

## Allow Safe to Receive ERC777 Tokens (Gnosis)

(**1**) Log in to your account at [https://app.safe.global/](https://app.safe.global/)

(**2**) Click the `Apps` menu item on the left sidebar and search for the `Transaction Builder` using the search bar. 

![Transaction Builder](/img/staking/Transaction-builder-search.png)

(**3**) In a seperate tab open [https://app.safe.global/](https://app.safe.global/) and copy your Safe address.

![Safe Address](/img/staking/Safe-address-homepage.png)

(**4**)  Enter your Safe address into the field `Enter Address or ENS Name` within the transaction builder.

**Note:** If a pop-up appears, select `Use Implementation ABI`

(**5**) Scroll to the bottom, and in the `Contract Method Selector` dropdown, select the method `setFallbackHandler` and in the final text field, add the handler address: `0xeDCF620325E82e3B9836eaaeFdc4283E99Dd7562`

![sethandler](/img/staking/tx-information-sethandler.png)

(**6**) Press the `Add transaction` button, scroll to the top, and replace the address within the `Enter Address or ENS Name` field with `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`

![New tx](/img/staking/new-tx-transaction-builder.png)

(**7**) Scroll down to the bottom again, and under `Transaction information`, fill out the following details:

- Set the `Contract Method Selector` dropdown to `setInterfaceImplementer`
- `_addr (address)`: Your Safe Address
- `_interfaceHash (bytes32)*`: `0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b`
- `_implementer (address)`: Your Safe Address

![Second tx info](/img/staking/second-tx-information.png)

(**8**) Press the `Add transaction` button. You should now have two transactions under `Transactions Batch`. After confirming this, press the `Create Batch` button.

![Create transaction batch](/img/staking/create-transaction-batch.png)

(**9**) Simulate the transaction to confirm it works, then press the `Send Batch` button.

(**10**) Finally, simulate, sign and execute the new transaction.

You are all done! Your Safe will now be capable of receiving ERC777 tokens, including HOPR.