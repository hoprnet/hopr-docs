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

Node strategies are set in the `strategy` section of the configuration file.

### strategy

In this section, you can configure various strategies for your node, enabling you to optimize its performance and behavior to meet your specific requirements. Each strategy is a list item whose name is followed by a colon, with its settings indented below it:

```yaml
strategy:
  allow_recursive: false
  execution_interval: 60s
  strategies:
    - AutoRedeeming:
        redeem_all_on_close: true
        minimum_redeem_ticket_value: "1 wxHOPR"
        redeem_on_winning: true
    - ChannelLifecycle:
        population:
          min_open_channels: 5
          target_open_channels: 8
        funding:
          sizing_mode:
            probabilistic:
              success_probability: 0.99
          initial_capacity: "1 GiB"
          topup_capacity: "512 MiB"
          lower_capacity_threshold: "512 MiB"
```

Every setting has a default, so you only need to list the settings you want to change. To use a strategy with all its defaults, write `- ChannelLifecycle: {}`. Unknown settings are rejected and stop the node from starting.

If you leave the whole `strategy` section out of your configuration file, the node uses `AutoRedeeming` (with `redeem_on_winning: true`) and `ChannelLifecycle` (with `success_probability: 0.99`). If you add a `strategy` section, only the strategies you list are active.

| Settings | Default value | Description |
| --- | --- | --- |
| `strategy.allow_recursive` | `true` | Allows nesting strategies through **Multi**. Nesting is limited to one level. |
| `strategy.execution_interval` | `60s` | How often the strategies run their periodic checks. The minimum is `10s`. `ChannelLifecycle` uses its own `tick_interval` instead. |
| `strategy.strategies` | | The list of strategies to run. If the list is empty, the node behaves as **Passive**. |

---

#### strategy.strategies: AutoRedeeming

Automatically redeems winning tickets.

| Settings | Default value | Description |
| --- | --- | --- |
| `redeem_all_on_close` | `true` | Redeem all tickets in a channel (above `minimum_redeem_ticket_value`) when the channel starts closing. |
| `minimum_redeem_ticket_value` | `1 wxHOPR` | The strategy only redeems a winning ticket if it's worth at least this amount. If set to `0`, tickets are redeemed regardless of their value. |
| `redeem_on_winning` | `false` | Redeem each winning ticket as soon as it arrives. Otherwise, tickets are redeemed periodically. Set it to `true` when winning tickets are rare (winning probability below 1%). |

#### strategy.strategies: ChannelLifecycle

Automatically opens, funds, tops up, closes and finalizes your outgoing payment channels based on peer connectivity and quality. Channel stakes are set as data capacity (for example `"1 GiB"`) and converted to wxHOPR by the node.

| Settings | Default value | Description |
| --- | --- | --- |
| `tick_interval` | `60s` | Time between full evaluation passes. |
| `jitter` | `5s` | Maximum random offset added to `tick_interval`. |
| `population.min_open_channels` | `5` | Minimum number of open outgoing channels. Closures are paused when the count would drop below this. |
| `population.target_open_channels` | `8` | Target number of open outgoing channels. New channels are opened until this target is reached. |
| `population.peer_reopen_cooldown` | `15m` | How long a peer is ineligible for a new channel after its previous channel closed. |
| `eligibility.require_currently_connected` | `true` | Only open channels to peers that are currently connected. |
| `eligibility.min_peer_quality_score` | `0.5` | Minimum peer quality score (0 to 1) for opening a channel. |
| `eligibility.peer_quality_weight` | `0.6` | Weight of the peer quality score in the combined peer score. |
| `eligibility.ticket_activity_weight` | `0.4` | Weight of ticket activity in the combined peer score. |
| `eligibility.require_observed_since_start` | `true` | Only close a channel if the peer has been observed since the node started. Prevents closing channels right after a restart. |
| `eligibility.allowlist` | `~` (none) | If set, only open channels to these node addresses. |
| `eligibility.blocklist` | `[]` | Never open channels to these node addresses. |
| `eligibility.demote_non_forwarding_peers` | `true` | Prefer peers that fund their own outgoing channels, so they can relay traffic further. |
| `eligibility.minimum_peer_outgoing_channels` | `1` | Funded outgoing channels a peer needs to count as able to relay. |
| `funding.initial_capacity` | `1 GiB` | Data volume a new channel's stake should be able to carry. |
| `funding.topup_capacity` | `1 GiB` | Data volume added when a channel is topped up. |
| `funding.lower_capacity_threshold` | `256 MiB` | Remaining capacity below which a channel is topped up. |
| `funding.sizing_mode` | `deterministic` | How capacity is converted to a wxHOPR stake. `deterministic` funds the expected usage. `probabilistic` with `success_probability` (between 0.5 and 1, default `0.999`) adds a safety buffer so the channel rarely runs out before a top-up. |
| `proactive_funding.enabled` | `true` | Top up channels early based on how fast they are being used. |
| `proactive_funding.safety_margin` | `1.5` | Multiplier applied to the projected usage when deciding to top up. |
| `proactive_funding.balance_drain_weight` | `1.0` | Weight of balance decreases in the usage estimate. |
| `proactive_funding.ticket_index_drain_weight` | `1.0` | Weight of ticket activity in the usage estimate. |
| `closure.close_when_peer_unseen_for` | `24h` | Close a channel after the peer has been absent for this long. |
| `closure.close_below_quality_score` | `0.3` | Close channels to peers whose quality score dropped below this. |
| `closure.close_when_drained_below` | `0 wxHOPR` | Close channels whose balance dropped below this amount. |
| `closure.close_max_concurrent` | `2` | Maximum number of closures started per pass. |
| `closure.close_after_disconnected_ticks` | `3` | Passes in a row a peer must be disconnected before its channel is closed. |
| `finalizer.enabled` | `true` | Finalize channel closures automatically once the closure period has passed. |
| `finalizer.max_closure_overdue` | `15m` | Extra time to wait after the closure period before finalizing. |
| `finalizer.finalize_max_concurrent` | `4` | Maximum number of finalizations started per pass. |
| `restart.startup_observation_period` | `1m` | No channel is closed for this long after the node starts. |
| `restart.startup_close_grace_period` | `5m` | Channels to connected peers are protected from closure for this long after the node starts. |
| `concurrency.max_concurrent_actions` | `4` | Maximum number of channel transactions (open, fund, close, finalize) in progress at once. |
| `selector` | `default` | How peers are chosen for opening and closing: `default`, `low_latency`, `balanced`, `dispersed` or `economical`. |

#### strategy.strategies: AutoFunding

Automatically funds channels with a specified amount if the stake on any channel falls below the defined threshold. `ChannelLifecycle` already tops up channels, so you don't need this strategy when you use it.

| Settings | Default value | Description |
| --- | --- | --- |
| `funding_amount` | `10 wxHOPR` | The amount to fund a channel with when its stake drops below the threshold. Must be greater than zero. |
| `min_stake_threshold` | `1 wxHOPR` | The stake below which a channel is funded. |

#### strategy.strategies: ClosureFinalizer

Finalizes channels in the **PendingToClose** state once their closure period has elapsed. `ChannelLifecycle` already does this through its `finalizer` settings.

| Settings | Default value | Description |
| --- | --- | --- |
| `max_closure_overdue` | `300s` | Channels that have been overdue for longer than this are not finalized. Write the value with a unit, for example `300s`. |

#### strategy.strategies: Multi

Groups several strategies. It takes the same settings as the `strategy` section: `allow_recursive`, `execution_interval` and `strategies`.

#### strategy.strategies: Passive

A strategy that does nothing. This is equivalent to leaving the strategies list empty. Write it as `- Passive`.

</NoCounter>
