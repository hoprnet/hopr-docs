---
id: heartbeat
title: Heartbeat Mechanism
group: h-no-count
---

## Heartbeat Mechanism

The HOPR network employs a heartbeat mechanism to estimate the availability of nodes. This mechanism allows nodes to keep track of the health scores of other nodes in the network and uses an exponential backoff approach for efficient health score measurements.

### Health Score

Every node maintains a health score for all other nodes it is aware of in the network. A node's health score is increased when it is observed online and decreased when it is unreachable. Each node with a funded outgoing payment channel starts with an initial health score of 0.2.

A node's health score is increased by 0.1 when it responds to a ping with a pong packet or sends its own ping. Conversely, a node's health score is reduced by 0.1 if it does not respond to a ping. The health score ranges from 0 (minimum) to 1 (maximum). Nodes with a health score greater than or equal to the default health threshold (0.5) are considered online and suitable for use in paths. Nodes with lower health scores are omitted.

### Exponential Backoff

To account for the dynamic nature of network status changes (e.g., due to power outages or unstable network links), the HOPR network frequently remeasures node availability. However, constantly probing known offline nodes is inefficient. HOPR addresses this issue by using a heartbeat mechanism with exponential backoff.

The time until the next ping (tbo) is sent to a node increases with the number of failed ping attempts (nfail) since the last successful attempt or the network start. A successful response to a ping resets the backoff timer.

The backoff time (tbo) is calculated using the following formula:

```
$$
tbo = tbase * fbo^{nfail}
$$
```

where:
- tbase = 2s (initial backoff time)
- fbo = 1.5 (backoff factor).

The maximum backoff time is 512 seconds, corresponding to nfail = 5. This mechanism ensures a dynamic trade-off between probing online nodes and minimizing resource consumption for offline nodes.