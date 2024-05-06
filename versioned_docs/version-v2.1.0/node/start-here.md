---
id: start-here
title: Start here
---

# Start here

To use the HOPR network, you will need to create a `HOPR Safe` and install a `hoprd` node. There are two methods for installing a `hoprd` node, but before doing so, please read this page to ensure you are familiar with our waitlist policies and any prerequisites for running a node.

## HOPR Safe

:::caution Warning 
It is not possible to run a node without a `HOPR Safe`.
:::

You will need a HOPR Safe to securely store your funds while operating a `hoprd` node. To create a HOPR Safe and run a node please follow the onboarding process [here](https://hub.hoprnet.org/). 

**Note:** You will need a minimum of 30,000 wxHOPR (10,000 wxHOPR if you have a [Network Registry NFT](./waitlist-FAQ.md#what-is-the-network-registry-nft)) to run a node on the HOPR network. You can find options to purchase the necessary tokens [here](../staking/how-to-get-hopr.md).

## Waitlist

The Dufour release is currently permissioned. You will only be able to interact with other nodes once you have been added to the network by the HOPR association. This will likely take 1-2 weeks but may vary depending on your stake and whether or not you have a Network Registry NFT. You can find the additional details for this process [here](./waitlist-FAQ.md).

## Hardware requirements

The minimum requirements for running `hoprd` on your device:

- Dual Core CPU ~ 2 GHz
- 4 GB RAM
- at least 3 GB Disk Space

Although it is recommended that you have at least 8 GB of RAM and 10 GB of disk space.

## For VPS/Windows Users

Using a VPS is recommended if you are on Windows, as all the instructions for installing your node are for Linux/macOS users. A VPS, in general, is an ideal setup as your node is constantly running in the background without needing your machine to be plugged in or turned on. 

If you intend to run your node locally, try and use a setup where your PC or machine can stay plugged in throughout the day. Otherwise, you can use a plug-n-play device such as [Dappnode](https://dappnode.com/collections/frontpage/products/hopr-special-edition), which you can plug in and forget about.

## Avado Support

Avado is no longer supported with the release of Dufour. Any software found on the Avado store is outdated and will not allow you to interact with anyone within the Dufour network. If you have an Avado device, it is strongly recommended you migrate its operating system to DappnodeOS. You can do so using the guide [here](./using-avado.md#transitioning-to-dappnode).

## Port Forwarding

For the Dufour release, every node must have port forwarding set up in order to be visible to other nodes on the network. You can read all about it [here](./using-hopr-admin.md#types-of-nodes).

## Using Dynamic DNS (DDNS)

To run the HOPRd node, you need a static or public IP so other peers can reach you on the network. However, many ISPs only provide dynamic IPs. In this case, you can use Dynamic DNS (DDNS), which continually checks for IP changes and automatically updates the hostname with the latest IP. This means using a hostname instead of an IP address. You can view how to set this up [here](./using-hopr-admin.md#using-dynamic-dns-ddns).

## How To Test Port Forwarding Is Setup For My Node

To verify if you have correctly port forwarded the ports, follow [these steps](./using-hopr-admin.md#how-to-test-port-forwarding-is-setup-for-my-node) to check if the port to your HOPRd node is open from outside your network.

## Installation Demo

You can view a complete walkthrough of the onboarding process in the video below, but please note:

- The video shows a VPS/Docker installation method and not Dappnode.
- The video does not show the node being restarted after the waitlist step. You will need to make sure you do this, as is [recommended in the docs for Docker](./using-docker.md#4-link-your-node-to-your-safe).
- The video does not mention port forwarding, but you will need to set this up in order for your node to be reachable by others on the network. You can read more about this [here](./using-hopr-admin.md#types-of-nodes).
- The `configure node` step has been replaced by `configure module`, so you will have to sign a couple more transactions during that step than what is shown in the video.

<iframe class="youtube-video" width="960" height="500"src="https://www.youtube.com/embed/tcs3VzEW7dM" frameborder="0" allowfullscreen></iframe>

## HOPRd installation methods

We support two distribution mechanisms to install `hoprd`:

- **[Dappnode](using-dappnode)** (A [Dappnode](https://dappnode.io/) plug-and-play device with it's own GUI for faster and easier HOPRd node setup).

- **[Docker](using-docker)** (Using [Docker](https://www.docker.com/), you can run `hoprd` node on your device or a VPS).

You will interact with your node through the same Node Admin UI regardless of your installation method. All details for this can be found in the respective installation sections.

## Next Steps After Completing the Onboarding Process
 
Ensure the following steps to start receiving rewards:
 
- Confirm that you have configured your node with your Public IP address and port 9091, for example: `123.123.123.123:9091`.

  **Note:** If your ISP provides only a dynamic IP address, your node may not work properly and might lack peers to connect to.
  
- Log in to your node's HOPR Admin UI and verify that Eligibility is **true**, and Connectivity status changes from **orange** to **green** within a 30-minute timeframe.
- Once your node's connectivity status changes to green, open at least one payment channel with a random node.
  
  To open a payment channel, go to the "PEERS" page, select a random node, and click on the "OPEN outgoing channel" icon. A popup will appear where you need to enter the amount you want to fund the outgoing channel. Currently, it is efficient to open a payment channel with at least 1 wxHOPR. 

  **Note:** The count of opened payment channels doesn't impact your rewards.

## Understanding RPC importance and Setting Up Your Own Custom RPC Provider

RPC, or Remote Procedure Call, serves as a communication protocol enabling external applications like the `hoprd` node to interact with the blockchain network. Ensuring the smooth operation of your node during syncing, to obtain your balances or other processes that require interaction with the blockchain is crucial. To achieve this, we strongly recommend setting up your own Gnosis Chain node.

Here are several methods for obtaining running your own node or alternatively connecting to a third party RPC provider, categorized from the most stable to less stable options:

### Run your own Gnosis Chain node (the most secure and reliable method)

**VPS/PC/Mac users**

To set up a Gnosis Chain node, you will need to run the Execution Layer (EL) and Consensus  Layer (CL) client. Before setting up your node, ensure that your hardware meets the necessary requirements:

- [EL Requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#nethermind-client)
- [CL Requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#consensus-clients-requirements)

We recommend the more user-friendly and straightforward node setup with [Sedge](https://docs.sedge.nethermind.io/). Find a list of EL & CL clients supported on Gnosis Chain on Sedge: [supported clients on Sedge](https://docs.sedge.nethermind.io/docs/networks/gnosis#generating-a-full-node)

Let's start with a quick overview of what needs to be done:

(**1**) Install Sedge itself: [Sedge Install Guide](https://docs.sedge.nethermind.io/docs/quickstart/install-guide)

(**2**) Generate a setup for a full node (without a validator node): [Generating a Full Node](https://docs.sedge.nethermind.io/docs/networks/gnosis#generating-a-full-node)

Here's a video tutorial for setting up a Gnosis node without a validator using Sedge:

<iframe class="youtube-video" width="960" height="500"src="https://www.youtube.com/embed/JUU0azggJL8" frameborder="0" allowfullscreen></iframe>

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

<iframe class="youtube-video" width="960" height="500"src="https://www.youtube.com/embed/69Yg_XSqxcA" frameborder="0" allowfullscreen></iframe>


### Use RPC Providers from 3rd Parties (Server stability depends on company maintenance)

We highly recommend utilizing a third-party RPC provider that operates on the Nethermind execution client. Obtaining a free plan should be sufficient for running your node:

- [Nodies DLB](https://www.nodies.app/)

### Use public RPC endpoints from [chainlist.org](https://chainlist.org/?search=gnosis)

This method is the least reliable, as anyone can add RPC endpoints and they are heavily utilized by other users as well, making it difficult to guarantee stability and performance. Exercise caution when using endpoints from this source, they might go offline or rate limit your `hoprd` node.

:::info

Ensure that your RPC provider is utilizing the Nethermind execution client. Here's how to check:

1. Navigate to https://etherflow.quiknode.io and enter your RPC provider endpoint.
2. Choose either the Web3.js or Ethers.js web3 library and select the method `web3_clientVersion`, then click on "Send Request To Node".
3. On the results displayed on the right side, examine the response from the RPC provider to confirm which execution client it is using. Ensure it indicates the Nethermind execution client.
:::