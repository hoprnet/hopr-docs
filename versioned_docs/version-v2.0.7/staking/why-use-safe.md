---
id: why-use-safe
title: Why does HOPR use Safe?
---

[Safe](https://safe.global/) (previously known as Gnosis Safe) is a smart account wallet that gives a secure and customizable wallet solution for storing funds.

### Signing Account vs Smart Account

When you think of a crypto wallet, you usually think of a standard signing account, like MetaMask. Your account is generated using a private key, which you keep safe and use to sign transactions and approve the movement of money from your account.

The main problem with these wallets is that if you ever lose your private key, your money is gone forever. So people go through a lot of effort to make many copies, store them safely, and never let anyone see them. But even by doing all this, you can never put the cat back in the bag. If a key was even once in local browser storage or accessible by third parties, it can never again have the lower risk profile of one that never left your trusted device.

Smart accounts solve all these issues by creating fully customizable accounts controlled by code rather than a private key.

### What is a Smart Account?

A smart account (AKA a smart contract account) is, as the name suggests, an account that is controlled by a smart contract. This means you can program in any set of rules you want for your account. Common examples include:

- Multi-sig accounts
- Spending policies
- Roles & Permissions
- Hierarchies
- Transaction batching
- Recovery mechanisms 

### Why Does HOPR Need a Smart Contract Wallet?

In order to move staking directly onto the protocol, HOPR needed a secure solution for storing node runner's funds. In web3, nodes are not as secure as people might think. Although HOPR makes every effort to maximize your security, we also want node runners to interact with their nodes easily. 

HOPR nodes are designed to be accessed remotely, sometimes by multiple people, as developers might require. Node runners often expose certain APIs to allow services to use their node, such as entry/exit nodes for RPCh relays. 

A setup like this will never be as secure as a cold wallet only touched by you, whose private key you take every precaution to secure. So, to offer the highest level of security while providing all the features and customizability HOPR wants to offer its node runners, we needed to compartmentalize node runner funds from their nodes. To achieve this, we needed a top-quality smart contract wallet.

### Why Does HOPR Use Safe?

[Safe](https://safe.global/) (previously known as Gnosis Safe) is the most secure smart contract wallet setup on the market. It already secures billions of assets with complete security and offers all the tooling developers need to create customizable solutions for their project. 

It also comes with an ecosystem of other projects whose services HOPR can leverage to provide node runners with an even smoother experience. When such an ideal off-the-shelf solution exists for exactly what HOPR needs, it didn't make sense not to use Safe, and it is now a key component in HOPR's SafeStaking setup.