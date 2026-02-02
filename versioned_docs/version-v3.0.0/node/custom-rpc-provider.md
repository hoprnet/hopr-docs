---
id: custom-rpc-provider
title: Custom RPC Provider
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter, ReCounter } from '@site/src/components/Counter';

<NoCounter>

## Overview

RPC (Remote Procedure Call) enables communication between external applications like the **HOPRd** node and the blockchain network. For reliable syncing, balance checks, and blockchain interactions, we highly recommend setting up your own Gnosis Chain node.

## RPC Provider Methods

Here are the different methods for running your own node or connecting to a third-party RPC provider, ranked from most stable to least stable:

</NoCounter>

<ReCounter>

### Run your own gnosis chain node (Most secure and reliable)

Select platform:

<Tabs>
<TabItem value="RPC_unix" label="Ubuntu / macOS">

To set up a Gnosis chain node, you will need to run both the Execution Layer (EL) and Consensus Layer (CL) clients. Ensure that your hardware meets the necessary requirements:

- [EL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#nethermind-client)
- [CL requirements](https://docs.sedge.nethermind.io/docs/networks/gnosis#consensus-clients-requirements)

We recommend using [Sedge](https://docs.sedge.nethermind.io/) for an easy node setup. Here's how to get started:

1. Install sedge: [Sedge install guide](https://docs.sedge.nethermind.io/docs/quickstart/complete-guide#1-download-and-install-sedge-on-a-new-brand-linux-machine)

2. Install dependencies required for sedge to fully operate:

   ```md
   ./sedge deps install
   ```

3. Generate a full node setup by specifying the custom execution client as **Nethermind** and the consensus client as **Nimbus** (without MEV-Boost). Ensure your Nethermind version is **1.34.1 or higher**.

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

4. Configure log size limitations:
   
   - Navigate to the **sedge-data** folder and open the **.env** file.

   - Add this line: `NETHERMIND_JSONRPCCONFIG_MAXLOGSPERRESPONSE=300000` and save the file.

5. Expose the necessary ports to use the RPC endpoint for HOPRd nodes:
   
   - Navigate to the **sedge-data** folder and open the **docker-compose.yml** file.

   - Under **execution.ports** fill in these ports: **8545:8545** and **8551:8551**, and save the file.

6. Start sedge

   ```md
   ./sedge run
   ```

   Once the setup is complete and fully synced, you can access your RPC endpoint at **http://localhost:8545**. For external use, ensure the port is exposed.

   Watch this video tutorial for step-by-step guidance:

   <iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/nQw6n-MGYB0" frameborder="0" allow="rel=0; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>

</TabItem>
<TabItem value="RPC_dappnode" label="Dappnode">

1. Go to the Stakers section: [http://my.dappnode/stakers/gnosis](http://my.dappnode/stakers/gnosis)
2. Select **Nethermind xDai** for the Execution Layer and **Lighthouse Gnosis** for the Consensus Layer. Ensure **Use checksync** is enabled, then click **Apply Changes**.
3. Configure log size limitations:
   - Go to: [http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config](http://my.dappnode/packages/my/nethermind-xdai.dnp.dappnode.eth/config)
   - Add: `--JsonRpc.MaxLogsPerResponse 300000` to the **ENV VALUE** field next to **EXTRA_OPTS**.
   - Click **Update** to apply the changes.

After syncing, your RPC endpoint for the HOPR node will be [http://nethermind-xdai.dappnode:8545](http://nethermind-xdai.dappnode:8545).

Watch this video tutorial for step-by-step guidance:

<iframe class="youtube-video" width="960" height="500" src="https://www.youtube.com/embed/69Yg_XSqxcA" frameborder="0" allow="rel=0; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0; fullscreen"></iframe>

</TabItem>
</Tabs>

---

### Use third-party RPC providers (Moderately stable)

We recommend using only the following third-party RPC providers, which run on the Nethermind execution client. These options are free and reliable enough for running your node.

<details>
<summary> 
Public Node
</summary>

To use the Public Node RPC provider on the Gnosis network, go to [https://gnosis.publicnode.com](https://gnosis.publicnode.com)

</details>

<details>
<summary> 
Gnosis RPC
</summary>

To use the Gnosis RPC provider, follow the steps below:

1. Replace the RPC provider `https://rpc.gnosis.gateway.fm` with your current RPC provider.
2. If you haven’t set up a configuration file yet, follow
   [this guide](manage-node-configuration.md#create-and-apply-configuration-file-to-your-node).
3. Create a backup of your existing configuration file.
4. Add the following configuration section **directly after** `fast_sync: true`. **Indentation is critical** — incorrect spacing will prevent your node from starting.

   ```yaml
   protocols:
     chains:
       xdai:
         block_time: 5000
         chain_id: 100
         default_provider: 'https://gnosis-provider.rpch.tech'
         description: >-
           The xDai chain is a stable payments EVM (Ethereum Virtual Machine)
           blockchain designed for fast and inexpensive transactions
         hopr_token_name: wxHOPR
         live: true
         max_fee_per_gas: 10 gwei
         max_priority_fee_per_gas: 2 gwei
         native_token_name: xDAI
     networks:
       dufour:
         addresses:
           announcements: '0x619eabE23FD0E2291B50a507719aa633fE6069b8'
           channels: '0x693Bac5ce61c720dDC68533991Ceb41199D8F8ae'
           module_implementation: '0xB7397C218766eBe6A1A634df523A1a7e412e67eA'
           network_registry: '0x582b4b586168621dAf83bEb2AeADb5fb20F8d50d'
           network_registry_proxy: '0x2bc6b78B0aA892e97714F0e3b1c74487f92C5884'
           node_safe_registry: '0xe15C24a0910311c83aC78B5930d771089E93077b'
           node_stake_v2_factory: '0x098B275485c406573D042848D66eb9d63fca311C'
           ticket_price_oracle: '0xcA5656Fe6F2d847ACA32cf5f38E51D2054cA1273'
           winning_probability_oracle: '0x7Eb8d762fe794A108e568aD2097562cc5D3A1359'
           token: '0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1'
         chain: xdai
         confirmations: 8
         environment_type: production
         indexer_start_block_number: 29706814
         max_block_range: 150
         tags:
           - etherscan
         tx_polling_interval: 3000
         version_range: '>=2.0.0, <4.0.0'
   ```
5. Start your node.
</details>

</ReCounter>
