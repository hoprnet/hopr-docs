---
id: safestaking
title: SafeSTAKING
---

SafeStaking refers to HOPR's design for on-protocol staking. The long-term design for the protocol has always been a fully incentivized and decentralized privacy mixnet, where the incentive mechanism functions directly through the HOPR protocol. Similar to a PoS setup, but one where an additional layer of security is needed to secure node runner funds from compromised nodes. 

HOPR provides decentralized incentives for node runners through [proof-of-relay](../core/proof-of-relay.md). Still, it needed to implement a staking setup to secure staked funds in a way where node runners could accommodate access to their funds in line with their own individual risk tolerances. This is exactly what SafeStaking is designed to do.

## How SafeSTAKING works?

Node runners can store their funds within the [HOPR Safe](./safestaking.md#why-hopr-is-using-safe), a separate, extremely secure smart contract account developed using [Safe](https://safe.global/). They then create a node and associate it with their HOPR Safe. 

The funds staked on the node are used to determine the distribution of traffic the node will receive (allowing it to earn more tickets/HOPR). The funds stored in the HOPR Safe also need to be accessed by the node in limited amounts to allow it to open and fund payment channels.

The owner of the HOPR Safe has to sign and approve transactions for the node to use its funds, and the private key, which signs transactions for the "**HOPR Safe**", is referred to as the "**admin key**".

The node also needs to make transactions on-chain to use the funds within its payment channels or redeem tickets. For this, it has a separate key that it can access locally, which is referred to as the "**chain key**".

The bulk of a node runner's funds are now separated and secured within the "**HOPR Safe**" that can only be accessed via the "**admin key**", and funds stored on the node can be accessed by the node using the "**chain key**". But what makes this design special is the addition of a smart contract that allows the node runner to customize access to their node and "**HOPR Safe**" however they like. 

![Node Management](/img/core/SafeSTAKING.png)

You could choose for your node to have complete access to the "**HOPR Safe**" via just the "**chain key**", so it could do as it likes with all the funds stored within the Safe. You could make it so every action the node takes has to be approved by the "**admin key**" or both the "**admin key**" and "**chain key**", or anything in between. You could pick and choose which pair of keys is needed to send messages through your node, redeem tickets, open channels or utilize any of the functionality of the HOPR node. You can even give your node complete access to a set amount of funds within the "**HOPR Safe**" before it has to start asking for a signature from the "**admin key**".

This compartmentalization of funds, governed by a customizable hierarchy of keys, allows you to start with the default massively improved security of having your funds completely separated and isolated from your node and then to choose exactly what level of risk you are comfortable with as a node runner from there. 

## Why HOPR is using Safe?

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