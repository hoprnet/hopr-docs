---
id: using-config-file
title: Using Configuration File
---

This page explains how to set up the configuration file for use for both Docker/Dappnode setups and explains what each variable does. 

# Set Up Configuration File

To set up your node's configuration file, you can use the example file.

(**1**) Download the example file [here](/files/cfg.new.yaml).

(**2**) Edit the main variables as you would on a normal installation:

* **Databse Password:** The varibale is `password`, found under `Identity`.
* **API Token:** The variable is `auth`, found under `API`.
* **Safe Address:** The variable is `safe_address`, found under `safe_module`.
* **Module Address** The variable is `module_address`, found under `safe_module`.
* **Public IP Address:** The variable is `address`, found under `host`.

(**3**) Then feel free to edit as many of the customizable variabless as you would like. You can see a list of each variable its description/usage [here](./using-config-file.md#variables).

(**4**) Save the completed configuration file. Where you save it will depend on whether you are using Dappnode or Docker.

* **Dappnode users** can save the file anywhere they will be able to access it later as they will upload the file during the installation process.
* **Docker users** should save the file within the database directory they will be using for their node. This is commonly set to `/app/hoprd-db`.
 
# Variables

## Identity

The main node's identity, defining it's on-chain and off-chain keys.

```bash
identity:
  file: path/to/identity.file
  password: 'change_me'
  private_key: ''
```

* **file:** Path to the identity file, a new one is created if none exists at the path location.
* **password:** The password to access the identity file.
* **private_key:** A private key can be provided which the node uses instead of an identity file. Providing this will override the identity file.  

## API

The configuration of the REST API.

```bash
api:
  enable: false
  auth: None
  host:
    address: !IPv4 127.0.0.1
    port: 3001
```

* **enable:** Indicates whether the REST API should be enabled. Possible values: `true` or `false`.
* **auth:** What kind of authentication the REST API should use. Possible values: `None` or `!Token <some token>` which will enforce bearer token authentication.
* **host:** Defines the local interface host where the API should listen.
* **address:** The address of the local interface to listen on.
* **port:** The REST API TCP lsiten port 

## HOPR

Configuration of the HOPR protocol.

### Host

Specifies host to listen on for the HOPR P2P protocol.

- **address:** Specifies the external IP address of the local interface that is connected to the internet. This address will be announced on-chain. 
- **port:** The listen TCP port.

```bash
host:
  address: !IPv4 1.2.3.4
  port: 9091
```

### DB

Specifies details for the database used by the HOPR node.

- **data:** The path to the directory with the database. 
- **initialize:** If set, database will be created (if it does not exist). Otherwise, if `false` is given and database is not present, the node will fail to start.
- **force_initialize:** If set, will overwrite and re-initialize any existing database in the given directory.

```bash
db:
  data: /app/db
  initialize: true
  force_initialize: false
```

### Safe Module

Configuration of node's Safe.

- **safe_transaction_service_provider:** The node's safe transaction provider, such as https://safe-transaction.prod.hoprtech.net/
- **safe_address:** Node's safe address, this must be provided by the user.
- **module_address:** Node's safe module address, this must be provided by the user.

```bash
safe_module:
  safe_transaction_service_provider: https:://provider.com/
  safe_address: '0x0000000000000000000000000000000000000000'
  module_address: '0x0000000000000000000000000000000000000000'
```

### Startegy

Configuration of HOPR channel strategies.

- **on_fail_continue:** Will not continue executing the next strategy in the chain if one of them fails.
- **allow_recursive:** Allows nesting strategy chains via !MultiStrategy.

- **strategies:** Contains chain of strategies to execute in a given order. If left empty, the node will behave as if only the `!Passive` strategy was given.

  - **- !Promiscuous** Defines a promiscuous strategy that automatically manages HOPR channels based on certain measured qualities of other HOPR nodes in the network.
    - **max_channels:** The maximum number of opened channels the strategy should maintain.
    - **network_quality_threshold:** A quality threshold between 0 and 1 used to determine whether the strategy should open channel with the peer. Only node's above this threshold will be chosen for channels.
    - **new_channel_stake:** The stake of tokens that should be allocated to a channel opened by the strategy.
    - **minimum_node_balance:** The minimum token balance of the node. When reached, the strategy will not open any new channels.
    - **min_network_size_samples:** The minimum number of network quality samples before the strategy can start making decisions.
    - **enforce_max_channels:** If set, the strategy will aggressively close channels (even with peers above the `network_quality_threshold`) if the number of opened outgoing channels (regardless if opened by the strategy or manually) exceeds the max.
    - **minimum_peer_version:** Specifies minimum version of the peer the strategy should open a channel to. Accepts semver syntax.

  - **- !AutoFunding** Channel auto-funding strategy. Automatically funds channels with the given funding amount if the stake on any channel drops below the given threshold.
    - **funding_amount:** Amount to automatically fund a channel that dropped below the threshold.
    - **min_stake_threshold:** The auto funding threshold.

  - **- !Aggregating** Strategy performing automatic ticket aggregation once the amount of unredeemed tickets in a channel goes over the given threshold.
    - **aggregation_threshold:** Number of acknowledged winning tickets in a channel that triggers the ticket aggregation in that channel when exceeded.
    - **unrealized_balance_ratio:** Percentage of unrealized balance in unaggregated tickets in a channel that triggers the ticket aggregation when exceeded.
    - **aggregation_timeout:** Maximum time to wait for the ticket aggregation to complete.
    - **aggregate_on_channel_close:** If set, the strategy will automatically aggregate tickets in channels that have transitioned to the PendingToClose state.

  - **- !AutoRedeeming**
    - **redeem_only_aggregated:** If set, the strategy will redeem only aggregated tickets.
    - **on_close_redeem_single_tickets_value_min:** The strategy will automatically redeem if there's a single ticket left when a channel transitions to PendingToClose and it has at least this value of HOPR.

  - **- !Passive** A strategy that does nothing. This is equivalent to leaving the strategies array empty.

    - **!ClosureFinalizer:** A strategy that monitors channels in the PendingToClose state whose channel closure grace period has elapsed, and issues a channel close transaction on these channels to finalize the closure.
    - **max_closure_overdue:** Do not attempt to finalize the closure of channels that have been overdue for more than this amount of seconds (3600 seconds).

```bash
strategy:
  on_fail_continue: true
  allow_recursive: false
  strategies:
    - !Promiscuous
      max_channels: 10
      network_quality_threshold: 0.5
      new_channel_stake: "1000000 HOPR"
      minimum_node_balance: "10000000 HOPR"
      min_network_size_samples: 20
      enforce_max_channels: true
      minimum_peer_version: ">=2.0.0"

    - !AutoFunding
      funding_amount: "10000000000000000000 HOPR"
      min_stake_threshold: "1000000000000000000 HOPR"

    - !Aggregating
      aggregation_threshold: 100
      unrealized_balance_ratio: 0.9
      aggregation_timeout: 60
      aggregate_on_channel_close: true

    - !AutoRedeeming
      redeem_only_aggregated: true
      on_close_redeem_single_tickets_value_min: "2000000000000000000 HOPR"

    - !Passive
    
    - !ClosureFinalizer
      max_closure_overdue: 3600
```

### Heartbeat

Configuration of the heartbeat mechanism for probing other nodes in the HOPR network.

- **interval:** Interval in which the heartbeat is triggered in seconds.
- **threshold:** The time interval for which to consider peer heartbeat renewal in seconds.
- **variance:** Round-to-round variance to complicate network sync in seconds.

```bash
heartbeat:
  interval: 60
  threshold: 60
  variance: 2
```

### Network Options

Defines how the quality of nodes in the HOPR network is evaluated.

- **min_delay:** Minimum delay (seconds) will be multiplied by backoff, it will be half the actual minimum value.
- **max_delay:** Maximum delay in seconds.
- **quality_bad_threshold:** Quality threshold since a node is considered having "bad" connectivity.
- **quality_offline_threshold:** Quality threshold from which a node is considered available enough to be used.
- **quality_step:** Quality step on failed/successful ping probe.
- **quality_avg_window_size:** Size of the quality moving average window.
- **ignore_timeframe:** Indicates how long (in seconds) a node is considered "ignored".
- **backoff_exponent:** Backoff exponent when probing nodes.
- **backoff_min:** Minimum backoff (in seconds) when probing nodes.
- **backoff_max:** Maximum backoff (in seconds) when probing nodes.

```bash
network_options:
  min_delay: 1
  max_delay: 300
  quality_bad_threshold: 0.2
  quality_offline_threshold: 0.5
  quality_step: 0.1
  quality_avg_window_size: 25
  ignore_timeframe: 600
  backoff_exponent: 1.5
  backoff_min: 2.0
  backoff_max: 300.0
```

### Transport

Transport related configuration.

- **announce_local_addresses:** Should local addresses be announced on-chain? Set to true for testing only.
- **prefer_local_addresses:** Should local addresses be preferred when dialing a peer? Set to true for testing only.

```bash
transport:
  announce_local_addresses: false
  prefer_local_addresses: false
```

### Protocol

Configuration of various HOPR sub-protocols.

- **ack:** Message acknowledgement sub-protocol configuration.
- **timeout:** Timeout in seconds.
- **heartbeat:** Heartbeat sub-protocol configuration.
- **msg:** Message sub-protocol configuration.
- **ticket_aggregation:** Ticket aggregation sub-protocol configuration.

```bash
  protocol:
    ack:
      timeout: 15
    heartbeat:
      timeout: 15
    msg:
      timeout: 15
    ticket_aggregation:
      timeout: 15
```

### Chain

Blockchain specific configuration.

- **announce:** Indicates whether the node should announce itself on-chain.
- **network:** Which blockchain network should be used by the node.
- **provider:** RPC provider URL to use. If not given, it will use the network's chain default one.
- **check_unrealized_balance:** Indicates whether the node should check channel unrealized balance when validating acknowledged tickets. Strongly recommended to leave this enabled.

```bash
chain:
  announce: true
  network: anvil-localhost
  provider: null
  protocols:
    networks:
      anvil-localhost:
        chain: anvil
        environment_type: local
        version_range: '*'
        indexer_start_block_number: 5
        tags: []
        addresses:
          network_registry: 0x3aa5ebb10dc797cac828524e59a333d0a371443c
          network_registry_proxy: 0x68b1d87f95878fe05b998f19b66f4baba5de1aed
          channels: 0x9a9f2ccfde556a7e9ff0848998aa4a0cfd8863ae
          token: 0x9a676e781a523b5d0c0e43731313a708cb607508
          module_implementation: 0xa51c1fc2f0d1a1b8494ed1fe312d7c3a78ed91c0
          node_safe_registry: 0x0dcd1bf9a1b36ce34237eeafef220932846bcd82
          ticket_price_oracle: 0x7a2088a1bfc9d81c55368ae168c2c02570cb814f
          announcements: 0x09635f643e140090a9a8dcd712ed6285858cebef
          node_stake_v2_factory: 0xb7f8bc63bbcad18155201308c8f3540b07f84f5e
        confirmations: 2
        tx_polling_interval: 1000
        max_block_range: 200

    chains:
      anvil:
        description: Local Ethereum node, akin to Ganache, Hardhat chain
        chain_id: 31337
        live: false
        default_provider: http://127.0.0.1:8545/
        etherscan_api_url: null
        max_fee_per_gas: 1 gwei
        max_priority_fee_per_gas: 0.2 gwei
        native_token_name: ETH
        hopr_token_name: wxHOPR
        block_time: 5000
        tags: []

  check_unrealized_balance: true
```

### Inbox:

HOPRd Message Inbox configuration

* **capacity:** Capacity of messages in the Inbox, per message tag.
* **max_age:** The maximumm age of a message in the inbox in seconds.
* **excluded_tags:** Tags which are not allowed into the inbox.

```bash
inbox:
  capacity: 512
  max_age: 900
  excluded_tags: [ 0 ]
```