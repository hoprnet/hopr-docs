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
    If your **external IP address is not public**, other nodes may not be able to connect to your node, and it may not earn rewards. HOPRd v5.0.4 no longer has the `HOPRD_NAT` setting from earlier versions, so we recommend running your node with a public IP address.

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
- **Enough funded outgoing payment channels** to be eligible for Cover Traffic. The number of channels and the wxHOPR each one must hold are set in the latest announcement on [HOPR's Telegram](https://t.me/hoprnet). Your node funds these channels from your Safe, so keep enough wxHOPR in your Safe for them, plus extra for top-ups. To set your channel funding values, see [How do I keep 2 outgoing channels with at least 25 wxHOPR each?](#how-do-i-keep-2-outgoing-channels-with-at-least-25-wxhopr-each).

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

1. A Cover Traffic node can reach it. Check this with [How to check if my node is working correctly?](./troubleshooting.md#how-to-check-if-my-node-is-working-correctly)
2. It has at least the number of open outgoing payment channels, each with at least the amount of wxHOPR, set in the latest announcement on [HOPR's Telegram](https://t.me/hoprnet). Your stake, Safe balance and location don't count. For an example of setting up your channels, see [How do I keep 2 outgoing channels with at least 25 wxHOPR each?](#how-do-i-keep-2-outgoing-channels-with-at-least-25-wxhopr-each)

Your node earns a ticket for every packet it relays. When a ticket wins, your node redeems it automatically and the reward goes to your Safe. If your node has an open outgoing payment channel to one of the Cover Traffic nodes, the reward goes to that channel's balance instead, and moves to your Safe when you close the channel. To check that your node relays traffic and earns tickets, see [How can I verify if Cover Traffic is being relayed through my node(s)?](./troubleshooting.md#how-can-i-verify-if-cover-traffic-is-being-relayed-through-my-nodes-and-if-im-receiving-rewards)
</details>

<details>
<summary>

### How do I keep 2 outgoing channels with at least 25 wxHOPR each? {#how-do-i-keep-2-outgoing-channels-with-at-least-25-wxhopr-each}
</summary>

To be [eligible for Cover Traffic](./troubleshooting.md#how-can-i-verify-if-cover-traffic-is-being-relayed-through-my-nodes-and-if-im-receiving-rewards), your node must keep a minimum number of outgoing payment channels open, each holding at least a minimum amount of wxHOPR. HOPR sets both numbers in its announcements and can change them, so always take them from the latest announcement on [HOPR's Telegram](https://t.me/hoprnet).

The hosted configuration files get your node onto the network, but they aren't sized for any eligibility requirement. The `ChannelLifecycle` strategy opens and funds your channels: understand its settings below, then set values that meet the current requirement yourself.

#### Settings that open and fund channels {#settings-that-open-and-fund-channels}

| Setting | Default value | What it does |
| --- | --- | --- |
| `population.min_open_channels` | `5` | The lowest number of open outgoing channels your node keeps. It won't close a channel if that would leave fewer than this. It doesn't open channels itself. |
| `population.target_open_channels` | `8` | Your node opens new channels until it has this many, as long as your Safe can pay for each one. |
| `funding.initial_capacity` | `1 GiB` | How much a new channel is funded with when it opens. |
| `funding.lower_capacity_threshold` | `256 MiB` | When a channel's balance drops to this or below, your node tops it up. |
| `funding.topup_capacity` | `1 GiB` | How much each top-up adds to the channel's current balance. A top-up doesn't refill the channel to `initial_capacity`. |
| `funding.sizing_mode` | `deterministic` | How your node converts the three capacities to wxHOPR. See [How capacity becomes wxHOPR](#how-capacity-becomes-wxhopr). |
| `proactive_funding.enabled` | `true` | Tops up a channel before it reaches `lower_capacity_threshold` if it's draining fast. |

If you leave the whole `strategy` section out of your configuration file, `sizing_mode` is `probabilistic` with `success_probability: 0.99` instead of `deterministic`. For every setting, see [strategy.strategies: ChannelLifecycle](./manage-node-strategies.md#strategystrategies-channellifecycle).

#### How capacity becomes wxHOPR {#how-capacity-becomes-wxhopr}

You set channel funding as a data volume, for example `"1 GiB"`, not as wxHOPR. The requirement in the announcement is in wxHOPR, so set your values, check how much wxHOPR your channels actually hold, and adjust the values until they meet the requirement.

Your node converts the data volumes to wxHOPR itself:

- It uses the network's current ticket price and winning probability. When either changes, the same values fund a different amount of wxHOPR.
- `probabilistic` mode adds a safety buffer on top of the `deterministic` amount, so the same values always fund more wxHOPR. The higher `success_probability`, the bigger the buffer.

#### How the settings work together {#how-the-settings-work-together}

- **Opening:** your node opens channels until it reaches `target_open_channels`, funding each with `initial_capacity`. It stops when your Safe can't pay for another one. `min_open_channels` doesn't open channels, so set `target_open_channels` to at least the same value.
- **Topping up:** when a channel's balance drops to `lower_capacity_threshold` or below, your node adds `topup_capacity`. After the first top-up, a channel's balance moves between about `lower_capacity_threshold` and `lower_capacity_threshold` + `topup_capacity`. Set `initial_capacity` above `lower_capacity_threshold`, or your node tops up new channels straight away.
- **Order:** on each pass, your node tops up channels first, lowest balance first, and only then opens new ones with what's left in your Safe. wxHOPR already locked in extra channels can't be used for top-ups, so a high `target_open_channels` can leave too little in your Safe to keep your channels topped up.
- **Closing:** your node closes channels to peers that have gone offline or perform poorly, and the other side of a channel can close it too. Your node stops closing at `min_open_channels`. If `target_open_channels` is higher, the spare channels keep you above the minimum while your node opens replacements. If your Safe runs too low to keep your channels usable, your node can close channels below `min_open_channels` and use their wxHOPR for the rest.
- **Spending limit:** your node spends at most your Safe balance or your Safe allowance, whichever is lower. See [How to check your Safe allowance and increase it?](#how-to-check-your-safe-allowance-and-increase-it)

#### Example: 2 channels with at least 25 wxHOPR each {#channel-funding-example}

:::caution Example numbers only
2 channels with at least `25 wxHOPR` each is only an example, not the Cover Traffic requirement. The latest announcement on [HOPR's Telegram](https://t.me/hoprnet) sets how many channels your node needs and the minimum balance each one must hold. Use this example to see what each value does, then adjust the values to meet the requirement in the announcement.
:::

In the `ChannelLifecycle` part of your `strategy` section, change these values and keep the other settings as they are. Any strategy you leave out of the `strategies` list is turned off.

```yaml
    - ChannelLifecycle:
        population:
          min_open_channels: 2
          target_open_channels: 3
        funding:
          lower_capacity_threshold: "4 GiB"
          topup_capacity: "1 GiB"
          initial_capacity: "5 GiB"
```

| Setting | Value | What it means here |
| --- | --- | --- |
| `min_open_channels` | `2` | The number of channels you need. Your node doesn't close channels below this. |
| `target_open_channels` | `3` | One spare channel. If a channel closes, you still have 2 while your node opens a replacement. |
| `lower_capacity_threshold` | `4 GiB` | The lowest balance you want your channels to have. Your node tops up a channel when it drops to this. Set it comfortably above `25 wxHOPR`: the balance can drop a little further while the top-up goes through. |
| `topup_capacity` | `1 GiB` | How much each top-up adds. Bigger top-ups mean fewer transactions, but more wxHOPR locked in each channel. |
| `initial_capacity` | `5 GiB` | The balance a new channel opens with. Keep it above `lower_capacity_threshold`, or your node tops up new channels straight away. |

Your node converts these GiB values to wxHOPR itself, so check the result and adjust:

1. Restart your node as described in [Managing Node Service](./node-operations.md), and wait for it to open its channels.
2. Run `GET …/channels` and look at the `balance` of your `outgoing` channels. A new channel holds what `initial_capacity` is worth, which tells you roughly what 1 GiB is worth on your node.
3. If the threshold isn't worth comfortably more than `25 wxHOPR`, raise `lower_capacity_threshold`, and `initial_capacity` with it. If your channels hold far more than you need, lower the values to keep more wxHOPR in your Safe.
4. Check your balances again when a new announcement comes out or the ticket price changes: the same GiB values can then fund a different amount of wxHOPR.

Your Safe needs enough wxHOPR, and enough Safe allowance, to open `target_open_channels` channels with `initial_capacity` each, plus extra for top-ups.
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
No. You can withdraw wxHOPR from your Safe at any time, as described in [Withdraw wxHOPR from your Safe](./staking-hub.md#withdraw-wxhopr-from-your-safe). wxHOPR in your payment channels returns to your Safe when the channels close. If your node no longer has enough open channels with the required wxHOPR, your node stops being eligible for Cover Traffic.
</details>

<details>
<summary>

### How to check your Safe allowance and increase it? {#how-to-check-your-safe-allowance-and-increase-it}
</summary>

Your node funds its payment channels with wxHOPR from your Safe, but only up to the amount your Safe has approved for the HOPR channels contract. This approved amount is your **Safe allowance**. `hopli` set it when you created your Safe, with the `--allowance` value from the setup guide (`15,000 wxHOPR` in the [Docker guide](./node-docker.md#create-your-node-identity-safe-and-node-module)).

Each time your node opens or tops up a channel, the allowance goes down by that amount. wxHOPR that returns to your Safe when a channel closes doesn't raise it again. When the allowance runs out, your node can't open or top up channels, even if your Safe still holds wxHOPR, and it can stop being eligible for Cover Traffic.

#### Check your allowance

1. **Open the Swagger UI and authorize**

    Follow steps 1 to 3 of [How to check if my node is working correctly?](./troubleshooting.md#how-to-check-if-my-node-is-working-correctly)

2. **Read your allowance**

    Run `GET …/account/balances` and look at `safeHoprAllowance`. For example:

    ```json
    "safeHoprAllowance": "15000 wxHOPR"
    ```

    `safeHopr` in the same response is the wxHOPR in your Safe. Your node needs both: wxHOPR in your Safe, and an allowance that covers the wxHOPR it still has to put into channels. If the allowance is lower than that, increase it.

#### Increase your allowance

You change the allowance with a transaction from your Safe that calls `approve` on the wxHOPR token contract. The value you enter **replaces** your current allowance; it isn't added to it. Enter the total allowance you want.

You need these values:

| What | Value |
|---|---|
| wxHOPR token contract | `0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1` (see [HOPR tokens on different chains](../token/acquiring-hopr-tokens.md#hopr-tokens-on-different-chains)) |
| Spender: the HOPR channels contract on Piz Palu | `0x75Ce59332721E3aE3064cb9652BCE35FFCE3f8E6` |
| New allowance, in wei | The wxHOPR amount followed by 18 zeros. We recommend `100,000 wxHOPR`: `100000000000000000000000` |

:::caution
Check the spender address carefully. `approve` lets the spender take wxHOPR from your Safe, up to the allowance.
:::

1. **Open your Safe**

    Open your Safe in Safe\{Wallet\} with a wallet that is a signer of your Safe, as described in [Open your Safe](./staking-hub.md#open-your-safe).

2. **Open Transaction Builder**

    Click **New transaction**, then **Transaction Builder**. If Safe\{Wallet\} shows a disclaimer about third-party apps, read it, select the checkbox to agree, then click **Continue**.

3. **Enter the wxHOPR token contract**

    In **Enter Address or ENS Name**, paste the wxHOPR token contract address. Transaction Builder loads the contract's functions.

4. **Fill in the approve call**

    - In **Contract Method Selector**, select `approve`.
    - In **spender (address)**, paste the HOPR channels contract address.
    - In **value (uint256)**, enter the new allowance in wei, for example `100000000000000000000000`.

5. **Create the batch**

    Click **Add new transaction**, then **Create Batch**.

6. **Send the batch**

    Check the transaction, click **Send Batch**, and sign and execute it with your wallet. If your Safe needs more than one confirmation, the other signers confirm the transaction in Safe\{Wallet\} before it can be executed.

7. **Check the new allowance**

    When the transaction is confirmed, run `GET …/account/balances` again. `safeHoprAllowance` shows the new value, for example `100000 wxHOPR`.
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
Yes. Each node needs its own identity, folder and ports, and must be added to your Safe. Each node also needs its own funded outgoing channels, as many as the Cover Traffic requirement asks for, to be eligible for Cover Traffic. See [Running multiple nodes](./multiple-nodes.md).
</details>

</NoCounter>