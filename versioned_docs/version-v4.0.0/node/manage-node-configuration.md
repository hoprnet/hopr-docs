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

    Navigate to the `.hoprd-db-dufour` directory on your machine and upload the newly created configuration file there. Ensure that the configuration file is named **hoprd-docker.cfg.yaml**.

4. **Launch HOPRd node**

    1. After uploading the configuration file, [stop your current node](node-operations.md?node_service=docker#stop-the-hoprd-node).

    2. Once your node is stopped, add the additional parameter to link your configuration file to your current docker command:
    
        ```bash
        --configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'
        ```

        **Important:** When adding new flags to a multi-line command, you must add a backslash to the very end of the preceding line so the terminal knows the command is continuing.

        **Updated Docker command with the configuration file**

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
        europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:latest \
        --init \
        --api \
        --announce \
        --identity /app/hoprd-db/.hopr-id-dufour \
        --data /app/hoprd-db \
        --apiHost '0.0.0.0' \
        --apiToken '<YOUR_API_TOKEN>' \
        --password '<YOUR_DB_PASSWORD>' \
        --safeAddress '<SAFE_WALLET_ADDRESS>' \
        --moduleAddress '<MODULE_ADDRESS>' \
        --host '<YOUR_PUBLIC_IP>:9091' \
        --blokli-url 'https://blokli.rotsee.hoprnet.link' \
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

1. **Locate `hopr.host.address.IPv4` and set your public IP**

   1. Locate your external IP address by refering to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address). 

   2. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
    
   3. Replace **127.0.0.1** with your own public IP address when configuring your node.

2. **Locate `hopr.host.port` and expose port 9091**

    1. The default port for peer-to-peer communication is **9091**.

    2. If you’ve set a different port using the **HOPRD_P2P_PORT** environment variable, make sure to use that one instead.

    3. If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port **9091** to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

3. **Locate `hopr.safe_module.safe_address` and enter your Safe wallet address**

    Add your Safe wallet address, more details under [safe_module](#hoprsafe_module).

4. **Locate `hopr.safe_module.module_address` and enter your Module address**

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

1. **Locate `hopr.host.address.IPv4` and set your public IP**

    1. Locate your external IP address by refering to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address). 

    2. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
    
    3. Replace **127.0.0.1** with your own public IP address when configuring your node.

2. **Locate `hopr.host.port` and expose port 9091**

    If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port **9091** to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

3. **Locate `hopr.safe_module.safe_address` and enter your Safe wallet address**
    
    Add your Safe wallet address, more details under [safe_module](#hoprsafe_module).

4. **Locate `hopr.safe_module.module_address` and enter your Module address**

    Add your Module address, more details under [safe_module](#hoprsafe_module).

5. **Locate `identity.file` and set path for the identity file**

    Add the full path to the location where **hopr.id** identity file will be created. 

    **Example:** 

    ```md
    /root/hoprd/conf/hopr.id
    ```

6. **Locate `password` and set database password**

    Enter the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on creating a secure database password, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

7. **Locate `auth` and specify secret token for the REST API**

    Create a secret token, which is required for connecting to your node via REST API. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

    **Example:**

    ```md
    !Token My#S3cur1ty#Token
    ```
</TabItem>
</Tabs>

---

## Validate your node configuration file

Every time your node starts, HOPRd automatically checks your configuration file. If something in the file is missing, incorrect, or no longer supported, your node will not start and you will see an error in the logs.

Example error output:

```md
hoprd container startup attempt: validating configuration
Error: failed to build config
```

If you see an error mentioning the configuration, it means your configuration file needs to be updated. Follow [this guide](#create-and-apply-configuration-file-to-your-node) to update your configuration file to the latest version.

### How to check your logs

If you want to confirm the error, you can view your node's logs. Select the option below that matches how you run your HOPRd node:

<Tabs queryString="conf_validation">
<TabItem value="docker" label="Docker run / Docker compose">

Run the following command to view your logs:

```md
docker logs -t <Your_Node_Container_ID>
```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

Navigate to the HOPRd package and click the **Logs** tab to view your logs.

</TabItem>
</Tabs>

---

## Understanding configuration file settings

Configuration file used by the HOPR protocol. The file is written in YAML format and contains various settings related to the operation of the HOPR node. Below is a breakdown of the example file structure and the key settings within each section:

```md
hopr:
  announce: true
  host:
    address:
      IPv4: 0.0.0.0
    port: 9091
  safe_module:
    safe_address: "0x0000000000000000000000000000000000000000"
    module_address: "0x0000000000000000000000000000000000000000"
  network:
    session_idle_timeout: 3m
    maximum_sessions: 2048
    session_establish_max_retries: 3
    probe_recheck_threshold: 10s
    probe_interval: 3s
    announce_local_addresses: false
    prefer_local_addresses: false
    outgoing_ticket_winning_prob: null
    min_incoming_ticket_price: null
  ticket_storage_file: null
identity:
  file: ""
  password: ""
  private_key: null
db:
  data: ""
  initialize: true
  force_initialize: false
api:
  enable: false
  auth: None
  host:
    address:
      IPv4: 127.0.0.1
    port: 3001
session_ip_forwarding:
  use_target_allow_list: true
  target_allow_list: []
  tcp_target_retry_delay: 2
  max_tcp_target_retries: 10
  default_entry_listen_host: 127.0.0.1:0
blokli_url: https://blokli.prod.hoprnet.link
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

:::note

The latest version of the default configuration file for all supported platforms could be manually generated on [HOPRd GitHub repository](https://github.com/hoprnet/hoprd#configuration).

:::

---

### hopr.announce

```md
hopr:
  announce: true
```

### hopr.host

Specifies host to listen on for the HOPR P2P protocol.

```md
hopr:
  host:
    address
      IPv4: 127.0.0.1
    port: 9091
```

| Settings | Default value | Description |
| --- | --- | --- |
| `hopr.host.address.IPv4` | | The external IP address of the machine where the node is running. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements. |
| `hopr.host.port` | `9091` | Listening on TCP & UDP ports. |

### hopr.safe_module

Configuration of node's Safe.

```md
safe_module:
    safe_address: '0x0000000000000000000000000000000000000000'
    module_address: '0x0000000000000000000000000000000000000000'
```

| Settings | Description |
| --- | --- |
| `safe_module.safe_address` | Node's safe address, this must be provided by the user. |
| `safe_module.module_address` | Node's module address, this must be provided by the user. |

### hopr.network

```md
network:
    session_idle_timeout: 3m
    maximum_sessions: 2048
    session_establish_max_retries: 3
    probe_recheck_threshold: 10s
    probe_interval: 3s
    announce_local_addresses: false
    prefer_local_addresses: false
    outgoing_ticket_winning_prob: null
    min_incoming_ticket_price: null
  ticket_storage_file: null
```

### identity

The main node's identity, defining it's on-chain and off-chain keys.

```md
identity:
  file: ""
  password: ""
  private_key: null
```

| Settings | Description |
| --- | --- |
| `identity.file` | The path to the identity file. If no file exists at the specified location, a new one will be created. |
| `identity.password` | The database password used to access the identity file. For guidance on creating a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
| `identity.private_key` | A private key that the node can use instead of an identity file. If provided, this will override the identity file. | 

### db

Specifies details for the database used by the HOPR node.

```md
db:
  data: ""
  initialize: true
  force_initialize: false
```

| Settings | Description |
| --- | --- |
| `db.data` | Specifies the path to the database directory. For Docker users, the path is **/app/hoprd-db**. For Dappnode users, the path is **/app/hoprd/data**. |
| `db.initialize` | Defaults to **true**, meaning the database will be created if it doesn't already exist. If set to **false** and the database is missing, the node will not start. |
| `db.force_initialize` | Defaults to **false**. If set to **true**, any existing database in the specified directory will be overwritten and re-initialized. |

### api

The configuration of the REST API.

```md
api:
  enable: false
  auth: None
  host:
    address:
      IPv4: 127.0.0.1
    port: 3001
```

| Settings | Description |
| --- | --- |
| `api.enable` | Indicates whether the REST API should be enabled. Possible values: **true** or **false**. |
| `api.auth` | Authentication of the REST API. When using custom secret token, it is necessary to use **!Token** before secret token. Example: **!Token My#S3cur1ty#Token**. For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
| `api.host` | Defines the local interface host where the API should listen. |
| `api.host.address.IPv4` | The address of the local interface to listen on. |
| `api.host.port` | The REST API TCP lsiten port. |

### session_ip_forwarding

```md
session_ip_forwarding:
  use_target_allow_list: true
  target_allow_list: []
  tcp_target_retry_delay: 2
  max_tcp_target_retries: 10
  default_entry_listen_host: 127.0.0.1:0
```
### blokli_url

On-chain Indexer of HOPR smart contracts and on-chain operations provider. 

```md
blokli_url: https://blokli.prod.hoprnet.link
```

| Settings | Description |
| --- | --- |
| `blokli_url` | Default indexer url: https://blokli.prod.hoprnet.link, can be run localy. |

</NoCounter>