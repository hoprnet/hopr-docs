---
id: manage-node-configuration
title: Node Configuration
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

The node configuration file enables you to customize connectivity settings, adjust node management options such as database or identity file locations, implement custom strategies, and more.

## Create and apply configuration file to your node

Please select your platform:

<Tabs queryString="config">
<TabItem value="docker" label="Docker">

1. **Download HOPRd configuration file**

    Download the example file specificaly for Docker: [hoprd-docker.cfg.yaml](pathname:///files/hoprd-docker.cfg.yaml)

2. **(Optional) modify configuration file**

    By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

3. **Upload configuration file**

    Navigate to the **hoprd** directory on your machine and upload the newly created configuration file there. Ensure that the configuration file is named **hoprd-docker.cfg.yaml**.

4. **Launch HOPRd node**

    1. After uploading the configuration file, [stop your current node](node-operations.md?node_service=docker#stop-the-hoprd-node).

    2. Once your node is stopped, add the additional parameter **--configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'** to link your configuration file to your current docker command.

        **Docker command:**

        ```bash
        docker run \
        --pull always \
        -d --restart on-failure \
        -m 2g \
        --security-opt seccomp=unconfined \
        --platform linux/x86_64 \
        --log-driver json-file \
        --log-opt max-size=100M \
        --log-opt max-file=5 \
        -ti \
        -v $HOME/.hoprd-db-dufour/:/app/hoprd-db \
        --name hoprd \
        -p 9091:9091/tcp \
        -p 9091:9091/udp \
        -p 3001:3001 \
        -p 1422:1422/udp \
        -p 1422:1422/tcp \
        -e RUST_LOG=info \
        europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable \
        --network dufour \
        --init \
        --api \
        --announce \
        --identity /app/hoprd-db/.hopr-id-dufour \
        --data /app/hoprd-db \
        --apiHost '0.0.0.0' \
        --apiToken '<YOUR_API_TOKEN>' \
        --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' \
        --safeAddress '<SAFE_WALLET_ADDRESS>' \
        --moduleAddress '<MODULE_ADDRESS>' \
        --host '<YOUR_PUBLIC_IP>:9091' \
        --provider '<CUSTOM_RPC_PROVIDER>' \
        --configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'
        ```

        :::note
        If you're running multiple nodes or have changed the default ports, make the necessary port adjustments accordingly.
        :::

    3. Paste your Docker command into the terminal window and execute it.

    4. Wait for about 5 minutes, then [connect to your node](./node-management-admin-ui#connecting-your-node) via the HOPR Admin UI. Navigate to the **CONFIGURATION** page to verify that the strategy settings have been updated. If the changes aren't visible, try performing a hard refresh of the HOPR Admin UI page.
 
</TabItem>
<TabItem value="docker-compose" label="Docker compose">

Inside the **compose** folder, navigate to the **hoprd/conf** subfolder and make the necessary edits to the **hoprd.cfg.yaml** file:

1. **Locate `address` and set your public IP**

   1. Locate your external IP address by refering to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address). 

   2. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
    
   3. Replace **127.0.0.1** with your own public IP address when configuring your node.

2. **Locate `host.port` and expose port 9091**

    1. The default port for peer-to-peer communication is **9091**.

    2. If you’ve set a different port using the **HOPRD_P2P_PORT** environment variable, make sure to use that one instead.

    3. If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port **9091** to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

3. **Locate `provider` and specify your RPC endpoint**
    
    Use your own RPC provider, more details about [custom RPC provider](./custom-rpc-provider.md#run-your-own-gnosis-chain-node-most-secure-and-reliable). If you're using a local RPC endpoint, ensure the URL includes the **http://** prefix followed by the IP address or localhost.

4. **Locate `safe_address` and enter your Safe wallet address**

    Add your Safe wallet address, more details under [safe_module](#hoprsafe_module).

5. **Locate `module_address` and enter your Module address**

    Add your Module address, more details under [safe_module](#hoprsafe_module).

:::note

By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

:::

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Download HOPRd configuration file**

    Download the example file specifically for the Dappnode: [hoprd.cfg.yaml](pathname:///files/hoprd.cfg.yaml)

2. **(Optional) modify configuration file**

    By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

    :::note

    Adjust the [strategies section](./manage-node-strategies.md#hoprstrategy) according to your needs; no other configuration is required.

    ::::

3. **Upload configuration file**

    1. After adjusting the configuration file, connect to your Dappnode dashboard, locate the **HOPR** package, and navigate to the **File Manager** tab.

        ![File Manager](/img/node/dappnode-file-manager.png)

    2. In the **Upload file** section, click the **Browse** button next to the **Choose file** field, then select your newly created configuration file. Ensure that the configuration file is named **hoprd.cfg.yaml**.

    3. In the text field under the **Upload file** section, enter the path **`/app/hoprd/conf/`**.

        ![Dappnode file upload path](/img/node/dappnode-prefilled-config-data.png)

    4. Click the **Upload** button and wait for the upload to finish.

4. **Restart HOPRd package**

    1. Go to the **Info** page within your HOPR package, and click the **Restart** button to restart your node.

    2. Wait for about 5 minutes, then [connect to your node](./node-management-admin-ui#connecting-your-node) via the HOPR Admin UI. Navigate to the **CONFIGURATION** page to verify that the strategy settings have been updated. If the changes aren't visible, try performing a hard refresh of the HOPR Admin UI page.
</TabItem>
<TabItem value="native-binary" label="Native">

Inside the **hoprd/conf** folder, open **hoprd-binary.cfg.yaml** and update the following keys:

1. **Locate `address` and set your public IP**

    1. Locate your external IP address by refering to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address). 

    2. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
    
    3. Replace **127.0.0.1** with your own public IP address when configuring your node.

2. **Locate `host.port` and expose port 9091**

    If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port **9091** to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

3. **Locate `provider` and specify your RPC endpoint**

    Use your own RPC provider, more details about [custom RPC provider](./custom-rpc-provider.md#run-your-own-gnosis-chain-node-most-secure-and-reliable). If you're using a local RPC endpoint, ensure the URL includes the **http://** prefix followed by the IP address or localhost.

4. **Locate `safe_address` and enter your Safe wallet address**
    
    Add your Safe wallet address, more details under [safe_module](#hoprsafe_module).

5. **Locate `module_address` and enter your Module address**

    Add your Module address, more details under [safe_module](#hoprsafe_module).

6. **Locate `file` and set path for the identity file**

    Add the full path to the location where **hopr.id** identity file will be created. 

    **Example:** 

    ```md
    /root/hoprd/conf/hopr.id
    ```

7. **Locate `password` and set database password**

    Enter the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on creating a secure database password, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

8. **Locate `auth` and specify secret token for the REST API**

    Create a secret token, which is required for connecting to your node via REST API. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

    **Example:**

    ```md
    !Token My#S3cur1ty#Token
    ```
</TabItem>
</Tabs>

---

## Understanding configuration file settings

Configuration file used by the HOPR protocol. The file is written in YAML format and contains various settings related to the operation of the HOPR node. Below is a breakdown of the example file structure and the key settings within each section:

```md
hopr:
    host:
        address: !IPv4 1.2.3.4
        port: 9091
    db:
        data: /app/data
        initialize: true
        force_initialize: false
    strategy:
        on_fail_continue: true
        allow_recursive: true
        strategies:
            - !AutoRedeeming
            redeem_only_aggregated: false
            minimum_redeem_ticket_value: "1 wxHOPR"
            - !ClosureFinalizer
            max_closure_overdue: 300
    heartbeat:
        variance: 2
        interval: 60
        threshold: 40
        max_parallel_probes: 50
    network_options:
        min_delay: 1
        max_delay: 300
        quality_bad_threshold: 0.1
        quality_offline_threshold: 0.0
        quality_step: 0.1
        quality_avg_window_size: 25
        ignore_timeframe: 120
        backoff_exponent: 1.5
        backoff_min: 2.0
        backoff_max: 300.0
    protocol:
        outgoing_ticket_winning_prob: 1
        heartbeat:
            timeout: 6
    chain:
        announce: true
        network: dufour
        provider: https://gnosis-rpc.publicnode.com
        keep_logs: true
        fast_sync: true
        enable_logs_snapshot: false
    safe_module:
        safe_transaction_service_provider: https://safe-transaction.prod.hoprtech.net
    transport:
        announce_local_addresses: false
        prefer_local_addresses: false
identity:
    file: /app/data/hopr.id
    password: #For example: 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'
api:
    enable: true
    host:
        address: !IPv4 0.0.0.0
        port: 3001
```

:::note

The latest version of the default configuration file for all supported platforms is available in the [HOPR GitHub repository](https://github.com/hoprnet/hoprnet/blob/master/hoprd/hoprd/example_cfg.yaml).

:::

---

### hopr.host

Specifies host to listen on for the HOPR P2P protocol.

```md
host:
    address: !IPv4 1.2.3.4
    port: 9091
```

| Settings | Default value | Description |
| --- | --- | --- |
| `host.address` | | The external IP address of the machine where the node is running. Make sure to include **!IPv4** before entering the external IP address. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements. |
| `host.port` | `9091` | Listening on TCP & UDP ports. |

### hopr.db

Specifies details for the database used by the HOPR node.

```md
db:
    data: /app/hoprd-db
    initialize: true
    force_initialize: false
```

| Settings | Description |
| --- | --- |
| `db.data` | Specifies the path to the database directory. For Docker users, the path is **/app/hoprd-db**. For Dappnode users, the path is **/app/hoprd/data**. |
| `db.initialize` | Defaults to **true**, meaning the database will be created if it doesn't already exist. If set to **false** and the database is missing, the node will not start. |
| `db.force_initialize` | Defaults to **false**. If set to **true**, any existing database in the specified directory will be overwritten and re-initialized. |

### hopr.heartbeat

Configuration of the heartbeat mechanism for probing other nodes in the HOPR network.

```md
heartbeat:
    max_parallel_probes: 50
    interval: 60
    threshold: 40
    variance: 2
```

| Settings | Description |
| --- | --- |
| `heartbeat.max_parallel_probes` | The maximum number of concurrent heartbeat probes. |
| `heartbeat.interval` | Interval in which the heartbeat is triggered in seconds. |
| `heartbeat.threshold` | The time interval for which to consider peer heartbeat renewal in seconds. |
| `heartbeat.variance` | Round-to-round variance to complicate network sync in seconds. |

### hopr.network_options

Defines how the quality of nodes in the HOPR network is evaluated.

```md
network_options:
    min_delay: 1
    max_delay: 300
    quality_bad_threshold: 0.1
    quality_offline_threshold: 0.0
    quality_step: 0.1
    quality_avg_window_size: 25
    ignore_timeframe: 600
    backoff_exponent: 1.5
    backoff_min: 2.0
    backoff_max: 300.0
```

| Settings | Description |
| --- | --- |
| `network_options.min_delay` | Minimum delay (seconds) will be multiplied by backoff, it will be half the actual minimum value. |
| `network_options.max_delay` | Maximum delay in seconds. |
| `network_options.quality_bad_threshold` | Quality threshold since a node is considered having **bad** connectivity. |
| `network_options.quality_offline_threshold` | Quality threshold from which a node is considered available enough to be used. |
| `network_options.quality_step` | Quality step on failed/successful ping probe. |
| `network_options.quality_avg_window_size` | Size of the quality moving average window. |
| `network_options.ignore_timeframe` | Indicates how long (in seconds) a node is considered **ignored**. |
| `network_options.backoff_exponent` | Backoff exponent when probing nodes. |
| `network_options.backoff_min` | Minimum backoff (in seconds) when probing nodes. |
| `network_options.backoff_max` | Maximum backoff (in seconds) when probing nodes. |

### hopr.protocol

Configuration of various HOPR sub-protocols.

```md
protocol:
    outgoing_ticket_winning_prob: 1
    heartbeat:
        timeout: 7
```

| Settings | Description |
| --- | --- |
| `protocol.outgoing_ticket_winning_prob` | Outgoing ticket winning probability. Default value is 1. |
| `protocol.heartbeat.timeout` | Heartbeat sub-protocol configuration, with the timeout specified in seconds. |

### hopr.chain

Blockchain specific configuration.

```md
chain:
    provider: https://gnosis-rpc.publicnode.com
    announce: true
    network: dufour
```

| Settings | Description |
| --- | --- |
| `chain.announce` | Indicates whether the node should announce itself on-chain. |
| `chain.network` | Which blockchain network should be used by the node. |
| `chain.provider` | RPC provider URL to use. You should add your own provider for better performance. Additional information can be found [here](./custom-rpc-provider.md). If you're using a local RPC endpoint, ensure the URL includes the **http://** prefix followed by the IP address or localhost.|
| `chain.keep_logs` | Configures the node to retain RPC logs after processing, using more disk space but enabling future chain-node state reconciliation. |
| `chain.fast_sync` | Configures whether to use fast synchronization during node startup. This process can take anywhere from 10 to 20 minutes, depending on your hardware specifications. |
| `chain.enable_logs_snapshot` | Specifies the URL for downloading a publicly accessible tar.xz file containing SQLite logs database files. |

### hopr.safe_module

Configuration of node's Safe.

```md
safe_module:
    safe_transaction_service_provider: https://safe-transaction.prod.hoprtech.net
    safe_address: '0x0000000000000000000000000000000000000000'
    module_address: '0x0000000000000000000000000000000000000000'
```

| Settings | Description |
| --- | --- |
| `safe_module.safe_transaction_service_provider` | The node's safe transaction provider, such as https://safe-transaction.prod.hoprtech.net/ |
| `safe_module.safe_address` | Node's safe address, this must be provided by the user. |
| `safe_module.module_address` | Node's module address, this must be provided by the user. |

### hopr.transport

Transport related configuration.

```md
transport:
    announce_local_addresses: false
    prefer_local_addresses: false
```

| Settings | Description |
| --- | --- |
| `transport.announce_local_addresses` | Determines whether local addresses should be announced on-chain. Set to true for testing purposes only. |
| `transport.prefer_local_addresses` | Determines whether local addresses should be preferred when connecting to a peer. Set to true for testing purposes only. |

### identity

The main node's identity, defining it's on-chain and off-chain keys.

```md
identity:
    file: /app/hoprd-db/.hopr-id-dufour
    password: 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'
    private_key: ''
```

| Settings | Description |
| --- | --- |
| `identity.file` | The path to the identity file. If no file exists at the specified location, a new one will be created. |
| `identity.password` | The database password used to access the identity file. For guidance on creating a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
| `identity.private_key` | A private key that the node can use instead of an identity file. If provided, this will override the identity file. | 

### api

The configuration of the REST API.

```md
api:
    enable: true
    auth: !Token YOUR_SECURITY_TOKEN
    host:
        address: !IPv4 0.0.0.0
        port: 3001
```

| Settings | Description |
| --- | --- |
| `api.enable` | Indicates whether the REST API should be enabled. Possible values: **true** or **false**. |
| `api.auth` | Authentication of the REST API. When using custom secret token, it is necessary to use **!Token** before secret token. Example: **!Token My#S3cur1ty#Token**. For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
| `api.host` | Defines the local interface host where the API should listen. |
| `api.host.address` | The address of the local interface to listen on. |
| `api.host.port` | The REST API TCP lsiten port. |

</NoCounter>