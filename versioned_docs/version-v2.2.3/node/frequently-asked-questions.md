---
id: frequently-asked-questions
title: Frequently Asked Questions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<details>
<summary> 
  
### What are the requirements for an IP address to run a HOPRd node?
</summary>

#### How to find your external IP address

<Tabs>
<TabItem value="external_ip_linux_mac" label="For Linux or macOS users">
(**1**) Open the terminal

(**2**) Copy, paste and execute the following command: 

```bash
curl ifconfig.me
```

(**3**) Note your public IP address from the output
</TabItem>
<TabItem value="external_ip_vps" label="For VPS users">
VPS users should be able to find their IP address from their provider. It will also be your VPS IP, so it should be easy to find.
</TabItem>
</Tabs>

---

#### Determining if your external IP meets the requirements for an IP address to run a HOPRd node

If you are planning to run HOPRd nodes under **NAT (Network Address Translation)**, such as running nodes on **Dappnode**, **Avado devices**, or **home/office computers/servers**. Please follow bellow the guide to determine if your IP address meets the requirements to run a HOPRd node.

Your node's IP address is **crucial** for its performance. If it is **misconfigured** or does not meet the **necessary requirements**, your node **will not be reachable** by most peers, including **Cover Traffic nodes**, and you may **not receive rewards**.

#### Step 1: Check if your external IP is a public IP

For HOPRd nodes to communicate with each other on the HOPR network, every node must have a **public IP address**.

The **only reliable way** to check this is to **contact your Internet Service Provider (ISP)** and ask directly.

:::warning Important
If your ISP does not provide a **public IP**, you do not need to proceed with the following steps. Instead, you must find a way to obtain a public IP for your HOPRd node. One option is to **rent a low-cost cloud VPS** and run your HOPRd node there. More details are available [here](frequently-asked-questions.md#from-a-costefficiency-perspective-which-option-should-i-choose-running-a-node-on-physical-hardware-or-using-a-vps).
:::

---

#### Step 2: Check if your public IP is static or dynamic

##### Why is this important?

- If your **public IP is dynamic**, it **changes over time**, causing your node to become unreachable.
- If your **IP changes**, you must manually update your node's configuration with the new public IP.
- A **static IP is recommended** to avoid frequent maintenance issues.

##### How to check if your public IP is static or dynamic:

- The **only reliable way** to check this is to **contact your Internet Service Provider (ISP)** and ask directly. If it is **dynamic**, ask if they offer a **static IP option**.

- **Alternative method (Less Reliable):**  
  - Find your external IP by going to [https://whatismyipaddress.com](https://whatismyipaddress.com) and note the **IPv4 address** displayed.  
  - Turn off your **router/modem** for **5-10 minutes**. Then turn it back on and reconnect.  
  - Return to [https://whatismyipaddress.com](https://whatismyipaddress.com) and check the IPv4 address again.  
     - If the IP address **has changed**, your IP is **dynamic**.  
     - If the IP address **remains the same**, your IP **might** be static (although some ISPs assign "sticky" dynamic IPs that rarely change).  

---

#### Summary

- If your **external IP address is not public**, you need to find a way to obtain a **public IP**, as your HOPRd node **will not function properly** and **will not receive rewards**.
- If your **external IP address is public but dynamic**, your IP will change over time, requiring you to **manually update your node's public IP**. We strongly recommend following this guide to avoid frequent maintenance: [How to use dynamic DNS](frequently-asked-questions.md#how-to-use-dynamic-dns).
- If your **external IP address is public and static**, you **meet all the requirements** to run a HOPRd node.
</details>

<details>
  <summary> 
  
  ### How to use dynamic DNS?
  
  </summary>

To run the HOPRd node, you need a static or public IP so other peers can reach you on the network. However, many ISPs only provide dynamic IPs. In this case, you can use Dynamic DNS (DDNS), which continually checks for IP changes and automatically updates the hostname with the latest IP. This allows you to use a hostname instead of an IP address. Here's how to set it up:"

#### Via Your Router

Most router brands support dynamic DNS. You can use the router brand's credentials or third-party services like [No-IP](https://www.noip.com).

Brands supporting Dynamic DNS:

* [TP-Link](https://www.tp-link.com/us/support/faq/1367/)
* [ASUS](https://www.asus.com/support/faq/1011725/)
* [NETGEAR](https://kb.netgear.com/23930/How-do-I-set-up-Dynamic-DNS-DDNS-on-my-NETGEAR-router)
* [Linksys](https://www.linksys.com/gb/support-article/?articleNum=140708)

After setting up DDNS, you'll have a hostname (e.g., **hostname.hopto.org**) to use with a port on the HOPR package instead of an IP address.

Example: `hostname.hopto.org:9091`

#### Via Client Installation

Use a Dynamic DNS service provider client to monitor IP changes and update your domain. We recommend [No-IP](http://www.noip.com). Install their client on your machine to monitor external IP changes and update the hostname.

(**1**) Download and install the client based on your OS: [No-IP Download](https://noip.com/download)

(**2**) After setting up DDNS, create a hostname (e.g., **hostname.hopto.org**) to use with a port on the HOPR package.

Example: `hostname.hopto.org:9091`

#### For Dappnode

If you're running the HOPRd node on Dappnode, it supports DynDNS. Here's what to do:

(**1**) Connect to the Dappnode dashboard.

(**2**) Click the colorful icon in the top right corner and find "DAppNode Identity". Look for a DynDNS URL like **hiuhu234hiu.dyndns.dappnode.io**.

(**3**) Go to HOPR package configuration (http://my.dappnode/packages/my/hopr.public.dappnode.eth/config). Under "**Public host IP and port**", replace the IP address with the DynDNS URL including the port number.

Example: `hiuhu234hiu.dyndns.dappnode.io:9091`
</details>

<details>
<summary> 
  
### How do I create a secure password for the secret token and database password?
</summary>
There are no specific requirements for creating a database password or secret token, but both should be treated like passwords. We recommend using the [Bitwarden Password Generator](https://bitwarden.com/password-generator/) to create a strong token.

**Note:** To evaluate the strength of your password, you can use the [Bitwarden Password Strength Testing Tool](https://bitwarden.com/password-strength/#Password-Strength-Testing-Tool).
</details>

## Staking related FAQ

<details>
<summary> 
  
### What is the minimum stake required to participate in the Dufour release?  
</summary>
- **Without a Network Registry NFT:** You will need a minimum of 30,000 wxHOPR and at least one xDAI.
- **With a Network Registry NFT:** You will need a minimum of 10,000 wxHOPR and at least one xDAI.

You can find where to purchase the relevant tokens [here](../token/acquiring-hopr-tokens.md).
</details>

<details>
<summary> 
  
### What is the Network Registry NFT, and how will boost NFTs from previous releases be utilized in the future?
</summary>
Node runners from the previous Monte Rosa release were issued a special **Network Registry NFT**, which remains active for the Dufour release. This allows early access to the network with a reduced stake requirement of **10,000 wxHOPR**.

**Important**: All other boost NFTs from previous releases have been discontinued.
</details>

<details>
<summary>

### What is Cover Traffic, and what is its purpose?
</summary>

Cover Traffic ("CT") is the new way to earn rewards. The Cover Traffic app has four components, which operate in the following sequence:

- The Netwatcher’s task is to locate nodes on the network and create a list.
- The Aggregator collects all node information from the Netwatcher and sends it to the database.
- The EconomicHandler applies the economic model and pushes the data to the queue.
- The Postman takes the queue and distributes a series of 1-hop messages to every node.
</details>

<details>
<summary>

### How many Cover Traffic nodes there are in total?
</summary>
There are a total of 10 Cover Traffic (CT) nodes, but only 5 nodes operate at any given time. The remaining 5 nodes are designated for updates to major releases, ensuring the relaying process remains uninterrupted. The currently active 5 nodes are:

```md
0xd30f8f6e5865d7ec947e101b1d6a183e9776ba40  
0x5a5bf3d3ce59cd304f198b86c1a78adfadf31f83  
0xa4642c066c1f8927db9d34abab599af784a2cff0  
0xcbe8726c80cc0d7751b9545dd5a4b5b0e53e383d  
0x764d3162a4024c5cba8817446ef563b27aa57598  
```

**Note:** Even if you have incoming payment channels from all 10 Cover Traffic nodes, only monitor the channels associated with the nodes currently relaying data. The list of active CT nodes can be found above.
</details>

<details>
<summary> 
  
### When are my node(s) eligible to receive rewards, and where are the rewards sent?
</summary>

#### To be eligible for rewards, your node must meet the following criteria:

(**1**) The node must be operational and reachable by the network nodes. Verify your node's performance by following the steps in the [troubleshooting guide](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

(**2**) You must open at least one payment channel with any random peer on the network. Refer to the example [here](./interaction-with-node.md#3-open-a-payment-channel-with-a-peer-named-betty) for guidance on how to set up a payment channel.

#### Rewards are being sent to your Safe address in this order:

(**1**) Cover traffic, determined by your staking amount, is relayed through your node.

(**2**) For every relayed message, your node receives unredeemed tickets.

(**3**) When the unredeemed tickets in a payment channel reach the aggregation threshold, they are combined into a single ticket representing the total value of the aggregated tickets. The default aggregation threshold value can be found in the example configuration file under the "**aggregation_threshold**" setting [here](./manage-node-strategies.md).

(**4**) Once tickets are aggregated, your node redeems them and transfers the rewards to your Safe address.

</details>

<details>
<summary>

### How often is Cover Traffic distributing the rewards?
</summary>
Cover Traffic rewards are distributed continuously across the network. The system calculates the distribution delay for each node based on the amount staked.
</details>

<details>
<summary>

### Does Cover Traffic have threshold rewards caps, and if so, why?
</summary>
Cover Traffic has a minimum staking threshold of **10,000 wxHOPR** (with a **Network Registry NFT**). This means that if your total stake meets or exceeds **10,000 wxHOPR** and you possess a **Network Registry NFT**, you will start receiving rewards, assuming your node remains active and performs as expected.

There is also a maximum threshold of **75,000 wxHOPR** per node. Staking up to this amount will allow you to receive the maximum possible rewards. However, if you stake more than **75,000 wxHOPR**, the rewards for any amount beyond this threshold will be significantly reduced.

Based on the Cover Traffic economic model rewards threshold, we have prepared some recommendations:

- When a participant has **\<= 75.000 wxHOPR** tokens: you don't need to run several nodes because rewards are based on your stake alone. For example, if you decide to have 2 nodes with stakes of 40.000 & 35.000 wxHOPR token, you will get the same rewards as you would from running 1 node with a **75.000 wxHOPR** stake.

- When a participant has **>75.000 wxHOPR** tokens: the optimal reward strategy is to split your stake across multiple nodes with **\<= 75.000 wxHOPR** in each. Additional HOPR staked in nodes above **75.000 wxHOPR** will earn rewards, but at a significantly reduced rate.

The Cover Traffic threshold was intentionally set to make the network more decentralized and to distribute rewards more fairly. This ensures that even node runners with a small stake have the opportunity to receive rewards. Currently, we are projecting a stable **APY of 10-15%**!

:::info important

The Cover Traffic threshold rewards cap limitations mentioned above do not apply to rewards received from Cover Traffic. If you stake up to **75,000 wxHOPR** per node and the rewards you receive increase your stake, you will still **receive the full APR**!

:::
</details>

<details>
<summary>

### What is my expected APR?
</summary>
The expected average additional APR for a node runner is between **10-15%**. In the future, you'll also have the opportunity to earn rewards for relaying data from services that utilize HOPR, such as [RPCh](https://degen.rpch.net).

This is the anticipated additional APR for the average node runner. For a detailed breakdown of the economic model, you can check it out [here](https://twitter.com/hoprnet/status/1696539901305790534).
</details>

<details>
<summary>

### What is the lock-up period for my stake?
</summary>
There is no lock-up period, meaning you can withdraw your funds at any time. However, the less you stake, the fewer rewards you’ll earn. You won’t receive any rewards if your stake drops below **10,000 wxHOPR** (with a **Network Registry NFT**) or **30,000 wxHOPR** (without a **Network Registry NFT**).
</details>

<details>
<summary>

### Can I stake and earn rewards without operating a node?
</summary>
It is not possible to stake and earn rewards without running a node. As of the end of **Staking Season 08 (2023-09-09)**, all staking must be linked to an active node and managed through a HOPR Safe. This ensures the network remains decentralized and operational, as staking is tied directly to the functioning of your node. Without an active node, your stake will not qualify for rewards, emphasizing the importance of actively participating in the network’s operations.
</details>

<details>
<summary>

### From a cost/efficiency perspective, which option should I choose: running a node on physical hardware or using a VPS?
</summary>
There are both pros and cons to using physical hardware versus a VPS, depending on your needs and priorities.

#### Pros and cons of using physical hardware

**Pros:**

- **Increased stability and decentralization**: Running a local Gnosis node allows you to operate your own RPC endpoint, improving node stability and contributing to decentralization, which can positively impact node performance.
- **Cost-effective in the long term**: From an economic perspective, owning hardware can be more cost-effective over time, as there are no ongoing subscription costs like with VPS providers.

**Cons:**

- **Monitoring and maintenance**: You will need to constantly monitor your setup for internet or power outages, which can disrupt performance and require manual intervention.

---

#### Pros and cons of using VPS

**Pros:**

- **High uptime**: Most VPS providers offer 99.9% uptime, meaning you don’t have to worry about power or internet disruptions, as these are managed by the provider.
  
**Cons:**

- **Higher costs for running local nodes**: Running a local Gnosis node on a VPS can be expensive due to the required hardware resources and storage. Relying on third-party RPC providers may negatively impact node performance, as external endpoints can introduce latency, limitations, and instability.

#### Conclusion

While physical hardware offers more advantages over VPS, such as better decentralization and cost efficiency, we recommend trying a low-cost cloud VPS provider to assess your expenses versus rewards. Economically, it’s important that your staking amount covers your expenses and generates positive returns.

#### Our Recommended low-cost cloud VPS providers

- [Contabo](https://contabo.com/en/vps/)
- [Hetzner](https://www.hetzner.com/cloud/)
- [Vultr](https://www.vultr.com/promo/try250) (Vultr offers a $250 coupon to try their services)

Please choose cloud VPS plans based on our [hardware requirements](./run-a-node-overview.md#node-system-requirements).
</details>

<details>
<summary>

### If I hold a Network Registry NFT but don’t meet the minimum threshold of 10,000 wxHOPR tokens, can I still run a node later on?
</summary>
If you hold a Network Registry NFT, you can join the network at any time in the future, as long as you meet the minimum threshold of 10,000 wxHOPR.
</details>

<details>
<summary>

### Can I obtain a Network Registry (NR) NFT from the NFT marketplace and then use it to run a node?
</summary>
Yes, absolutely. You can purchase a Network Registry NFT and stake 10,000 wxHOPR tokens to participate in the HOPR network.

Currently, you can try to get Network Registry NFT on [nifftyfair](https://niftyfair.io/gnosis/collection/0x43d13d7b83607f14335cf2cb75e87da369d056c7)
</details>

<details>
<summary>

### Can I run multiple nodes?
</summary>
Yes, you can run multiple nodes, but ensure that each node meets the minimum staking threshold, which depends on whether or not you hold a Network Registry NFT. For further details, please refer to this FAQ question [here](./frequently-asked-questions.md#what-is-the-minimum-stake-required-to-participate-in-the-dufour-release).
</details>

## Waitlist related FAQ

<details>
<summary> 
  
### What is the waitlist, and how can I join it?
</summary>

To facilitate a controlled and smooth scaling of the HOPR network during the initial Dufour release, we have implemented a waitlist system.

To join the waitlist:

(**1**) Visit the [HOPR Staking Hub](https://hub.hoprnet.org/), start the onboarding process, and create a HOPR Safe.

(**2**) During the onboarding process, you will be guided on how to start your HOPR Node.

(**3**) You will then need to register both your newly created Safe address and your active HOPRd node address on the [waitlist form](https://cryptpad.fr/form/#/2/form/view/7TwSgsF+CnW-aw24uyPlE4Gej3DX-jjeYmyk9-Q-6RQ).

This allows your participation in the scaling process and ensures you're queued for network access as new slots become available.
</details>

<details>
<summary> 
  
### How is the waitlist created, and how are new slots allocated?
</summary>
The waitlist is prioritized as follows:

1. **Priority Applicants**: Applicants who own Network Registry NFTs are given priority, with their position on the waitlist determined by the time of registration.
2. **Other Applicants**: Those without Network Registry NFTs are ranked by the size of their wxHOPR stake.

Applications are manually collected every three weeks on **Friday at 8 AM CET**, after which the waitlist is updated and **new slots** are allocated later that same day. If you submit your application **after 8 AM CET**, it will be processed during the next three-week cycle.

Announcements about new slots are shared on our Telegram and Discord channels.

To check your position on the waitlist, visit the [waitlist sheet](https://cryptpad.fr/sheet/#/2/sheet/view/NYbRDH+C993dfHwEL1RyyKNtxG5pRoOaxtI4hbRVUBw/).
</details>

<details>
<summary> 
  
### I’ve registered on the waitlist, but I can’t find my address. What should I do?
</summary>
The waitlist is updated manually. If you have submitted the [waitlist form](https://cryptpad.fr/form/#/2/form/view/7TwSgsF+CnW-aw24uyPlE4Gej3DX-jjeYmyk9-Q-6RQ) with accurate details, your address should appear soon.

**Important**: Addresses that have removed their staked wxHOPR will be periodically removed from the waitlist. Ensure your stake hasn't dropped below the minimum requirement, especially if you have recently withdrawn funds from your HOPR Safe.
</details>

<details>
<summary> 

### Why has my position on the waitlist changed? 
</summary>
Your position may fluctuate if you don't own a Network Registry NFT. New applicants with a higher wxHOPR stake might have joined, or other users may have been off-boarded or moved down the list due to withdrawing funds or not meeting the required minimum stake.
</details>