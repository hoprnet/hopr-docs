---
id: staking-FAQ
title: Staking FAQ
---

### How will the boost NFTs from previous releases be used in the future?

The initial idea of the HOPR protocol was to stake and receive rewards for relaying data. All NFTs are discontinued except the Network Registry NFT, which is necessary to meet the minimum staking threshold of 10,000 HOPR. The Network Registry NFT doesn't provide any APY boost.

### With CT launch, what tokens will be redistributed to nodes in channels?

Only `wxHOPR` is used within channels. Cover traffic will also distribute rewards in the form of tickets, redeemable for wxHOPR.

### What is Cover Traffic, and what is its purpose?

Cover Traffic ("CT") is the new way to earn rewards. The cover traffic app has four components, which operate in the following sequence:

- Netwatcher's task is to locate nodes on the network and create a list.
- The Aggregator collects all node information from the Netwatchers and sends it to the database.
- EconomicHandler applies the economic model and pushes the data to the queue.
- Postman takes the queue and distributes a series of 1-hop messages to every node.

### How often Cover Traffic is distributing the rewards?

Currently, Cover Traffic (CT) distribution happens every hour. If your node is not reachable by our CT netwatchers during the rewards distribution, you will lose the rewards for the current distribution cycle and will need to wait for the next one. In the future, CT rewards distribution will be continuous.

### Does Cover Traffic have threshold rewards caps, and if so, why?

Cover Traffic has a minimum threshold cap of 10,000 wxHOPR. This means that if your total stake is equal to or greater than 10,000 wxHOPR, you will start receiving rewards, with the condition that your node remains reachable and performs normally.

Cover Traffic also has a maximum threshold cap of 75,000 wxHOPR. If you stake up to 75,000 wxHOPR per node, you will receive the maximum rewards. However, if you stake more than 75,000 wxHOPR, your rewards will be significantly reduced.

Based on the Cover Traffic economic model rewards threshold, we have prepared some recommendations:

- When a participant has `<= 75.000` HOPR tokens: you don't need to run several nodes because rewards are based on your stake alone. For example, if you decide to have 2 nodes with stakes of 40.000 & 35.000 HOPR token, you will get the same rewards as you would from running 1 node with a `75.000` stake.

- When a participant has `>75.000` HOPR tokens: the optimal reward strategy is to split your stake across multiple nodes with `<= 75.000` HOPR in each. Additional HOPR staked in nodes above `75.000` will earn rewards, but at a significantly reduced rate.

The Cover Traffic threshold was intentionally set to make the network more decentralized and to distribute rewards more fairly. This ensures that even node runners with a small stake have the opportunity to receive rewards. Currently, we are projecting a stable APY of 10-15%!

### What is the Cover Traffic economic model, and how is it calculated?

The Cover Traffic economic model projects the expected reward of a node runner can expect given the underlying parameters.

Here are 3 different scenarios based on node runners stake and 5 nodes in the network:

:::tip Table terms

**Stake (wxHOPR)** - The amount of HOPR tokens staked by the node runner.

**Transformed Stake (wxHOPR)** - Whenever a node runner exceeds the 75,000 wxHOPR threshold, this parameter ensures a drastic decrease in rewards.

**CT probability (pct)** - Cover traffic probability, the higher you stake, the higher probability to receiwe rewards from the cover traffic.

**Expected reward (wxHOPR)** - Expected rewards based on the staking amount and node performance.

**Expected tickets** - Expected ticket numbers to be rewarded by the Cover traffic. 1 ticket equals to 1 wxHOPR.

**APY (pct)** - Your staking rewards APY (Annual Percentage Yield).

:::

**1st scenario:**

Every node runner are in between the Cover traffic thresholds, receiving maximum rewards based on their stake amount and node performance.

|    | Node A | Node B | Node C | Node D | Node E | 
| -- | ------ | ------ | ------ | ------ | ------ |
| Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 75000    |
| Transformed Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 75000    |
| CT probability (pct) | 4.65    | 13.95    | 23.26     | 23.26    | 34.88    |
| Expected reward (wxHOPR) | 465.12    | 1395.35    | 2325.58     | 2325.58   | 3488.37    |
| Expected tickets | 465    | 1395    | 2326     | 2326    | 3488    |
| APY (pct) | 55.81    | 55.81    | 55.81     | 55.81   | 55.81    |

**2nd scenario:**

The owner of Node E decided to stake 100,000 wxHOPR instead of 75,000 wxHOPR. We can see that their Transformed stake amount decreased from 100,000 to approximately 76,000 HOPR tokens. This is the amount from which Cover Traffic will calculate the rewards. Expected rewards are quite similar to the rewards if the node had staked 75,000 instead of 100,000 per node.

|    | Node A | Node B | Node C | Node D | Node E | 
| -- | ------ | ------ | ------ | ------ | ------ |
| Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 100000    |
| Transformed Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 76384.8    |
| CT probability (pct) | 4.62    | 13.86    | 23.11 | 23.11    |35.3    |
| Expected reward (wxHOPR) | 462.14    | 1386.42    | 2310.7     | 2310.7   | 3530.04    |
| Expected tickets | 462    | 1386    | 2311     | 2311    | 3530    |
| APY (pct) | 55.46    | 55.46    | 55.46     | 55.46   | 42.36    |

**3rd scenario:**

The owner of Node E made a strategic decision to split his 100,000-wxHOPR stake into two nodes, one with 75,000 wxHOPR and the other with 25,000 wxHOPR. By aggregating the expected rewards from both nodes, he significantly increased his total rewards compared to running a single node, as shown in the second scenario. This approach maximizes his rewards while staying within the stake threshold.

|    | Node A | Node B | Node C | Node D | Node E (1st node) | Node E (2nd node)
| -- | ------ | ------ | ------ | ------ | ------ | ------ |
| Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 75000    | 25000 |
| Transformed Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000   |75000    | 25000    |
| CT probability (pct) | 4.17    | 12.5    | 20.83    | 20.83    | 31.25    | 10.42   |
| Expected reward (wxHOPR) | 416.67    | 1250.0    | 2083.33     | 2083.33    | 3125.0    | 1041.67 |
| Expected tickets | 417    | 1250    | 2083    | 2083   | 3125   | 1042 |
| APY (pct) | 50.0    | 50.0    | 50.0     | 50.0   | 50.0    | 50.0 |

For a more detailed and in-depth explanation of the Cover Traffic economic model, please read: [here](https://github.com/hoprnet/ct-research/wiki/Economic-model)

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

Yes, you can. We don't have any limitations, you can see how to associate additional nodes to your HOPR Safe in our docs [here](./using-staking-hub.md#how-to-add-multiple-nodes).

### What is the maximum amount I can stake on a single node without penalty?

The upper threshold for staking on a single node is 75,000 wxHOPR. Above this amount, the staked wxHOPR will be less valuable for receiving rewards through cover traffic. Read [here](../staking/ct-economic-model.md) for a simple overview of the cover traffic economic model. For a more detailed overview, check out the documentation [here](https://github.com/hoprnet/ct-research/wiki/Economic-model).