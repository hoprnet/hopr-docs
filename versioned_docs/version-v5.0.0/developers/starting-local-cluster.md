---
id: starting-local-cluster
title: HOPR Cluster Development Setup
group: h-no-count
---

A series of HOPR nodes fully interconnected with each other is called a HOPR cluster. You can run a HOPR cluster locally for development, which lets you test against a realistic multi-node HOPR network without connecting to a live network.

The local cluster starts several `hoprd` nodes on your machine, a local Ethereum chain (Anvil) and a HOPR indexer (Blokli), and opens payment channels between every pair of nodes. The chain state is temporary and the node configuration is simplified, so the cluster is not equivalent to a production network.

The full reference is the [local cluster README](https://github.com/hoprnet/hoprd/blob/v5.0.0-rc.1/docs/localcluster/README.md) in the HOPRd repository.

## Requirements

- [Nix](https://nixos.org/download/) with flakes enabled: add `experimental-features = nix-command flakes` to `~/.config/nix/nix.conf`.
- A Docker-compatible container runtime: Docker (Docker Desktop, OrbStack and similar), Podman, or Apple `container` on macOS.

## Build

Clone the [HOPRd repository](https://github.com/hoprnet/hoprd), then build the `hoprd` and `hoprd-localcluster` binaries from its root folder:

```bash
nix build -L --out-link result-hoprd .#binary-hoprd
nix build -L --out-link result-localcluster .#binary-hoprd-localcluster
```

The binaries are placed in `./result-hoprd/bin/hoprd` and `./result-localcluster/bin/hoprd-localcluster`.

## Run

Start a cluster of three nodes:

```bash
CHAIN_IMAGE=europe-west3-docker.pkg.dev/hoprassociation/docker-images/bloklid-anvil:latest

RUST_LOG=info \
./result-localcluster/bin/hoprd-localcluster \
  --hoprd-bin ./result-hoprd/bin/hoprd \
  --chain-image "$CHAIN_IMAGE" \
  --size 3
```

- **Podman:** add `--container-runtime podman`.
- **Apple `container` (macOS):** run `container system start` once after each boot, then add `--container-runtime container`.
- **Blokli already running:** replace `--chain-image "$CHAIN_IMAGE"` with `--chain-url <BLOKLI_URL>` to skip the chain container.

The cluster is running when the log shows `localcluster running; press Ctrl+C to stop`. Press **Ctrl+C** to stop all nodes and remove the chain container.

## Connect to the nodes

Node `i` (starting at `0`) listens for the REST API on port `3000 + i` and for P2P traffic on port `9000 + i`. Check that each node is ready:

```bash
for port in 3000 3001 3002; do
  printf "node @%d: " "$port"
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:${port}/readyz"
done
```

All three should print `200`. The REST API of each node is available under `http://localhost:<PORT>/api/v4/`, and its interactive documentation under `http://localhost:<PORT>/swagger-ui/`. By default, the API requires no token. To require one, start the cluster with `--api-token <TOKEN>`.

To get the node addresses, API URLs and other details as JSON, run:

```bash
./result-localcluster/bin/hoprd-localcluster status
```

## Options

| Flag | Default | Description |
| --- | --- | --- |
| `--size` | `3` | Number of nodes to start (1 to 5). |
| `--api-port-base` | `3000` | First API port. Each node uses this port plus its ID. |
| `--p2p-port-base` | `9000` | First P2P port. |
| `--data-dir` | `/tmp/hopr-nodes` | Folder for the generated configuration files, identities, databases and logs. |
| `--api-token` | none | Token required by the REST API of every node. |
| `--funding-amount` | `1 wxHOPR` | Funding amount of each channel. |
| `--channel-management` | `api` | How channels are opened at startup: `api`, `strategy`, `both` or `none`. |
| `--container-runtime` | `docker` | Container CLI to use: `docker`, `podman`, `container` and others. |

The node logs are written to `<data-dir>/logs/`, and the generated node configuration files to `<data-dir>/hoprd_cfg_<ID>.yaml`.
