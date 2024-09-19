---
id: manage-node-strategies
title: Manage node strategies
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Node strategies allow for much more detailed and granular control over your node's behavior and its interaction with the protocol, making this feature primarily suited for advanced users. These strategies enable you to effectively manage your node by configuring settings such as the threshold for ticket aggregation, the redemption process, and more. To modify or manage these strategies, you will need to implement a configuration file.

## Create and apply configuration file to your node

Please select the platform:

<Tabs>
<TabItem value="config_docker" label="Docker">

(**1**) Download the example file: [hoprd-docker.cfg.yaml](pathname:///files/hoprd-docker.cfg.yaml)

(**2**) Make the necessary edits to the recently downloaded configuration file:

- "**address**": Your public IP address, more details under [host](./manage-node-strategies.md#host).

- "**port**": If you changed the default "**9091**", please make changes, more details under [host](./manage-node-strategies.md#host).

- "**provider**": Use your own RPC provider, more details about [custom RPC provider](./custom-rpc-provider.md#1-run-your-own-gnosis-chain-node-most-secure-and-reliable).

- "**safe_address**": Add your Safe wallet address, more details under [safe_module](./manage-node-strategies.md#safe_module).

- "**module_address**": Add your Module address, more details under [safe_module](./manage-node-strategies.md#safe_module).

- "**password**": Add your database password you used on your docker command, more details under [identity](./manage-node-strategies#identity).

- "**auth**": Add your own security token, more details under [api](./manage-node-strategies#api).

(**3**) Feel free to customize the strategy settings to suit your specific needs. For detailed guidance, refer to the section: [understanding configuration file settings](./manage-node-strategies.md#understanding-configuration-file-settings).

(**4**) Navigate to the "**.hopr-id-dufour**" directory on your machine and upload the newly created configuration file there. Ensure that the configuration file is named "**hoprd-docker.cfg.yaml**".

**(5)** After uploading the configuration file, please [stop your current node](./node-operations.md#stop-your-hopr-node).

**(6)** Once your node is stopped, use the following Docker command to start your node with the new configuration:

```md
docker run --pull always -d --restart on-failure -m 2g --security-opt seccomp=unconfined --platform linux/x86_64 --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db --name hoprd -p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001 -e RUST_LOG=info europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable --configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'
```

**Note:** If you're running multiple nodes or have changed the default ports, please make the necessary port adjustments accordingly.

(**7**) Paste your docker command into the terminal window and execute it.

(**8**) Wait for about 5 minutes, then [connect to your node](./node-management-admin-ui#connecting-your-node) via the Admin UI. Navigate to the "**CONFIGURATION**" page to verify that the strategy settings have been updated. If the changes aren't visible, try performing a hard refresh of the Admin UI page.
 
</TabItem>
<TabItem value="config_dappnode" label="Dappnode">

(**1**) Download the example file: [hoprd.cfg.yaml](pathname:///files/hoprd.cfg.yaml)

(**2**) Customize the recently downloaded configuration file to adjust the strategy settings according to your specific needs. For detailed instructions, refer to the [understanding configuration file settings](./manage-node-strategies.md#understanding-configuration-file-settings) section.

**Note**: For Dappnode users, you only need to adjust the [strategies section](./manage-node-strategies.md#strategy) according to your needs; no other configuration is required.

(**3**) After adjusting the configuration file, connect to your Dappnode dashboard, locate the "**HOPR**" package, and navigate to the "**File Manager**" tab.

![File Manager](/img/node/dappnode-file-manager.png)

(**4**) In the "**Upload file**" section, click the "**Browse**" button next to the "**Choose file**" field, then select your newly created configuration file. Ensure that the configuration file is named "**hoprd.cfg.yaml**".

(**5**) In the text field under "**Upload file**" section enter the path `/app/`.

![Dappnode file upload path](/img/node/dappnode-prefilled-config-data.png)

(**6**) Click the "**Upload**" button and wait for the upload to finish.

(**7**) Go to the "**Info**" page within your HOPR package, and click the "**Restart**" button to restart your node.

(**8**) Wait for about 5 minutes, then [connect to your node](./node-management-admin-ui#connecting-your-node) via the Admin UI. Navigate to the "**CONFIGURATION**" page to verify that the strategy settings have been updated. If the changes aren't visible, try performing a hard refresh of the Admin UI page.
</TabItem>
</Tabs>

---

## Understanding configuration file settings

### host

Specifies host to listen on for the HOPR P2P protocol.

```md
host:
  address: !IPv4 1.2.3.4 # Add your publc IP address here
  port: 9091
```

- "**address**": The public IP address of the machine where the node is running. Make sure to include **!IPv4** before entering the public IP address.
- "**port**": Listening on TCP & UDP ports, default one is "**9091**".

### db

Specifies details for the database used by the HOPR node.

```md
db:
  data: /app/hoprd-db
  initialize: true
  force_initialize: false
```

- "**data**": Specifies the path to the database directory. For Docker users, the path is "**/app/hoprd-db**". For Dappnode users, the path is "**/app/hoprd-db/db**".
- "**initialize**": Defaults to "**true**", meaning the database will be created if it doesn't already exist. If set to "**false**" and the database is missing, the node will not start.
- "**force_initialize**": Defaults to "**false**". If set to "**true**", any existing database in the specified directory will be overwritten and re-initialized.

### strategy

In this section, you have the flexibility to customize a variety of strategies for your node, allowing you to optimize its performance and behavior to suit your specific needs.

```md
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
      minimum_peer_version: ">=2.0.7"
    
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
      minimum_redeem_ticket_value: "30000000000000000000 HOPR"
      on_close_redeem_single_tickets_value_min: "90000000000000000 HOPR"

    - !Passive
    
    - !ClosureFinalizer
      max_closure_overdue: 3600
```

:::info

HOPR token amounts are measured with **18 decimal places**. When setting a custom value, be sure to **add 18 zeros to the integer value**. For example, **1 HOPR Token** should be entered as **1000000000000000000 HOPR**.

:::

- "**on_fail_continue**": When set to "**true**," the system will stop executing the subsequent strategies if any of the previous ones fail.

- "**allow_recursive**": Allows nesting strategies through **!MultiStrategy**.

- "**strategies**": Contains a sequence of strategies to execute in the specified order. If left empty, the node will default to using only the "**!Passive**" strategy.

    - "**!Promiscuous**": Defines a promiscuous strategy that automatically manages HOPR channels based on certain measured qualities of other HOPR nodes in the network.

        - "**max_channels**": The maximum number of opened channels the strategy should maintain.
        - "**network_quality_threshold**": A quality threshold between 0 and 1 used to determine whether the strategy should open channel with the peer. Only node's above this threshold will be chosen for channels.
        - "**new_channel_stake**": The stake of tokens that should be allocated to a channel opened by the strategy.
        - "**minimum_node_balance**": The minimum token balance of the node. When reached, the strategy will not open any new channels.
        - "**min_network_size_samples**": The minimum number of network quality samples before the strategy can start making decisions.
        - "**enforce_max_channels**": When set to "**true**," the strategy will forcefully close channels, even with peers that exceed the "**network_quality_threshold**," if the total number of opened outgoing channels (whether opened by the strategy or manually) surpasses the maximum limit.
        - "**minimum_peer_version**": Specifies minimum node version of the peer the strategy should open a channel to. Accepts semver syntax.

    - "**!AutoFunding**": Automatically funds channels with a specified amount if the stake on any channel falls below the defined threshold.
        - "**funding_amount**": The amount to automatically fund a channel when its stake drops below the threshold.
        - "**min_stake_threshold**": The minimum stake value at which the channel will be automatically funded.

    - "**!Aggregating**": A strategy that automatically aggregates tickets when the number of unredeemed tickets in a channel exceeds the specified threshold.

        - "**aggregation_threshold**": Number of acknowledged winning tickets in a channel that triggers the ticket aggregation in that channel when exceeded.
        - "**unrealized_balance_ratio**": The percentage of unredeemed ticket value in a channel that, when exceeded, triggers ticket aggregation for that channel.
        - "**aggregation_timeout**": Maximum time to wait for the ticket aggregation to complete.
        - "**aggregate_on_channel_close**": When set to "**true**", the strategy will automatically aggregate tickets in channels that have transitioned to the "**PendingToClose**" state.

    - "**!AutoRedeeming**": A strategy that automatically redeems tickets when the following conditions are met.

        - "**redeem_only_aggregated**": When set to "**true**", the strategy will redeem only aggregated tickets.
        - "**minimum_redeem_ticket_value**": The strategy will only redeem an acknowledged winning ticket if its value is at least this specified amount of HOPR. If the value is set to 0, the strategy will redeem tickets regardless of their value.
        - "**on_close_redeem_single_tickets_value_min**": The strategy will automatically redeem if there's a single ticket left when a channel transitions to "**PendingToClose**" and it has at least this value of HOPR.

    - "**!Passive**": A strategy that does nothing. This is equivalent to leaving the strategies array empty.

    - "**!ClosureFinalizer**": A strategy that monitors channels in the "**PendingToClose**" state whose channel closure grace period has elapsed, and issues a channel close transaction on these channels to finalize the closure.
        - "**max_closure_overdue**": It won't attempt to finalize the closure of channels that have been overdue for more than this amount of seconds (3600 seconds).

### heartbeat

Configuration of the heartbeat mechanism for probing other nodes in the HOPR network.

```md
heartbeat:
  interval: 60
  threshold: 60
  variance: 2
```

- "**interval**": Interval in which the heartbeat is triggered in seconds.
- "**threshold**": The time interval for which to consider peer heartbeat renewal in seconds.
- "**variance**": Round-to-round variance to complicate network sync in seconds.

### network_options

Defines how the quality of nodes in the HOPR network is evaluated.

```md
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

- "**min_delay**": Minimum delay (seconds) will be multiplied by backoff, it will be half the actual minimum value.
- "**max_delay**": Maximum delay in seconds.
- "**quality_bad_threshold**": Quality threshold since a node is considered having "**bad**" connectivity.
- "**quality_offline_threshold**": Quality threshold from which a node is considered available enough to be used.
- "**quality_step**": Quality step on failed/successful ping probe.
- "**quality_avg_window_size**": Size of the quality moving average window.
- "**ignore_timeframe**": Indicates how long (in seconds) a node is considered "**ignored**".
- "**backoff_exponent**": Backoff exponent when probing nodes.
- "**backoff_min**": Minimum backoff (in seconds) when probing nodes.
- "**backoff_max**": Maximum backoff (in seconds) when probing nodes.

### protocol

Configuration of various HOPR sub-protocols.

```md
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

- "**ack**": Message acknowledgement sub-protocol configuration.
- "**timeout**": Timeout in seconds.
- "**heartbeat**": Heartbeat sub-protocol configuration.
- "**msg**": Message sub-protocol configuration.
- "**ticket_aggregation**": Ticket aggregation sub-protocol configuration.

### chain

Blockchain specific configuration.

```bash
chain:
    provider: https://gnosis-rpc.publicnode.com
    announce: true
    network: dufour
    check_unrealized_balance: true
```

- "**provider**": RPC provider URL to use. You should add your own provider for better performance. Additional information can be found [here](./custom-rpc-provider.md).
- "**announce**": Indicates whether the node should announce itself on-chain.
- "**network**": Which blockchain network should be used by the node.
- "**check_unrealized_balance**": Indicates whether the node should check channel unrealized balance when validating acknowledged tickets. We are strongly recommended to leave this enabled.

### safe_module

Configuration of node's Safe.

```md
safe_module:
  safe_transaction_service_provider: https://safe-transaction.prod.hoprtech.net/
  safe_address: '0x0000000000000000000000000000000000000000'
  module_address: '0x0000000000000000000000000000000000000000'
```

- "**safe_transaction_service_provider**": The node's safe transaction provider, such as https://safe-transaction.prod.hoprtech.net/
- "**safe_address**": Node's safe address, this must be provided by the user.
- "**module_address**": Node's module address, this must be provided by the user.

### transport

Transport related configuration.

```md
transport:
  announce_local_addresses: false
  prefer_local_addresses: false
```

- "**announce_local_addresses**": Determines whether local addresses should be announced on-chain. Set to true for testing purposes only.
- "**prefer_local_addresses**": Determines whether local addresses should be preferred when connecting to a peer. Set to true for testing purposes only.


### identity

The main node's identity, defining it's on-chain and off-chain keys.

```md
identity:
  file: /app/hoprd-db/.hopr-id-dufour
  password: 'change_me'
  private_key: ''
```

- **"file"**: The path to the identity file. If no file exists at the specified location, a new one will be created.
- **"password"**: The database password used to access the identity file. For guidance on creating a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).
- **"private_key"**: A private key that the node can use instead of an identity file. If provided, this will override the identity file.  

### api

The configuration of the REST API.

```md
api:
  enable: true
  auth: !Token YOUR_SECURITY_TOKEN # Change to your own token
  host:
    address: !IPv4 0.0.0.0
    port: 3001
```

- "**enable**": Indicates whether the REST API should be enabled. Possible values: "**true**" or "**false**".
- "**auth**": Authentication of the REST API. When using custom secret token, it is necessary to use "**!Token**" before secret token. Example: "**!Token My#S3cur1ty#Token**". For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).
- "**host**": Defines the local interface host where the API should listen.
- "**address**": The address of the local interface to listen on.
- "**port**": The REST API TCP lsiten port.

### inbox

HOPRd Message Inbox configuration

```bash
inbox:
  capacity: 512
  max_age: 900
  excluded_tags: [ 0 ]
```

- "**capacity**": Capacity of messages in the Inbox, per message tag.
- "**max_age**": The maximumm age of a message in the inbox in seconds.
- "**excluded_tags**": Tags which are not allowed into the inbox.