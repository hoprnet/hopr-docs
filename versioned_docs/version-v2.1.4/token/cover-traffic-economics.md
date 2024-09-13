---
id: cover-traffic-economics
title: Cover traffic economics
---

The Cover Traffic economic model projects the expected reward of a node runner can expect given the underlying parameters.

Here are 3 different scenarios to show how the current cover traffic economic model would work in a hypothetical network with 5 nodes:

## Table of terms

| Term | Description |
|----|----|
|  **Stake (wxHOPR)** | The amount of HOPR tokens staked by the node runner. |
|  **Transformed Stake (wxHOPR)** | Whenever a node runner exceeds the 75,000 wxHOPR threshold, this parameter ensures a drastic decrease in rewards. |
|  **CT probability (pct)** | Cover traffic probability, the higher you stake, the higher probability to receiwe rewards from the cover traffic. |
|  **Expected reward (wxHOPR)** | Expected rewards based on the staking amount and node performance. |
|  **Expected tickets** | Expected ticket numbers to be rewarded by the Cover traffic. 1 ticket equals to 1 wxHOPR. |
|  **APY (pct)** | Your staking rewards APY (Annual Percentage Yield). |

## 1st economic model scenario:

Every node runner is in between the Cover traffic thresholds, receiving maximum rewards based on their stake amount and node performance.

|    | Node A | Node B | Node C | Node D | Node E | 
| -- | ------ | ------ | ------ | ------ | ------ |
| Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 75000    |
| Transformed Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 75000    |
| CT probability (pct) | 4.65    | 13.95    | 23.26     | 23.26    | 34.88    |
| Expected reward (wxHOPR) | 465.12    | 1395.35    | 2325.58     | 2325.58   | 3488.37    |
| Expected tickets | 465    | 1395    | 2326     | 2326    | 3488    |
| APY (pct) | 55.81    | 55.81    | 55.81     | 55.81   | 55.81    |

## 2nd economic model scenario:

The owner of Node E decided to stake 100,000 wxHOPR instead of 75,000 wxHOPR. We can see that their Transformed stake amount decreased from 100,000 to approximately 76,000 HOPR tokens. This is the amount from which Cover Traffic will calculate the rewards. Expected rewards are quite similar to the rewards if the node had staked 75,000 instead of 100,000 per node.

|    | Node A | Node B | Node C | Node D | Node E | 
| -- | ------ | ------ | ------ | ------ | ------ |
| Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 100000    |
| Transformed Stake (wxHOPR) | 10000    | 30000    | 50000     | 50000    | 76384.8    |
| CT probability (pct) | 4.62    | 13.86    | 23.11 | 23.11    |35.3    |
| Expected reward (wxHOPR) | 462.14    | 1386.42    | 2310.7     | 2310.7   | 3530.04    |
| Expected tickets | 462    | 1386    | 2311     | 2311    | 3530    |
| APY (pct) | 55.46    | 55.46    | 55.46     | 55.46   | 42.36    |

## 3rd economic model scenario:

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