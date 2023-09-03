---
id: what-is-safestaking
title: What is SafeStaking?
---

SafeStaking refers to HOPR's design for on-protocol staking. The long-term design for the protocol has always been a fully incentivized and decentralized privacy mixnet, where the incentive mechanism functions directly through the HOPR protocol. Similar to a PoS setup, but one where an additional layer of security is needed to secure node runner funds from compromised nodes. 

HOPR provides decentralized incentives for node runners through [proof-of-relay](../core/proof-of-relay.md). Still, it needed to implement a staking setup to secure staked funds in a way where node runners could accommodate access to their funds in line with their own individual risk tolerances. This is exactly what SafeStaking is designed to do.

## How it Works

Node runners can store their funds within the `HOPR Safe`, a separate, extremely secure smart contract account developed using [Safe](https://safe.global/). They then create a node and associate it with their HOPR Safe. 

The funds staked on the node are used to determine the distribution of traffic the node will receive (allowing it to earn more tickets/HOPR). They also need to be accessed by the node in limited amounts to allow it to open and fund payment channels.

Funds within a node runner's HOPR Safe are guarded by their private key. The owner of the HOPR Safe has to sign and approve transactions for the node to use its funds, and this private key, which signs transactions for the `HOPR Safe`, is referred to as the `admin key`.

The node also needs to make transactions on-chain to use the funds within its payment channels or redeem tickets. For this, it has a separate key that it can access locally, which is referred to as the `chain key`.

The bulk of a node runner's funds are now separated and secured within the `HOPR Safe` that can only be accessed via the `admin key`, and funds stored on the node can be accessed by the node using the `chain key`. But what makes this design special is the addition of a smart contract that allows the node runner to customize access to their node and `HOPR Safe` however they like. 

You could choose for your node to have complete access to the `HOPR Safe` via just the `chain key`, so it could do as it likes with all the funds stored within the Safe. You could make it so every action the node takes has to be approved by the `admin key` or both the `admin key` and `chain key`, or anything in between. You could pick and choose which pair of keys is needed to send messages through your node, redeem tickets, open channels or utilize any of the functionality of the HOPR node. You can even give your node complete access to a set amount of funds within the `HOPR Safe` before it has to start asking for a signature from the `admin key`.

This compartmentalization of funds, governed by a customizable hierarchy of keys, allows you to start with the default massively improved security of having your funds completely separated and isolated from your node and then to choose exactly what level of risk you are comfortable with as a node runner from there. 












one in which Node runners stake their tokens on the HOPR network and associate them wi



Node runners need to be able to stake HOPR tokens on the HOPR network and associate them with their nodes. This has always been the long term design for the HOPR protocol. A completely decentralized and incentivized privacy mixnet, where the incentive mechanism functions directly through the HOPR protocol. 




