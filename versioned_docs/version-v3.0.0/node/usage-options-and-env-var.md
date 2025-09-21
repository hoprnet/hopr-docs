---
id: usage-options-and-env-var
title: Usage options and environment variables
#toc_min_heading_level: 3
#toc_max_heading_level: 5
---

## Usage

`hoprd` provides various command-line switches to configure its behaviour. For reference these are documented here as well:

```bash
$ hoprd --help
HOPR node executable.

Usage: hoprd [OPTIONS]

Options:
      --network <NETWORK>
          ID of the network the node will attempt to connect to [env: HOPRD_NETWORK=]
      --identity <IDENTITY>
          The path to the identity file [env: HOPRD_IDENTITY=]
      --data <DATA>
          Specifies the directory to hold all the data [env: HOPRD_DATA=]
      --host <HOST>
          Host to listen on for P2P connections [env: HOPRD_HOST=]
      --announce...
          Announce the node on chain with a public address [env: HOPRD_ANNOUNCE=]
      --api...
          Expose the API on localhost:3001 [env: HOPRD_API=]
      --apiHost <HOST>
          Set host IP to which the API server will bind [env: HOPRD_API_HOST=]
      --apiPort <PORT>
          Set port to which the API server will bind [env: HOPRD_API_PORT=]
      --defaultSessionListenHost <DEFAULT_SESSION_LISTEN_HOST>
          Default Session listening host for Session IP forwarding [env: HOPRD_DEFAULT_SESSION_LISTEN_HOST=]
      --apiToken <TOKEN>
          A REST API token and for user authentication [env: HOPRD_API_TOKEN=]
      --password <PASSWORD>
          A password to encrypt your keys [env: HOPRD_PASSWORD=]
      --noKeepLogs...
          Disables keeping RPC logs in the logs database after they were processed. [env: HOPRD_INDEXER_DISABLE_KEEP_LOGS=]
      --noFastSync...
          Disables using fast sync at node start. [env: HOPRD_INDEXER_DISABLE_FAST_SYNC=]
      --enableLogsSnapshot...
          Enables downloading logs snapshot at node start. If this is set to true, the node will attempt to download logs snapshot from the configured `logsSnapshotUrl`. [env: HOPRD_ENABLE_LOGS_SNAPSHOT=]
      --logsSnapshotUrl <LOGS_SNAPSHOT_URL>
          URL to download logs snapshot from. If none is provided or configured in the configuration file, the node will not attempt to download any logs snapshot. [env: HOPRD_LOGS_SNAPSHOT_URL=]
      --maxBlockRange <MAX_BLOCK_RANGE>
          Maximum number of blocks that can be fetched in a batch request from the RPC provider. [env: HOPRD_MAX_BLOCK_RANGE=]
      --maxRequestsPerSec <MAX_RPC_REQUESTS_PER_SEC>
          Maximum number of RPC requests that can be performed per second. [env: HOPRD_MAX_RPC_REQUESTS_PER_SEC=]
      --provider <PROVIDER>
          A custom RPC provider to be used for the node to connect to blockchain [env: HOPRD_PROVIDER=]
      --init...
          initialize a database if it doesn't already exist [env: HOPRD_INIT=]
      --forceInit...
          initialize a database, even if it already exists [env: HOPRD_FORCE_INIT=]
      --probeRecheckThreshold <SECONDS>
          Timeframe in seconds after which it is reasonable to recheck the nearest neighbor [env: HOPRD_PROBE_RECHECK_THRESHOLD=]
      --networkQualityThreshold <THRESHOLD>
          Minimum quality of a peer connection to be considered usable [env: HOPRD_NETWORK_QUALITY_THRESHOLD=]
      --configurationFilePath <CONFIG_FILE_PATH>
          Path to a file containing the entire HOPRd configuration [env: HOPRD_CONFIGURATION_FILE_PATH=]
      --safeTransactionServiceProvider <HOPRD_SAFE_TX_SERVICE_PROVIDER>
          Base URL for safe transaction service [env: HOPRD_SAFE_TRANSACTION_SERVICE_PROVIDER=]
      --safeAddress <HOPRD_SAFE_ADDR>
          Address of Safe that safeguards tokens [env: HOPRD_SAFE_ADDRESS=]
      --moduleAddress <HOPRD_MODULE_ADDR>
          Address of the node management module [env: HOPRD_MODULE_ADDRESS=]
      --protocolConfig <HOPRD_PROTOCOL_CONFIG_PATH>
          Path to the protocol-config.json file [env: HOPRD_PROTOCOL_CONFIG_PATH=]
  -h, --help
          Print help
  -V, --version
          Print version
```

### Environment variables

On top of the default configuration options generated for the command line, the following environment variables can be used in order to tweak the node functionality:

- `ENV_WORKER_THREADS` - the number of environment worker threads for the tokio executor
- `HOPRD_LOG_FORMAT` - override for the default stdout log formatter (follows tracing formatting options)
- `HOPRD_USE_OPENTELEMETRY` - enable the OpenTelemetry output for this node
- `OTEL_SERVICE_NAME` - the name of this node for the OpenTelemetry service
- `HOPR_INTERNAL_CHAIN_DISCOVERY_CHANNEL_CAPACITY` - the maximum capacity of the channel for chain generated discovery signals for the p2p transport
- `HOPR_INTERNAL_DISCOVERY_UPDATES_CAPACITY` - the maximum capacity of the transport component handling chain discovery events
- `HOPR_INTERNAL_ACKED_TICKET_CHANNEL_CAPACITY` - the maximum capacity of the acknowledged ticket processing queue
- `HOPR_INTERNAL_LIBP2P_MAX_CONCURRENTLY_DIALED_PEER_COUNT` - the maximum number of concurrently dialed peers in libp2p
- `HOPR_INTERNAL_LIBP2P_MAX_NEGOTIATING_INBOUND_STREAM_COUNT` - the maximum number of negotiating inbound streams
- `HOPR_INTERNAL_LIBP2P_SWARM_IDLE_TIMEOUT` - timeout for all idle libp2p swarm connections in seconds
- `HOPR_INTERNAL_DB_PEERS_PERSISTENCE_AFTER_RESTART_IN_SECONDS` - cutoff duration from now to not retain the peers with older records in the peers database (e.g. after a restart)
- `HOPR_INTERNAL_REST_API_MAX_CONCURRENT_WEBSOCKET_COUNT` - the maximum number of concurrent websocket opened through the REST API
- `HOPR_INTERNAL_MANUAL_PING_CHANNEL_CAPACITY` - the maximum capacity of awaiting manual ping queue
- `HOPR_INTERNAL_MIXER_CAPACITY` - capacity of the mixer buffer
- `HOPR_INTERNAL_MIXER_MINIMUM_DELAY_IN_MS` - the minimum mixer delay in milliseconds
- `HOPR_INTERNAL_MIXER_DELAY_RANGE_IN_MS` - the maximum range of the mixer delay from the minimum value in milliseconds
- `HOPR_INTERNAL_PROTOCOL_BIDIRECTIONAL_CHANNEL_CAPACITY` - the maximum capacity of HOPR messages processed by the node
- `HOPR_INTERNAL_SESSION_CTL_CHANNEL_CAPACITY` - the maximum capacity of the session control channel
- `HOPR_INTERNAL_SESSION_INCOMING_CAPACITY` - the maximum capacity of the queue storing unprocessed incoming and outgoing messages inside a session
- `HOPR_INTERNAL_SESSION_BALANCER_LEVEL_CAPACITY` - the maximum capacity of the session balancer
- `HOPR_INTERNAL_RAW_SOCKET_LIKE_CHANNEL_CAPACITY` - the maximum capacity of the raw socket-like bidirectional API interface
- `HOPR_BALANCER_PID_P_GAIN` - proportional (P) gain for the PID controller in outgoing SURB balancer (default: `0.6`)
- `HOPR_BALANCER_PID_I_GAIN` - integral (I) gain for the PID controller in outgoing SURB balancer (default: `0.7`)
- `HOPR_BALANCER_PID_D_GAIN` - derivative (D) gain for the PID controller in outgoing SURB balancer (default: `0.2`)
- `HOPR_SURB_RB_SIZE` - number of incoming SURBs the ring buffer can hold (default: 10 000)
- `HOPR_TEST_DISABLE_CHECKS` - the node is being run in test mode with some safety checks disabled (currently: minimum winning probability check)
- `HOPR_CAPTURE_PACKETS` - allow capturing customized HOPR packet format to a PCAP file or to a `udpdump` host. Note that `hoprd` must be built with the `capture` feature.
- `HOPR_TRANSPORT_MAX_CONCURRENT_PACKETS` - maximum number of concurrently processed incoming packets from all peers (default: 10)
- `HOPR_TRANSPORT_STREAM_OPEN_TIMEOUT_MS` - maximum time (in milliseconds) to wait until a stream connection is established to a peer (default: `2000 ms`)
- `HOPR_PACKET_PLANNER_CONCURRENCY` - maximum number of concurrently planned outgoing packets (default: `10`)
- `HOPR_SESSION_FRAME_SIZE` - The maximum chunk of data that can be written to the Session's input buffer (default: 1500)
- `HOPR_SESSION_FRAME_TIMEOUT_MS` - The maximum time (in milliseconds) for an incomplete frame to stay in the Session's output buffer (default: 800 ms)
- `HOPR_PROTOCOL_SURB_RB_SIZE` - size of the SURB ring buffer (default: 10 000)
- `HOPR_PROTOCOL_SURB_RB_DISTRESS` - threshold since number of SURBs in the ring buffer triggers a distress packet signal (default: 1000)
- `HOPRD_SESSION_PORT_RANGE` - allows restricting the port range (syntax: `start:end` inclusive) of Session listener automatic port selection (when port 0 is specified)
- `HOPRD_SESSION_ENTRY_UDP_RX_PARALLELISM` - sets the number of UDP listening sockets for UDP sessions on Entry node (defaults to number of CPU cores)
- `HOPRD_SESSION_EXIT_UDP_RX_PARALLELISM` - sets the number of UDP listening sockets for UDP sessions on Exit node (defaults to number of CPU cores)
- `HOPRD_NAT` - indicates whether the host is behind a NAT and sets transport-specific settings accordingly (default: `false`)

### Example execution

Running the node without any command-line argument might not work depending on the installation method used. Some command line arguments are required.

Some basic reasonable setup uses a custom identity and enables the REST API of the `hoprd`:

```bash
hoprd --identity /app/hoprd-db/.hopr-identity --password switzerland --init --announce --host "0.0.0.0:9091" --apiToken <MY_TOKEN> --network doufur
```

Here is a short breakdown of each argument.

```bash
hoprd
  # store your node identity information in the persisted database folder
  --identity /app/hoprd-db/.hopr-identity
  # set the encryption password for your identity
  --password switzerland
  # initialize the database and identity if not present
  --init
  # announce the node to other nodes in the network and act as relay if publicly reachable
  --announce
  # set IP and port of the P2P API to the container's external IP so it can be reached on your host
  --host "0.0.0.0:9091"
  # specify password for accessing REST API
  --apiToken <MY_TOKEN>
  # a network is defined as a chain plus a number of deployed smart contract addresses to use on that chain
  --network doufur
```

Special care needs to be given to the `network` argument, which defines the specific network `hoprd` node should join. Only nodes within the same network can communicate using the HOPR protocol.

### Using Docker Compose with extended HOPR node monitoring

Please follow the documentation for [`docker compose` based deployment](./deploy/compose/README.md).
