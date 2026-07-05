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

### strategy

In this section, you can configure various strategies for your node, enabling you to optimize its performance and behavior to meet your specific requirements. Explore the available strategies below:

```md
strategy:
  allow_recursive: false
  execution_interval: 1m
  strategies:
  - AutoRedeeming:
      redeem_all_on_close: true
      minimum_redeem_ticket_value: 1 wxHOPR
      redeem_on_winning: true
  - ChannelLifecycle:
      tick_interval: 1m
      jitter: 5s
      population:
        min_open_channels: 5
        target_open_channels: 8
        peer_reopen_cooldown: 30m
      eligibility:
        require_currently_connected: true
        min_peer_quality_score: 0.5
        peer_quality_weight: 0.6
        ticket_activity_weight: 0.4
        require_observed_since_start: true
        allowlist: null
        blocklist: []
      funding:
        initial_balance: 1 wxHOPR
        topup_balance: 1 wxHOPR
        lower_balance_threshold: 1 wxHOPR
        min_safe_balance_required: 1 wxHOPR
        stop_when_unfunded: true
      proactive_funding:
        enabled: true
        fallback_chain_op_duration: 1m
        depletion_lookback: 10m
        safety_margin: 1.5
        balance_drain_weight: 1.0
        ticket_index_drain_weight: 1.0
      closure:
        close_when_peer_unseen_for: 1day
        close_below_quality_score: 0.3
        close_when_drained_below: 0 wxHOPR
        close_max_concurrent: 2
      finalizer:
        enabled: true
        max_closure_overdue: 30m
        finalize_max_concurrent: 4
      restart:
        startup_close_grace_period: 10m
      concurrency:
        max_concurrent_actions: 4
```

#### strategy.allow_recursive

Allows nesting strategies through **!MultiStrategy**.

#### strategy.execution_interval

Why it is set to 1 sec?

---

#### strategy.strategies

Contains a sequence of strategies to execute in the specified order. If left empty, the node will default to using only the **!Passive** strategy.

##### strategy.strategies.AutoRedeeming

| Settings | Default value | Description |
| --- | --- | --- |
| `redeem_all_on_close` | `true` | Redeem tickets after closing payment channels. |
| `minimum_redeem_ticket_value` | `1 wxHOPR` | The strategy will only redeem an acknowledged winning ticket if its value is at least this specified amount of HOPR. If the value is set to 0, the strategy will redeem tickets regardless of their value. |
| `redeem_on_winning` | `true` | Redeem only winning tickets. |

##### strategy.strategies.ChannelLifecycle

| Settings | Default value | Description |
| --- | --- | --- |
| `tick_interval` | `1m` | Base period between full evaluation passes. |
| `jitter` | `5s` | Redeem tickets after closing payment channels. |
| `population.min_open_channels` | `5` | Maximum random offset added to the tick interval to spread out concurrent node restarts.  Implemented as a deterministic offset based on the current system time nanoseconds.  |
| `population.target_open_channels` | `8` | Redeem tickets after closing payment channels. |
| `population.peer_reopen_cooldown` | `30m` | Redeem tickets after closing payment channels. |
| `eligibility.require_currently_connected` | `true` | Redeem tickets after closing payment channels. |
| `eligibility.min_peer_quality_score` | `0.6` | Redeem tickets after closing payment channels. |
| `eligibility.peer_quality_weight` | `0.4` | Redeem tickets after closing payment channels. |
| `eligibility.require_observed_since_start` | `true` | Redeem tickets after closing payment channels. |
| `eligibility.allowlist` | `null` | Redeem tickets after closing payment channels. |
| `eligibility.blocklist` | `[]` | Redeem tickets after closing payment channels. |
| `funding.initial_balance` | `1 wxHOPR` | Redeem tickets after closing payment channels. |
| `funding.topup_balance` | `1 wxHOPR` | Redeem tickets after closing payment channels. |
| `funding.lower_balance_threshold` | `1 wxHOPR` | Redeem tickets after closing payment channels. |
| `funding.min_safe_balance_required` | `1 wxHOPR` | Redeem tickets after closing payment channels. |
| `funding.stop_when_unfunded` | `true` | Redeem tickets after closing payment channels. |
| `proactive_funding.enabled` | `true` | Redeem tickets after closing payment channels. |
| `proactive_funding.fallback_chain_op_duration` | `1m` | Redeem tickets after closing payment channels. |
| `proactive_funding.depletion_lookback` | `10m` | Redeem tickets after closing payment channels. |
| `proactive_funding.safety_margin` | `1.5` | Redeem tickets after closing payment channels. |
| `proactive_funding.balance_drain_weight` | `1.0` | Redeem tickets after closing payment channels. |
| `proactive_funding.ticket_index_drain_weight` | `1.0` | Redeem tickets after closing payment channels. |
| `closure.close_when_peer_unseen_for` | `1day` | Redeem tickets after closing payment channels. |
| `closure.close_below_quality_score` | `0.3` | Redeem tickets after closing payment channels. |
| `closure.close_when_drained_below` | `0 wxHOPR` | Redeem tickets after closing payment channels. |
| `closure.close_max_concurrent` | `2` | Redeem tickets after closing payment channels. |
| `finalizer.enabled` | `true` | Redeem tickets after closing payment channels. |
| `finalizer.max_closure_overdue` | `30m` | Redeem tickets after closing payment channels. |
| `finalizer.finalize_max_concurrent` | `4` | Redeem tickets after closing payment channels. |
| `restart.startup_close_grace_period` | `10m` | Redeem tickets after closing payment channels. |
| `concurrency.max_concurrent_actions` | `10m` | Redeem tickets after closing payment channels. |

</NoCounter>