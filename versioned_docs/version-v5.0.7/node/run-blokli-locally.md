---
id: run-blokli-locally
title: Run Blokli Locally
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

:::info
HOPRd v5 doesn't connect to a Gnosis Chain RPC provider. It reads all on-chain data from **Blokli**, the HOPR on-chain indexer and GraphQL API, set with [`blokli_url`](./manage-node-configuration.md#blokli_url) in your configuration file. By default, your node uses the hosted Blokli at `https://blokli.piz-palu.gnosisvpn.io`, so running your own is optional.

Blokli runs on **Linux and macOS** only. Windows is supported only for the one-off `hopli` steps, such as creating your node identity and Safe.
:::

This guide shows how to run your own Blokli with Docker Compose, index the `piz-palu-prod` network on Gnosis Chain, and connect your HOPRd v5 node to it. It was tested with `bloklid` 0.23.6, PostgreSQL 18 and HOPRd 5.0.x.

## What you will run {#what-you-will-run}

The compose file in [`hoprnet/blokli/docker`](https://github.com/hoprnet/blokli/tree/main/docker) starts two containers:

| Container | What it does | Port |
|---|---|---|
| `bloklid` | The indexer with the built-in GraphQL API. It starts once PostgreSQL reports healthy, reads `config-docker.toml`, and serves GraphQL, health and metrics on your machine. | `8080` |
| `bloklid-postgres` | PostgreSQL 18, which stores the indexed data. On its first start it runs `init-db.sql`, which sets permissions, extensions and memory tuning. Blokli creates its own tables. | `5432`, only inside Docker |

## Before you start {#before-you-start}

Have these ready on the machine where you will run Blokli:

| What you need | Details |
|---|---|
| **Linux or macOS** | Windows isn't supported for running Blokli. |
| **Docker with Docker Compose v2** | Docker Engine on Linux, or Docker Desktop on macOS. Check with `docker compose version`. |
| **Git** | To clone the Blokli repository. The compose file uses other files from the repository, so you need all of it. |
| **Gnosis Chain RPC endpoint** | The public endpoint in this guide works. A faster one shortens the first sync. See the [Custom RPC provider guide](./custom-rpc-provider.md). |
| **2 GB of free RAM and a few GB of disk** | The disk use grows over time, because Blokli keeps all historical data. |
| **Nix with flakes** (optional) | Only if you build the Blokli image yourself. |

Then check which case applies to you:

| Your situation | What to do |
|---|---|
| Your node runs on the same machine as Blokli | Follow every step. In [Connect your node to Blokli](#connect-your-node-to-blokli), use the URL for your setup. |
| Your node runs on another machine in your network | Follow every step. Allow port `8080` in the firewall of the Blokli machine. |
| Port `8080` is already used on your machine | Change Blokli's port as described in [Change the default ports](#change-the-default-ports). |
| You can't pull the Blokli image | Build it with Nix in step 3 of [Set up Blokli](#set-up-blokli). |

## Set up Blokli {#set-up-blokli}

1. **Check that port 8080 is free**

    Blokli's API needs port `8080` on your machine. Check that nothing else uses it:

    ```bash
    lsof -iTCP:8080 -sTCP:LISTEN
    ```

    If the command prints nothing, the port is free. On Linux without `lsof`, use `ss -ltnp | grep ':8080'`. If the port is taken, stop the other program or change Blokli's port as described in [Change the default ports](#change-the-default-ports).

    PostgreSQL uses port `5432` only inside Docker, so a PostgreSQL already running on your machine doesn't conflict.

2. **Clone the Blokli repository**

    ```bash
    git clone https://github.com/hoprnet/blokli.git
    cd blokli
    ```

3. **Get the Blokli image**

    The compose file expects a local image tagged `bloklid:latest`. Pull the published image, or build it yourself with Nix.

    <Tabs queryString="blokli_image">
    <TabItem value="pull" label="Pull the image">

    The image is published for x86_64 and ARM64, so this also works on Apple Silicon. In the repository folder, run:

    ```bash
    docker pull europe-west3-docker.pkg.dev/hoprassociation/docker-images/bloklid:latest
    docker tag europe-west3-docker.pkg.dev/hoprassociation/docker-images/bloklid:latest bloklid:latest
    ```

    If the pull is denied, build the image with Nix instead.

    </TabItem>
    <TabItem value="nix" label="Build with Nix">

    1. In the repository root, build and load the image for your machine:

        **x86_64 Linux:**

        ```bash
        nix build .#docker-bloklid-x86_64-linux && docker load < result
        ```

        **ARM64 Linux:**

        ```bash
        nix build .#docker-bloklid-aarch64-linux && docker load < result
        ```

    2. Check the image tag with `docker images | grep bloklid`. If the tag isn't `latest`, retag the image:

        ```bash
        docker tag bloklid:<TAG> bloklid:latest
        ```

    </TabItem>
    </Tabs>

    :::note
    The image must be recent enough to know the `piz-palu-prod` network. If Blokli fails with `Unknown network 'piz-palu-prod'`, get a newer image.
    :::

4. **Check the PostgreSQL volume path**

    Go to the `docker` folder of the repository. Run all remaining commands in this guide from this folder:

    ```bash
    cd docker
    ```

    PostgreSQL 18 stores its data in `/var/lib/postgresql`, not in `/var/lib/postgresql/data`. With the old path, PostgreSQL exits with `Error: in 18+, these Docker images are configured to store database data…`. Open `docker-compose.yml` and make sure the `volumes` of the `postgres` service read:

    ```yaml title="docker-compose.yml" {2}
        volumes:
          - postgres_data:/var/lib/postgresql
          - ./init-db.sql:/docker-entrypoint-initdb.d/init-db.sql
    ```

5. **Replace the Blokli configuration**

    Replace the contents of `config-docker.toml` with:

    ```toml title="config-docker.toml"
    # Blokli configuration for Docker Compose

    # HOPR network to index
    network = "piz-palu-prod"

    # Gnosis Chain JSON-RPC endpoint (chain ID 100)
    rpc_url = "https://rpc.gnosischain.com"

    # Maximum RPC requests per second (0 = unlimited).
    # Set a limit such as 20 if the logs show 429 or timeout errors.
    max_rpc_requests_per_sec = 0

    data_directory = "/data"

    [database]
    type            = "postgresql"
    host            = "postgres"
    port            = 5432
    database        = "bloklid"
    username        = "bloklid"
    password        = "bloklid_dev_password"
    max_connections = 10

    [indexer]
    fast_sync            = true
    enable_logs_snapshot = false

    [api]
    enabled            = true
    bind_address       = "0.0.0.0:8080"
    playground_enabled = true

    [api.transactions]
    enable_revert_reason_tracing = false
    ```

    These settings matter most:

    | Setting | What it does |
    |---|---|
    | `network` | Selects the network to index. The contract addresses are built in, so you don't need a `[contracts]` section. |
    | `rpc_url` | The Gnosis Chain RPC endpoint Blokli reads the chain from. To use your own, see the [Custom RPC provider guide](./custom-rpc-provider.md). |
    | `bind_address` | Must be `0.0.0.0:8080` inside Docker. With the default, `127.0.0.1:8080`, the API listens only inside the container and you can't reach it from your machine. |
    | `playground_enabled` | Turns on the GraphQL playground at `/graphql`. |
    | `enable_revert_reason_tracing` | `false` turns off a startup check that needs an RPC with the `debug_traceTransaction` method. Most public Gnosis Chain RPCs don't have it, and Blokli exits at startup if the check fails. Indexing works normally without it. You only lose revert reasons for failed Safe transactions sent through the API. If your RPC has the debug API, you can set it to `true`. |

    :::caution
    In TOML, `true`, `false` and numbers have no quotes, and text values use straight quotes. A stray character, such as `true"`, makes Blokli exit at startup with `TOML parse error`.
    :::

## Start Blokli {#start-blokli}

1. **Start the containers**

    ```bash
    docker compose up -d
    docker compose ps
    ```

    Both containers should be up, and PostgreSQL should be healthy:

    ```text
    bloklid            ...   Up            0.0.0.0:8080->8080/tcp
    bloklid-postgres   ...   Up (healthy)  5432/tcp
    ```

2. **Check the logs**

    ```bash
    docker compose logs -f bloklid
    ```

    A successful start shows these lines, in this order:

    - `network: piz-palu-prod` in the loaded configuration.
    - `Skipping debug tracing capability verification…`
    - `API server listening on 0.0.0.0:8080`

    Press `Ctrl+C` to stop following the logs. Blokli keeps running.

3. **Check that the API responds**

    ```bash
    curl http://localhost:8080/healthz
    ```

    The response shows the Blokli version, for example `{"status":"healthy","version":"0.23.6"}`.

Blokli has these endpoints:

| URL | Shows | Available |
|---|---|---|
| `http://localhost:8080/healthz` | Blokli is running | Right away |
| `http://localhost:8080/metrics` | Prometheus metrics, including sync progress | Right away |
| `http://localhost:8080/readyz` | Blokli has caught up with the chain | After the first sync |
| `http://localhost:8080/graphql` | GraphQL API and playground | After the first sync |

## Wait for the first sync {#wait-for-the-first-sync}

Before your node can use Blokli, Blokli must index the chain history. For `piz-palu-prod`, it starts at Gnosis Chain block `48,530,952`. How long this takes depends mostly on your RPC endpoint.

Until the sync finishes, GraphQL queries return `GraphQL API is not ready yet. Indexer is still catching up.` This is expected. You can stop and restart Blokli during the sync. It continues where it stopped. Only `docker compose down -v` deletes the progress.

1. **Follow the sync progress**

    ```bash
    curl -s http://localhost:8080/metrics | grep -E "sync_progress|indexer_block_number|chain_head_block_number"
    ```

    Example output:

    ```text
    blokli_indexer_sync_progress{phase="HistoricalDiscovery"} 0.6195
    blokli_indexer_sync_progress{phase="HistoricalSafeBackfill"} 0
    blokli_indexer_sync_progress{phase="Continuous"} 0
    blokli_chain_head_block_number 48853561
    blokli_indexer_block_number 48730825
    ```

    - `HistoricalDiscovery` is the main phase. Its value rises from `0` to `1`.
    - `HistoricalSafeBackfill` runs next and is short.
    - `Continuous` means Blokli has caught up and follows new blocks.
    - `blokli_chain_head_block_number` is the block the first sync runs to. It doesn't change during the sync. Blokli picks up newer blocks in the `Continuous` phase.

    :::note
    During the first sync, `/readyz` reports `"status":"not_ready"` with `"last_indexed_block":0` and a very large `lag`. This is expected: Blokli sets `last_indexed_block` only after both historical phases finish. Use the metrics above to follow the progress.
    :::

2. **Check that the sync has finished**

    When the sync is done, the logs show `Historical sync phases completed successfully`:

    ```bash
    docker compose logs -f bloklid | grep -i "historical sync phases completed"
    ```

    Then check that `/readyz` returns `"status":"ready"`:

    ```bash
    curl http://localhost:8080/readyz
    ```

## Connect your node to Blokli {#connect-your-node-to-blokli}

Start or restart your node only after `/readyz` reports `ready`. Your node's identity and Safe must belong to the `piz-palu-prod` network, otherwise your node finds no data for them in Blokli.

1. **Choose your Blokli URL**

    Your node needs Blokli's base URL, without `/graphql`. Which URL to use depends on where your node runs:

    | Where your node runs | Blokli URL |
    |---|---|
    | On the same machine, without Docker (binary or package) | `http://localhost:8080` |
    | In Docker, or on another machine in your network | `http://<BLOKLI_IP>:8080`, where `<BLOKLI_IP>` is the IP address of the Blokli machine |

    If your node runs on another machine, allow port `8080` in the firewall of the Blokli machine. The connection is plain HTTP, so use it only on a network you trust.

2. **Set the Blokli URL in your configuration file**

    Open your node's configuration file and change [`blokli_url`](./manage-node-configuration.md#blokli_url) to your Blokli URL:

    ```yaml title="hoprd.cfg.yaml" {1}
    blokli_url: http://localhost:8080
    ```

    The `--blokliUrl` flag and the `HOPRD_BLOKLI_URL` environment variable override this value. `blokli_url` must stay in the configuration file even if you use one of them.

3. **Restart your node**

    Restart your node as described in [Managing Node Service](./node-operations.md), then check that it works by following [this guide](./troubleshooting.md#how-to-check-if-my-node-is-working-correctly).

---

## Everyday commands {#everyday-commands}

Run these commands from the `docker` folder:

```bash
# Show the status
docker compose ps

# Follow Blokli's logs, or show the last 50 lines
docker compose logs -f bloklid
docker compose logs bloklid --tail 50

# Apply changes to config-docker.toml
docker compose restart bloklid

# Apply changes to docker-compose.yml
docker compose up -d

# Stop Blokli and keep the data
docker compose stop

# Remove the containers and keep the data
docker compose down

# Remove the containers and DELETE all indexed data (full sync on the next start)
docker compose down -v

# Open an SQL shell
docker compose exec postgres psql -U bloklid -d bloklid

# Back up the database
docker compose exec -T postgres pg_dump -U bloklid bloklid > backup.sql
```

:::caution
If you change `network` after Blokli has indexed data, run `docker compose down -v` before you start it again. Otherwise data from the two networks gets mixed.
:::

## Change the default ports {#change-the-default-ports}

Change the ports only if `8080` or `5432` is already used on your machine.

1. **Change the Blokli API port**

    In `docker-compose.yml`, under the `bloklid` service, change only the left (host) side of the port mapping:

    ```yaml title="docker-compose.yml" {2}
        ports:
          - "<NEW_PORT>:8080"
    ```

    Then run `docker compose up -d`. Use `<NEW_PORT>` wherever this guide uses `8080` on your machine, including in your node's `blokli_url`. Leave `bind_address` in `config-docker.toml` as it is.

2. **Optional: publish PostgreSQL on another port**

    PostgreSQL isn't published to your machine, so you normally don't need to change anything. To connect to it from your machine, for example with `psql` or a database app, add a port mapping under the `postgres` service in `docker-compose.yml`:

    ```yaml title="docker-compose.yml" {2}
        ports:
          - "<NEW_PORT>:5432"
    ```

    Then run `docker compose up -d` and connect with `psql -h localhost -p <NEW_PORT> -U bloklid -d bloklid`. The password is `bloklid_dev_password`. Leave the `[database]` section in `config-docker.toml` as it is: Blokli reaches PostgreSQL inside Docker, where it always uses port `5432`.

## Troubleshooting {#troubleshooting}

If Blokli keeps restarting, isn't reachable or isn't ready, see [Troubleshooting Blokli issues](./troubleshooting.md#troubleshooting-blokli-issues).

For all Blokli settings, see [`bloklid/example-config.toml`](https://github.com/hoprnet/blokli/blob/main/bloklid/example-config.toml) and the [Blokli repository](https://github.com/hoprnet/blokli).

</NoCounter>
