---
id: ct-economic-model
title: Cover Traffic Economic Model
---

This is an outline of the current Cover Traffic Economic Model used by HOPR. The model aims to distribute rewards across nodes based on their staked tokens while incentivizing a decentralized network that remains private to observers. 

## Expected Rewards

Each node in the network can calculate its expected rewards based on its [probability of receiving rewards](./ct-economic-model.md#cover-traffic-probability) and the budget for that time period.

Expected Rewards = Cover Traffic Probability * Budget

## Cover Traffic Probability

The probability of receiving cover traffic is determined by your [transformed stake](./ct-economic-model.md#transformed-stake) and the transformed stake of every other node in the network. 

Cover Traffic Probability = Your Node's Transformed Stake / Total Transformed Stake in The Network.

## Transformed Stake

A node's stake on the network has a transformation function applied to it. This transformed value is used when calculating rewards distributed by cover traffic. The following transformation function is used:

![Transformation Function](/img/node/CT-probability.png)

The [parameters](./ct-economic-model.md#parameters) are subject to change, but the model splits into three parts:

* All nodes staking less than the lower threshold `l` are treated as if they have zero stake.
* All nodes staking between the lower and upper thresholds `l` and `c` have a transformed stake equal to `their stake * a'. Here, `a' is a parameter that the HOPR association can change.
* All nodes staking above the upper threshold `c` have a transformed stake equal to `(a * c) + (their stake - c)^1/b`. Here, everything staked below the upper threshold is treated the same as before multiplied by the parameter `a', and everything above it has the power function `1/b` applied to it.

You can view the current parameters [here](./ct-economic-model.md#parameters) as well as examples that clarify how the model works with the current parameters [here](./ct-economic-model.md#examples)

## Parameters

These are the current parameters for the HOPR cover traffic economic model and their current values.

**Note:** The HOPR Association can change these at any time. 

* Slope Coefficient, `a' = 1
* Exponent denominator, `b` = 1.4
* Lower threshold, `l` = 10,000 wxHOPR
* Upper Threshold, `c` = 75,000 wxHOPR
* `Budget` = 100,000 wxHOPR
* `Budget Period` = 2628000 Seconds

Based on these parameters, 100,000 wxHOPR is currently distributed through cover traffic every month. This will change over time as nodes are added to the network, as the 
HOPR Association aims to maintain an average APR of 10-15%.

View the [examples below](./ct-economic-model.md#examples) to better understand how these parameters affect your transformed stake and total rewards.

## Examples

These examples show how the current cover traffic economic model would work in a hypothetical network with 5 nodes. The example uses the [correct, current parameters](./ct-economic-model.md) used by cover traffic today. 

### Staking Between The Lower & Upper Threshold

With the current slope coefficient `a` set equal to `1`, any node staking between the lower threshold (`l` = 10,000 wxHOPR) and the upper threshold (`c` = 75,000 wxHOPR) will have a transformed stake equal to their actual stake. As `a * node_stake = 1 * node_stake = node_stake`.

Here, all five nodes have staked between 10,000 & 75,000 wxHOPR, and all have transformed stakes equal to their actual stake. You can then calculate each node's CT probability by dividing their transformed stake by the totally transformed stake of all five nodes in the network (215,000 who).

![CT Example 1](/img/node/CT-example-1.png)

### Staking Above The Upper Threshold

With the parameter `b` set to `1.4`, any node staking above the upper threshold (75,000 wxHOPR) will have a transformed stake equal to `75,000 + (node_stake - 75,000)^1/1.4`. Here, the stake below the upper threshold is treated as usual and is multiplied by the parameter `a` (currently `a` = 1, so all 75,000 staked below the upper threshold is treated as exactly 75,000 staked), and everything staked above the upper threshold has the power function `1/1.4` applied to it, discounting its value. 

In the below example, Node E has 100,000 wxHOPR staked. So their transformed stake becomes: `75,000 + (100,000 = 75,000)^1/1.4 = 76384.8`. Here, the first 75,000 is worth a transformed stake of 75,000 wxHOPR, but the remaining 25,000 is only worth 1,384.8 wxHOPR. This gives the node a lower APR than the other nodes as it is staking more to earn relatively less, as the wxHOPR staked above 75,000 isn't worth as much. Ideally, this would be staked on another node. 

![CT Example 2](/img/node/CT-example-2.png)

### Detailed Breakdown

For a detailed breakdown of the cover traffic economic model, view the documentation [here](https://github.com/hoprnet/ct-research/wiki/Economic-model).