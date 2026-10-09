---
id: run-a-node-overview
title: Overview
group: h-no-count
---

HOPRd nodes play a crucial role in our decentralized network, operated by members of the HOPR community. Before setting up your own HOPRd node, we strongly recommend reviewing this overview page, which outlines all necessary details and requirements.

The HOPR network is open: you don't need to apply for access or wait for a slot. Before you set up your node, make sure you meet the requirements below.

The diagram below illustrates the relationship between key components involved in running and managing a HOPRd node within the HOPR network. Below is a breakdown of each component and its role:

- **HOPRd node**: Relays traffic in the HOPR network and earns tickets for it. It needs a small amount of xDai for on-chain transactions.

- **HOPR Safe and node module**: You create them with `hopli`. Your [HOPR Safe](../token/safestaking.md#why-is-hopr-using-safe) holds the **wxHOPR** that funds your node's payment channels and receives your rewards. You manage it in [Safe\{Wallet\}](./staking-hub.md).

- **REST API and Swagger UI**: Built into your node, to check its status and manage it. See [Interact with your node](./interaction-with-node.md).

- **[HOPR Network Dashboard](https://network.hoprnet.org/dashboard)**: Shows whether your node is online in the network.

- **HOPR Staking Hub**: Used to [wrap HOPR tokens](../token/token-wrapping.md) and to [withdraw wxHOPR from your Safe](./staking-hub.md#withdraw-wxhopr-from-your-safe).

![Running node overview](/img/node/HOPR-Node-Running-Overview.png)

## Requirements for participating in the HOPR network

There is no minimum stake. Your node needs at least `1 wxHOPR` in your Safe, at least `0.01 xDai` on the node, and at least 5 open outgoing channels with at least `100 wxHOPR` each to be eligible for Cover Traffic. See [Do I need a minimum stake to run a node?](./frequently-asked-questions.md#do-i-need-a-minimum-stake-to-run-a-node)

## Node system requirements

The minimum requirements for running **HOPRd** on your device are:

- Operating systems: Linux, or macOS with Docker
- 4 CPU cores
- 4 GB of RAM
- at least 5 GB of disk space
- an uplink that handles 10 Mbit/s in both directions

## Where can you run a HOPRd node?

### Dappnode

The easiest way to run a single HOPRd node is by installing the HOPRd package on Dappnode.
Dappnode is an open-source platform that simplifies running blockchain nodes and decentralized apps (dApps) on your own hardware—no advanced technical skills needed.

Learn more at [https://dappnode.com](https://dappnode.com).

---

### VPS

You can rent an inexpensive Virtual Private Server (VPS) to run one or even multiple HOPRd nodes.
Setting up a node on a VPS requires only basic Unix command-line knowledge.
For a list of recommended VPS providers, see [this section](frequently-asked-questions.md#from-a-costefficiency-perspective-which-option-should-i-choose-running-a-node-on-physical-hardware-or-using-a-vps) of our FAQ.

---

### Personal computer {#personal-computer}

If you're using the Linux or macOS operating system, you can run a HOPRd node directly on your own computer. To earn rewards, your node must stay online 24/7, so Cover Traffic and other nodes can reach it.

---

## What are the installation methods to run HOPRd node?


### Docker

Run HOPRd inside a lightweight container. Easy to set up, highly portable, and ideal for testing or deployment on any machine with Docker installed. Offers simplicity and isolation.

See the [Docker installation guide](./node-docker.md) for detailed instructions.

---

### Docker Compose

Use a docker-compose.yml file to define and orchestrate HOPRd alongside supporting services (e.g., databases, monitoring tools). Great for multi‑container setups or managing multiple nodes in one environment.

Refer to the [Docker Compose setup guide](./node-docker-compose.md) for configuration details.

---

### Dappnode package

Install HOPRd as a package on a Dappnode, a user-friendly platform for running decentralized applications. Simplifies node management with a web interface and supports seamless integration with other Dappnode services.

Follow the [HOPR package installation guide](./node-dappnode.md) for Dappnode.

---

### Binary

Download and run the precompiled HOPRd executable directly from releases. No dependencies beyond the binary itself—ideal for minimal, manual setups without container tooling. Available for Linux only.

Follow the [binary installation guide](./node-binary.md) to get started.

---

## Ready to run your node?

If you meet the requirements above, choose a setup and follow its guide: [Docker](./node-docker.md), [Docker Compose](./node-docker-compose.md), [Dappnode](./node-dappnode.md) or [Binary](./node-binary.md).