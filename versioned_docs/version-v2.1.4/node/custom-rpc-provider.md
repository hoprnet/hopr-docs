---
id: custom-rpc-provider
title: Custom RPC provider
---

RPC, or Remote Procedure Call, serves as a communication protocol enabling external applications like the **hoprd** node to interact with the blockchain network. Ensuring the smooth operation of your node during syncing, to obtain your balances or other processes that require interaction with the blockchain is crucial. To achieve this, we strongly recommend setting up your own Gnosis Chain node.

Here are several methods for obtaining running your own node or alternatively connecting to a third party RPC provider, categorized from the most stable to less stable options:

### a) Run your own Gnosis Chain node (the most secure and reliable method)

**VPS/PC/Mac users**

To set up a Gnosis Chain node, you will need to run the Execution Layer (EL) and Consensus  Layer (CL) client. Before setting up your node, ensure that your hardware meets the necessary requirements:

- [EL Requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#nethermind-client)
- [CL Requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#consensus-clients-requirements)

We recommend the more user-friendly and straightforward node setup with [Sedge](https://docs.sedge.nethermind.io/). Find a list of EL & CL clients supported on Gnosis Chain on Sedge: [supported clients on Sedge](https://docs.sedge.nethermind.io/docs/networks/gnosis#generating-a-full-node)

Let's start with a quick overview of what needs to be done:

(**1**) Install Sedge itself: [Sedge Install Guide](https://docs.sedge.nethermind.io/docs/quickstart/install-guide)

(**2**) Generate a setup for a full node (without a validator node): [Generating a Full Node](https://docs.sedge.nethermind.io/docs/networks/gnosis#generating-a-full-node)

Here's a video tutorial for setting up a Gnosis node without a validator using Sedge:

<iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/JUU0azggJL8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>

After successfully setting up a full node for the Gnosis chain, please wait until it is fully synced. Afterward, you can access the RPC endpoint at http://localhost:8545. If you're using it externally, make sure to expose the port for usage.

**Dappnode users**

:::note
Running a Gnosis EL+CL node will not work reliably on low spec devices such as the HORP Avado machine.
:::

(**1.**) Visit the Stakers section: http://my.dappnode/stakers/gnosis and ensure you have selected the Gnosis chain.

(**2**) For the Execution Layer (EL), choose **Nethermind xDai**. For the Consensus Layer (CL), select **Lighthouse Gnosis** (ensure that "Use checksync" is enabled), click **Apply changes**. 

(**3**) After these two packages have been installed, wait until they sync with the Gnosis network. This process may take up to several days.

(**4**) After the EL & CL are fully synced, use your RPC endpoint URL on your HOPR node: http://nethermind-xdai.dappnode:8545.

A Video tutorial for setting up a Gnosis node without a validator on DAppNode:

<iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/69Yg_XSqxcA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>


### b) Use RPC Providers from 3rd Parties (Server stability depends on company maintenance)

We highly recommend utilizing a third-party RPC provider that operates on the Nethermind execution client. Obtaining a free plan should be sufficient for running your node:

- [Public node](https://gnosis.publicnode.com)
- [Gateway FM](https://gateway.fm) (**Note:** The RPC provider URL should contain an API key)
- [Gnosis chain](https://docs.gnosischain.com/tools/RPC%20Providers/#gnosis)

### c) Use public RPC endpoints from [chainlist.org](https://chainlist.org/?search=gnosis)

This method is the least reliable, as anyone can add RPC endpoints and they are heavily utilized by other users as well, making it difficult to guarantee stability and performance. Exercise caution when using endpoints from this source, they might go offline or rate limit your **hoprd** node.

:::info

Ensure that your RPC provider is utilizing the Nethermind execution client. Here's how to check:

1. Navigate to https://etherflow.quiknode.io and enter your RPC provider endpoint.
2. Choose either the Web3.js or Ethers.js web3 library and select the method **web3_clientVersion**, then click on "Send Request To Node".
3. On the results displayed on the right side, examine the response from the RPC provider to confirm which execution client it is using. Ensure it indicates the Nethermind execution client.
:::