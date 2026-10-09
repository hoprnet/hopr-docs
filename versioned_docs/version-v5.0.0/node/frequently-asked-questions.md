---
id: frequently-asked-questions
title: Frequently Asked Questions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>
<details>
<summary> 
  
### How to find the external IP address?
</summary>
<Tabs queryString="external_ip">
<TabItem value="linux_macos" label="For Linux or macOS users">

1. **Open the terminal**

2. **Run the command**

   Copy, paste and execute the following command:

   ```bash
   curl ifconfig.me
   ```

3. **Note your public IP address**

   Note your public IP address from the output

</TabItem>
<TabItem value="vps" label="For VPS users">
VPS users should be able to find their IP address from their provider. It will also be your VPS IP, so it should be easy to find.
</TabItem>
<TabItem value="dappnode" label="For Dappnode users">

1. Connect to your Dappnode dashboard.

2. On the top right corner, click on the avatar and write down **public IP**.

    ![Dappnode public ip](/img/node/dappnode-public-ip.png)

</TabItem>
</Tabs>
</details>

<details>
<summary> 
  
### What are the requirements for an IP address to run a HOPRd node?
</summary>

If you are planning to run HOPRd node(s) under **NAT (Network Address Translation)**, such as running node(s) on **Dappnode**, **Avado devices**, or **home/office computers/servers**. Please follow bellow the guide to determine if your IP address meets the requirements to run a HOPRd node.

Your node's IP address is **crucial** for its performance. If it is **misconfigured** or does not meet the **necessary requirements**, your node **will not be reachable** by most peers, including **Cover Traffic nodes**, and you may **not receive rewards**.

---

1. **Check if your external IP is a public IP**

    For HOPRd nodes to communicate with each other on the HOPR network, every node must have a **public IP address**.
    The **only reliable way** to check this is to **contact your Internet Service Provider (ISP)** and ask directly.

2. **Check if your public IP is static or dynamic**

    **Why is this important?**

    - If your **public IP is dynamic**, it **changes over time**, causing your node to become unreachable.
    - If your **IP changes**, you must manually update your node's configuration with the new public IP.
    - A **static IP is recommended** to avoid frequent maintenance issues.

    **How to check if your public IP is static or dynamic:**

    - The **only reliable way** to check this is to **contact your Internet Service Provider (ISP)** and ask directly. If it is **dynamic**, ask if they offer a **static IP option**.

    - **Alternative method (Less Reliable):**  
      - Find your external IP by going to [https://whatismyipaddress.com](https://whatismyipaddress.com) and note the **IPv4 address** displayed.  
      - Turn off your **router/modem** for **5-10 minutes**. Then turn it back on and reconnect.  
      - Return to [https://whatismyipaddress.com](https://whatismyipaddress.com) and check the IPv4 address again.  
        - If the IP address **has changed**, your IP is **dynamic**.  
        - If the IP address **remains the same**, your IP **might** be static (although some ISPs assign "sticky" dynamic IPs that rarely change).  

3. **Actions based on your external IP type**

    Select your external IP type:

    <Tabs queryString="ip_type">
    <TabItem value="non-public" label="Is NOT Public">
    If your **external IP address is not public**, other nodes may not be able to connect to your node, and it may not earn rewards. HOPRd v5.0.0 no longer has the `HOPRD_NAT` setting from earlier versions, so we recommend running your node with a public IP address.

    One option is to **rent a low-cost cloud VPS**. More info [here](frequently-asked-questions.md#from-a-costefficiency-perspective-which-option-should-i-choose-running-a-node-on-physical-hardware-or-using-a-vps).

    </TabItem>
    <TabItem value="public-dynamic" label="Is Public and Dynamic">
    If your **external IP address is public but dynamic**, your IP will change over time, requiring you to **manually update your node's public IP**. We strongly recommend following this guide to avoid frequent maintenance: [How to use dynamic DNS](frequently-asked-questions.md#how-to-use-dynamic-dns).
    </TabItem>
    <TabItem value="publis-static" label="Is Public and Static">
    If your **external IP address is public and static**, you **meet all the requirements** to run a HOPRd node.
    </TabItem>
    </Tabs>
</details>

<details>
  <summary> 
  
  ### How to use dynamic DNS?
  
  </summary>

To run the HOPRd node, you need a static or public IP so other peers can reach you on the network. However, many ISPs only provide dynamic IPs. In this case, you can use Dynamic DNS (DDNS), which continually checks for IP changes and automatically updates the hostname with the latest IP. This allows you to use a hostname instead of an IP address. Here's how to set it up:

<Tabs queryString="Dynamic_DNS">
  <TabItem value="router" label="Via Router">
  Most router brands support dynamic DNS. You can use the router brand's credentials or third-party services like [No-IP](https://www.noip.com).

  Brands supporting Dynamic DNS:

  - [TP-Link](https://www.tp-link.com/us/support/faq/1367/)
  - [ASUS](https://www.asus.com/support/faq/1011725/)
  - [NETGEAR](https://kb.netgear.com/23930/How-do-I-set-up-Dynamic-DNS-DDNS-on-my-NETGEAR-router)
  - [Linksys](https://www.linksys.com/gb/support-article/?articleNum=140708)

  After setting up DDNS, you'll have a hostname (e.g., **hostname.hopto.org**) to use with a port on the HOPR package instead of an IP address.

  **Example:** `hostname.hopto.org:9091`
  </TabItem>
  <TabItem value="client" label="Via Client Installation">
  Use a Dynamic DNS service provider client to monitor IP changes and update your domain. We recommend [No-IP](http://www.noip.com). Install their client on your machine to monitor external IP changes and update the hostname.

  1. Download and install the client based on your OS: [No-IP Download](https://noip.com/download)

  2. After setting up DDNS, create a hostname (e.g., **hostname.hopto.org**) to use with a port on the HOPR package.

      **Example:** `hostname.hopto.org:9091`
  </TabItem>
  <TabItem value="dappnode" label="For Dappnode">
  If you're running the HOPRd node on Dappnode, it supports DynDNS. Here's what to do:

  1. **Connect to the Dappnode dashboard**

  2. **Find your DynDNS URL**

     Click the colorful icon in the top right corner and find "DAppNode Identity". Look for a DynDNS URL like **hiuhu234hiu.dyndns.dappnode.io**.

  3. **Update the HOPR package configuration**

     Go to HOPR package configuration (http://my.dappnode/packages/my/hopr.public.dappnode.eth/config). Under **Public host IP and port**, replace the IP address with the DynDNS URL including the port number.

     **Example:** `hiuhu234hiu.dyndns.dappnode.io:9091`
  </TabItem>
</Tabs>
</details>

<details>
<summary> 
  
### How do I create a secure password for the secret token and database password?
</summary>
There are no specific requirements for creating a database password or secret token, but both should be treated like passwords. We recommend using the [Bitwarden Password Generator](https://bitwarden.com/password-generator/) to create a strong token.

:::note
To evaluate the strength of your password, you can use the [Bitwarden Password Strength Testing Tool](https://bitwarden.com/password-strength/#Password-Strength-Testing-Tool).
:::
</details>

---

## Rewards related FAQ

<details>
<summary> 
  
### Do I need a minimum stake to run a node?
</summary>
No. On the Piz Palu network, your stake doesn't affect your rewards. Your node needs:

- **A Safe and node module**, created with `hopli` as described in the setup guide for your platform, for example [Docker](./node-docker.md#create-your-node-identity-safe-and-node-module).
- **At least `1 wxHOPR` in your Safe**, which pays the fee for announcing your node on the network.
- **At least `0.01 xDai` on your node address.**
- **At least 5 open outgoing payment channels with at least `100 wxHOPR` each** to be eligible for Cover Traffic. Your node funds them from your Safe, so keep at least `750 wxHOPR` in your Safe, plus extra for top-ups. You also need to change your channel funding values, as described in [Fund your channels for Cover Traffic](./manage-node-strategies.md#fund-your-channels-for-cover-traffic).

You can find where to get wxHOPR and xDai [here](../token/acquiring-hopr-tokens.md).
</details>

<details>
<summary>

### What is Cover Traffic, and what is its purpose?
</summary>
Cover Traffic is traffic that HOPR sends through the network to pay node runners and to keep the network busy, which protects the privacy of real users. Cover Traffic nodes send short bursts of traffic through every eligible node, and each node earns tickets for the packets it relays, the same as for real traffic, for example from Gnosis VPN.

For background, see [Cover Traffic on HOPR Piz Palü](https://medium.com/hoprnet/cover-traffic-on-hopr-piz-pal%C3%BC-8023ea67bdbd).
</details>

<details>
<summary>

### How many Cover Traffic nodes are there?
</summary>
There are five Cover Traffic nodes on Piz Palu:

```text
0x51624c828c175cc81d6a7dd22a9a30d68c6a1ae0
0xa64109ed980c902ac554662b9d569a6a3f71e7a7
0x02d7d9ca7788e674676f809ac984cbf59e4b6099
0x50eac8e328847e5389aabb267398386db7225644
0x991a376c646274d74adb3b25ccc292a775f352f1
```
</details>

<details>
<summary> 
  
### When is my node eligible for Cover Traffic, and where are the rewards sent?
</summary>
Your node is eligible when:

1. A Cover Traffic node can reach it. Check this with [How to check if my node is working correctly?](./troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful)
2. It has at least 5 open outgoing payment channels with at least `100 wxHOPR` each. Your stake, Safe balance and location don't count.

Your node earns a ticket for every packet it relays. When a ticket wins, your node redeems it automatically and the reward goes to your Safe. If your node has an open outgoing payment channel to one of the Cover Traffic nodes, the reward goes to that channel's balance instead, and moves to your Safe when you close the channel. To check that your node relays traffic and earns tickets, see [How can I verify if Cover Traffic is being relayed through my node(s)?](./troubleshooting.md#how-can-i-verify-if-cover-traffic-is-being-relayed-through-my-nodes-and-if-im-receiving-rewards)
</details>

<details>
<summary>

### How often does Cover Traffic reach my node?
</summary>
Each eligible node gets a burst of about 10 seconds roughly every 20 minutes, averaged across the five Cover Traffic nodes. If your node can't be reached when its turn comes, it's skipped for that round.
</details>

<details>
<summary>

### How much can I earn?
</summary>
There is no APR and no fixed reward. Your node earns tickets for the packets it actually relays, from both Cover Traffic and real users. Whether a ticket wins depends on the ticket winning probability, and its value depends on the ticket price; both are still being tuned. A reachable node with good hardware, a fast connection and funded channels relays more traffic and earns more.
</details>

<details>
<summary>

### Is there a lock-up period for my wxHOPR?
</summary>
No. You can withdraw wxHOPR from your Safe at any time, as described in [Withdraw wxHOPR from your Safe](./staking-hub.md#withdraw-wxhopr-from-your-safe). wxHOPR in your payment channels returns to your Safe when the channels close. If your channels drop below 5 open channels with `100 wxHOPR` each, your node stops being eligible for Cover Traffic.
</details>

<details>
<summary>

### Can I earn rewards without operating a node?
</summary>
No. Rewards come only from relaying traffic, so you need a running node with funded payment channels.
</details>

<details>
<summary>

### From a cost/efficiency perspective, which option should I choose: running a node on physical hardware or using a VPS?
</summary>
Both work. What matters most is that your node can handle Cover Traffic bursts: a node that can't keep up drops packets and loses the tickets for them.

The minimum for a relay node is **4 CPU cores, 4 GB of RAM and 5 GB of disk**, with an uplink that handles **10 Mbit/s in both directions**. Give your node some headroom above this.

#### Physical hardware

**Pros:** cost-effective over time, with no monthly fees, and usually faster CPU cores than a VPS.

**Cons:** you have to monitor it for internet and power outages yourself.

#### VPS

**Pros:** high uptime; most providers offer 99.9% uptime and handle power and network issues for you.

**Cons:** monthly costs, and VPS cores are usually slower than your own hardware, so choose a plan with headroom.

#### Recommended low-cost cloud VPS providers

- [Contabo](https://contabo.com/en/vps/)
- [Hetzner](https://www.hetzner.com/cloud/)
- [Vultr](https://www.vultr.com/promo/try250) (Vultr offers a $250 coupon to try their services)
</details>

<details>
<summary>

### Can I run multiple nodes?
</summary>
Yes. Each node needs its own identity, folder and ports, and must be added to your Safe. Each node also needs its own 5 funded outgoing channels to be eligible for Cover Traffic. See [Running multiple nodes](./multiple-nodes.md).
</details>

</NoCounter>