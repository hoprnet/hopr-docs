---
id: custom-rpc-provider
title: Custom RPC provider
---

## Overview

RPC (Remote Procedure Call) enables communication between external applications like the **HOPRd** node and the blockchain network. For reliable syncing, balance checks, and blockchain interactions, we highly recommend setting up your own Gnosis Chain node.

## RPC Provider Methods

Here are the different methods for running your own node or connecting to a third-party RPC provider, ranked from most stable to least stable:

---

### 1. Run your own gnosis chain node (Most secure & reliable)

#### **For VPS/PC/Mac users**

To set up a Gnosis chain node, you will need to run both the Execution Layer (EL) and Consensus Layer (CL) clients. Make sure your hardware meets the necessary requirements:

- [EL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#nethermind-client)
- [CL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#consensus-clients-requirements)

We recommend using [Sedge](https://docs.sedge.nethermind.io/) for an easy node setup. Here's how to get started:

(**1**) Install sedge: [Sedge install guide](https://docs.sedge.nethermind.io/docs/quickstart/install-guide)

(**2**) Generate a full node setup (without a validator): [Generating a full node](https://docs.sedge.nethermind.io/docs/networks/gnosis#generating-a-full-node)

(**3**) Fix log limitations (**Nethermind client v1.27.x**):
   - Navigate to the "**sedge-data**" folder and open the "**.env**" file.
   - Add this line: `NETHERMIND_JSONRPCCONFIG_MAXLOGSPERRESPONSE=300000`
   - Save the file and restart the client.

Once the setup is complete and fully synced, you can access your RPC endpoint at **http://localhost:8545**. For external use, ensure the port is exposed.

**Video Tutorial**: Watch this [gnosis node setup tutorial](https://www.youtube.com/embed/JUU0azggJL8) for step-by-step guidance.

---

#### **For DAppNode users**

1. Go to the Stakers section: [http://my.dappnode/stakers/gnosis](http://my.dappnode/stakers/gnosis)
2. Select **Nethermind xDai** for the Execution Layer and **Lighthouse Gnosis** for the Consensus Layer. Ensure **Use checksync** is enabled, then click **Apply Changes**.
3. Fix log size limitations (**Nethermind client v1.27.x**):
   - Go to: [http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config](http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config)
   - Add: `--JsonRpc.MaxLogsPerResponse 300000` to the "**ENV VALUE**" field next to "**EXTRA_OPTS**".
   - Click "**Update**" to apply the changes.

After syncing, your RPC endpoint for the HOPR node will be [http://nethermind-xdai.dappnode:8545](http://nethermind-xdai.dappnode:8545).

**Video Tutorial**: Follow this [Gnosis node setup tutorial for DAppNode](https://www.youtube.com/embed/69Yg_XSqxcA) for visual instructions.

---

### 2. Use Third-Party RPC providers (Moderately stable)

We recommend using a third-party RPC provider that runs on the Nethermind execution client. These options are typically free and reliable enough for running your node:

- [Public Node](https://gnosis.publicnode.com)
- [Gateway FM](https://gateway.fm) (**Note**: Ensure the URL includes an API key)
- [Gnosis Chain RPC Providers](https://docs.gnosischain.com/tools/RPC%20Providers/#gnosis)

---

### 3. Use public RPC endpoints from Chainlist (Least reliable)

You can find public RPC endpoints from [Chainlist.org](https://chainlist.org/?search=gnosis), but note that these are often unstable due to heavy usage. We recommend caution when using these endpoints as they might go offline or rate-limit your HOPRd node.

---

## RPC provider troubleshooting

<details>
<summary> 

### How to check public RPC provider's execution client?
</summary>
To ensure your RPC provider uses the Nethermind execution client:

(**1**) Visit [Etherflow](https://etherflow.quiknode.io) and enter your RPC endpoint.

(**2**) Select **web3_clientVersion** and send the request.

(**3**) Verify that the response indicates the use of the Nethermind execution client.
</details>