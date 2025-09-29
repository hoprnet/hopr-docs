---
id: manage-node-strategies
title: Node Strategies
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

Node strategies offer advanced users detailed control over their node's behavior and HOPR protocol interactions. Configure settings like ticket redemption thresholds and automatic channel management to optimize performance. To modify or manage these strategies, implement the configuration file as described in the [node configuration guide](manage-node-configuration.md).

## Understanding node strategies

Node strategies should be in the configuration file!

### hopr.strategy

In this section, you can configure various strategies for your node, enabling you to optimize its performance and behavior to meet your specific requirements. Explore the available strategies below:

```md
strategy:
    on_fail_continue: true
    allow_recursive: false
    strategies:
        
        - !Promiscuous
        max_channels: 10
        network_quality_threshold: 0.5
        new_channel_stake: "1000000000000000000 HOPR"
        minimum_node_balance: "1000000000000000000 HOPR"
        min_network_size_samples: 20
        enforce_max_channels: true
        minimum_peer_version: ">=2.1.0"    
        
        - !AutoFunding
        funding_amount: "1000000000000000000 HOPR"
        min_stake_threshold: "1000000000000000000 HOPR"
        
        - !Aggregating
        aggregation_threshold: 1000
        unrealized_balance_ratio: 0.9
        aggregate_on_channel_close: true
        
        - !AutoRedeeming
        redeem_only_aggregated: true
        minimum_redeem_ticket_value: "2500000000000000000 HOPR"
        
        - !Passive    
        
        - !ClosureFinalizer
        max_closure_overdue: 300
```

:::info

HOPR token amounts are measured with **18 decimal places**. When setting a custom value, be sure to **add 18 zeros to the integer value**. For example, **1 HOPR Token** should be entered as **1000000000000000000 HOPR**.

:::

#### strategy.on_fail_continue

When set to **true**, the system will continue executing subsequent strategies even if previous ones fail.

#### strategy.allow_recursive

Allows nesting strategies through **!MultiStrategy**.

---

#### strategy.strategies

Contains a sequence of strategies to execute in the specified order. If left empty, the node will default to using only the **!Passive** strategy.

##### strategy.strategies: !Promiscuous

Defines a promiscuous strategy that automatically manages HOPR channels based on certain measured qualities of other HOPR nodes in the network.

| Settings | Description |
| --- | --- |
| `max_channels` | The maximum number of opened channels the strategy should maintain. |
| `network_quality_threshold` | A quality threshold between 0 and 1 used to determine whether the strategy should open a channel with the peer. Only nodes above this threshold will be chosen for channels. |
| `new_channel_stake` | The stake of tokens that should be allocated to a channel opened by the strategy. |
| `minimum_node_balance` | The minimum token balance of the node. When reached, the strategy will not open any new channels. |
| `min_network_size_samples` | The minimum number of network quality samples before the strategy can start making decisions. |
| `enforce_max_channels` | When set to **true**, the strategy will forcefully close channels, even with peers that exceed the **network_quality_threshold**, if the total number of opened outgoing channels (whether opened by the strategy or manually) surpasses the maximum limit. |
| `minimum_peer_version` | Specifies minimum node version of the peer the strategy should open a channel to. Accepts semver syntax. |

##### strategy.strategies: !AutoFunding

Automatically funds channels with a specified amount if the stake on any channel falls below the defined threshold.

| Settings | Description |
| --- | --- |
| `funding_amount` | The amount to automatically fund a channel when its stake drops below the threshold. |
| `min_stake_threshold` | The minimum stake value at which the channel will be automatically funded. |

##### strategy.strategies: !AutoRedeeming

Automatically aggregates tickets when the number of unredeemed tickets in a channel exceeds the specified threshold.

| Settings | Default value | Description |
| --- | --- | --- |
| `redeem_only_aggregated` | `false` | Due to changes in ticket price and winning probability, the aggregation feature has been removed. Ensure the `redeem_only_aggregated` setting is set to `false`.|
| `minimum_redeem_ticket_value` | `1 wxHOPR` | The strategy will only redeem an acknowledged winning ticket if its value is at least this specified amount of HOPR. If the value is set to 0, the strategy will redeem tickets regardless of their value.

##### strategy.strategies: !Passive

A strategy that does nothing. This is equivalent to leaving the strategies array empty.

##### strategy.strategiesc: !ClosureFinalizer

Monitors channels in the **PendingToClose** state whose channel closure grace period has elapsed, and issues a channel close transaction on these channels to finalize the closure.

| Settings | Default value | Description |
| --- | --- | --- |
| `max_closure_overdue` | `300` | It won't attempt to finalize the closure of channels that have been overdue for more than provided amount of seconds. |
</NoCounter>