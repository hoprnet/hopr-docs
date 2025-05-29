---
id: custom-rpc-provider
title: Custom RPC Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

RPC (Remote Procedure Call) enables communication between external applications like the **HOPRd** node and the blockchain network. For reliable syncing, balance checks, and blockchain interactions, we highly recommend setting up your own Gnosis Chain node.

## RPC Provider Methods

Here are the different methods for running your own node or connecting to a third-party RPC provider, ranked from most stable to least stable:

---

### 1. Run your own gnosis chain node (Most secure and reliable)

#### **For VPS/PC/Mac users**

To set up a Gnosis chain node, you will need to run both the Execution Layer (EL) and Consensus Layer (CL) clients. Ensure that your hardware meets the necessary requirements:

- [EL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#nethermind-client)
- [CL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#consensus-clients-requirements)

We recommend using [Sedge](https://docs.sedge.nethermind.io/) for an easy node setup. Here's how to get started:

(**1**) Install sedge: [Sedge install guide](https://docs.sedge.nethermind.io/docs/quickstart/complete-guide#1-download-and-install-sedge-on-a-new-brand-linux-machine)

(**2**) Install dependencies required for sedge to fully operate:

```md
./sedge deps install
```

(**3**) Generate a full node setup by specifying the custom execution client as "**Nethermind**" and the consensus client as "**Nimbus**" (without MEV-Boost).

- If you only need an RPC endpoint on the Gnosis chain, please select the **No Validator** method.  
- If you want to become a Gnosis validator and have at least **1 GNO** token, please select the **With Validator** installation method.

<Tabs>
<TabItem value="RPC_without_validator" label="No validator">

```md
./sedge generate full-node --execution nethermind --consensus nimbus --no-validator --network=gnosis --no-mev-boost=true
```
</TabItem>
<TabItem value="RPC_with_validator" label="With validator">

```md
./sedge generate full-node --execution nethermind --consensus nimbus --network=gnosis --no-mev-boost=true
```
</TabItem>
</Tabs>

(**4**) Configure log size limitations (**Nethermind client > v1.27.x**):
   
   - Navigate to the "**sedge-data**" folder and open the "**.env**" file.

   - Add this line: `NETHERMIND_JSONRPCCONFIG_MAXLOGSPERRESPONSE=300000` and save the file.

(**5**) Expose the necessary ports to use the RPC endpoint for HOPRd nodes:
   
   - Navigate to the "**sedge-data**" folder and open the "**docker-compose.yml**" file.

   - Under "**execution.ports**" fill in these ports: **8545:8545** and **8551:8551**, and save the file.

(**6**) Start sedge

```md
./sedge run
```

Once the setup is complete and fully synced, you can access your RPC endpoint at **http://localhost:8545**. For external use, ensure the port is exposed.

Watch this video tutorial for step-by-step guidance:

<iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/nQw6n-MGYB0" frameborder="0" allow="rel=0; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>
---

#### **For DAppNode users**

1. Go to the Stakers section: [http://my.dappnode/stakers/gnosis](http://my.dappnode/stakers/gnosis)
2. Select **Nethermind xDai** for the Execution Layer and **Lighthouse Gnosis** for the Consensus Layer. Ensure **Use checksync** is enabled, then click **Apply Changes**.
3. Configure log size limitations (**Nethermind client v1.27.x**):
   - Go to: [http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config](http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config)
   - Add: `--JsonRpc.MaxLogsPerResponse 300000` to the "**ENV VALUE**" field next to "**EXTRA_OPTS**".
   - Click "**Update**" to apply the changes.

After syncing, your RPC endpoint for the HOPR node will be [http://nethermind-xdai.dappnode:8545](http://nethermind-xdai.dappnode:8545).

Watch this video tutorial for step-by-step guidance:

<iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/69Yg_XSqxcA" frameborder="0" allow="rel=0; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>
---

### 2. Use third-party RPC providers (Moderately stable)

We recommend using a third-party RPC provider that runs on the Nethermind execution client. These options are typically free and reliable enough for running your node:

- [Public Node](https://gnosis.publicnode.com)
- [DRPC](https://drpc.org/chainlist/gnosis) (**Note:** Ensure the URL includes an API key)

---

### 3. Use public RPC endpoints from Chainlist (Least reliable)

You can find public RPC endpoints from [Chainlist.org](https://chainlist.org/?search=gnosis), but note that these are often unstable due to heavy usage. We recommend caution when using these endpoints as they might go offline or rate-limit your HOPRd node.
