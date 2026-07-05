---
id: run-a-node-overview
title: Overview
group: h-no-count
---

HOPRd nodes play a crucial role in our decentralized network, operated by members of the HOPR community. Before setting up your own HOPRd node, we strongly recommend reviewing this overview page, which outlines all necessary details and requirements.

Please note that the HOPR network is currently permissioned, requiring you to complete an onboarding process to gain access and participate with your node. As part of this process, you'll need to submit a waitlist form. Access is granted on a **tri-weekly** basis. Make sure to review the requirements below before proceeding with the onboarding process.

The diagram below illustrates the relationship between key components involved in running and managing a HOPRd node within the HOPR network. Below is a breakdown of each component and its role:

- **HOPRd Node**: The HOPRd node is connected to the HOPR Staking Hub, allowing node operators to monitor their node’s performance, fund it with native tokens for on-chain activities, manage spending limits for opening payment channels, etc.

- **HOPR Staking Hub**: The [HOPR Staking Hub](./staking-hub.md) is a platform designed for onboarding nodes onto the HOPR network. Through the Staking Hub, node operators using [HOPR Safe](../token/safestaking.md#why-is-hopr-using-safe) can securely stake **wxHOPR** tokens, add multiple wallet owners for enhanced security, wrap HOPR tokens, monitor node performance, and earn rewards.

- **HOPR Admin UI**: The [HOPR Admin UI](./node-management-admin-ui.md) is a user-friendly interface that enables operators to manage HOPRd nodes. Through the Admin UI, users can configure the node settings, monitor performance, and perform maintenance tasks, making node operation accessible even to non-technical users. The Admin UI serves as the control center for managing node-related activities.

![Running node overview](/img/node/HOPR-Node-Running-Overview.png)

## Requirements for participating in the HOPR network

To operate your node in the HOPR network, you must stake HOPR tokens. The minimum stake required is **30,000 wxHOPR**. However, if you participated in the testnets and possess a **Network Registry NFT**, your minimum stake requirement is reduced to **10,000 wxHOPR**. 

## Node system requirements

The minimum requirements for running **HOPRd** on your device are:

- Operating systems: Linux & macOS
- Dual-Core CPU or 2vCPU
- 2GB of RAM
- at least 5GB of disk space

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

### Personal Computer

If you're using the Linux or macOS operating system, you can run a HOPRd node directly on your own computer. To earn continuously distributed rewards, your HOPRd node must remain online 24/7.

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

Download and run the precompiled HOPRd executable directly from releases. No dependencies beyond the binary itself—ideal for minimal, manual setups without container tooling.

Follow the [binary installation guide](./node-binary.md) to get started.

---

### HOPRd package for specific Operating system

Install via native package managers tailored to your operating system. Enables seamless integration with system services and simplifies updates.

- For Linux systems, see the [Linux package guide](./node-linux-packages.md).
- For macOS, refer to the [macOS package guide](./node-macos.md).

---

## Ready to run your node?

If you have carefully read the requirements above and you meet them, please proceed with the onboarding process here: [https://hub.hoprnet.org](https://hub.hoprnet.org)