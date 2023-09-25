---
id: staking-FAQ
title: Staking FAQ
---

### How will the boost NFTs from previous releases be used in the future?

The initial idea of the HOPR protocol was about staking and receiving rewards for relaying data. As a result, we are planning to discontinue all NFTs except the Network Registry NFT, which is necessary to meet the minimum staking threshold of 10,000 HOPR. The Network Registry NFT doesn't provide any APY boost.

### With CT launch, what tokens will be redistributed to nodes in channels?

Only `wxHOPR` is used within channels. Cover traffic will also distribute rewards in the form of tickets, redeemable for wxHOPR.

### Does CT have threshold rewards caps, and if so, why?

CT has a minimum threshold cap of 10,000 wxHOPR. This means that if your total stake is equal to or greater than 10,000 wxHOPR, you will start receiving rewards, with the condition that your node remains reachable and performs normally.

CT also has a maximum threshold cap of 75,000 wxHOPR. If you stake up to 75,000 wxHOPR per node, you will receive the maximum rewards. However, if you stake more than 75,000 wxHOPR, your rewards will be significantly reduced.

Based on the CT economic model rewards threshold, we have prepared some recommendations:

- When a participant has <= 75.000 HOPR tokens: you don't need to run several nodes because rewards are based on your stake alone. For example, if you decide to have 2 nodes with stakes of 40.000 & 35.000 HOPR token, you will get the same rewards as you would from running 1 node with a 75.000 stake.

- When a participant has >75.000 HOPR tokens: the optimal reward strategy is to split your stake across multiple nodes with <= 75.000 HOPR in each. Additional HOPR staked in nodes above 75.000 will earn rewards, but at a significantly reduced rate.

The Cover Traffic threshold was intentionally set to make the network more decentralized and to distribute rewards more fairly. This ensures that even node runners with a small stake have the opportunity to receive rewards. Currently, we are projecting a stable APY of 10-15%!

### What is my expected APY?

The expected average additional APY earned by a node runner is 10-15%. You will also earn rewards for relaying data from services using HOPR such as RPCh. 

But this is the expected additional APY an average node runner will earn. You can see a breakdown of the economic model [here](https://twitter.com/hoprnet/status/1696539901305790534).

### What is the lock-up period for my stake?

There is no lock up period, so withdraw your funds whenever, but you lose rewards the less you stake and get no rewards if you stake below 10,000 wxHOPR.

### Can I stake without a node?

No, all staking must be done with a node and HOPR Safe, after the end of Staking Season 08 (09/09/2023).

### From a cost/efficiency perspective, which option should I choose: running a node on physical hardware or using a VPS?

Physical hardware may appear to be a better choice over a VPS from an economic perspective, but you need to consider the possibility of internet or power outages. 

Additionally, you will need to monitor your device periodically. In contrast, a VPS is maintained by the provider, typically with a 99.9% uptime, which might affect your node's performance.

From an economic standpoint, your staking amount also plays a role. Your expenses should be lower than your rewards. When making a decision, we recommend trying a VPS. This allows you to assess the ratio between your monthly expenses and rewards.

### What is the minimum threshold of stake required to start running a node?

- **Without a Network Registry NFT:** You will need a minimum of 30,000 wxHOPR and at least one xDAI.
- **With a Network Registry NFT:** You will need a minimum of 10,000 wxHOPR and at least one xDAI.

You can find where to purchase the relevant tokens [here](../staking/how-to-get-hopr.md).

### If I hold an NR NFT but lack the minimum threshold of 10,000 wxHOPR tokens, will I be able to run a node at a later time?

If you have NR NFT, you can join the network at any time later with a threshold of 10,000 wxHOPR.

### What will happen to participants on the waitlist who do not receive an NR NFT before the launch of the major release?

The Monte Rosa waiting list has been closed, and we are not accepting new registrations for the old release. 

However, we will distribute NR NFTs to everyone on the waiting list until it concludes.

### Is obtaining an NR NFT from the NFT marketplace and then running a node possible?

Yes, absolutely. You can purchase a Network Registry NFT and stake 10,000 wxHOPR tokens to participate in the HOPR network.


Currently, you can try to get Network Registry NFT on [nifftyfair](https://niftyfair.io/gc/collection/0x43d13d7b83607f14335cf2cb75e87da369d056c7/*)

### Will I earn rewards if I simply stake my HOPR tokens?

Our aim is to grow the HOPR network. If you only stake HOPR tokens, you will not receive any rewards, as you need to run a node. Running a node is easier than you might think! You have several methods to choose from, so opt for the one that suits you best:

- Acquire a [Dappnode device](https://dappnode.com/collections/all/products/hopr-special-edition) and simply install the HOPR package with a single click

- Acquire a VPS and install the HOPRd node with just a [single Docker command](https://docs.hoprnet.org/node/using-docker)

### Can I run multiple nodes?

Yes, you can. We don't have any limitations, although the [Staking Hub](https://hub.hoprnet.org/) will only support multiple nodes in the next release and not at launch time.
