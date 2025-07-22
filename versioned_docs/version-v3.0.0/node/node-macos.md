---
id: node-macos
title: macOS
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install HOPRd node

1. **Install Homebrew**

   1. Open the **Terminal** application on your macOS.
   2. Install Homebrew by running the following command:

      ```
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      ```

      This will download and install Homebrew and also set up the correct shell environment.
   3. Once the installation is complete, add Homebrew to your shell profile by running:

      ```
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile eval "$(/opt/homebrew/bin/brew shellenv)"
      ```

2. **Install HOPRd using homebrew**

   Install the HOPRd package on your macOS using Homebrew:

   ```
   brew tap hoprnet/hoprd
   brew install hoprd@3.0.0
   ```

## Configure HOPRd node 

1. **Edit environment variables**

   1. Open **Terminal** application and edit file `hoprd.env` which is located here: `/opt/homebrew/etc/hoprd/hoprd.env`
   2. Below is a quick reference for all the variables you’ll need to adjust:
      
      | Variable                     | Description                              |
      | ---------------------------- | ---------------------------------------- |
      | `HOPRD_PROVIDER`      | Gnosis Chain RPC URL (see [Custom RPC provider guide](./custom-rpc-provider.md)).          |
      | `HOPRD_SAFE_ADDRESS`           | Your staking Safe wallet address     |
      | `HOPRD_MODULE_ADDRESS`      | Your staking Module contract address |

      Once you finished, save file.

2. **Configure hoprd node (optional)**

   By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

   Configuration file is located at: `/opt/homebrew/etc/hoprd/hoprd.cfg.yaml`

## Link your node to your HOPR Safe wallet

1. **Retrieve HOPRd node address**

   1. Once you completed HOPRd installation it outputs HOPRd configuration.
   2. In the HOPRd configuration locate **Node Address**.

2. **Register node address on the HOPR Staking Hub**

   Go to [HOPR Staking Hub](https://hub.hoprnet.org) and register for the waitlist, or complete onboarding if you’ve been approved.

   :::info

   There's no need to manually fund your node with xDai tokens. Funding will happen during onboarding via the HOPR Staking Hub.

   :::

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

To start earning rewards through Cover Traffic, follow these steps to meet the necessary requirements:

1. Once the onboarding process is completed, start your node by running command:

   ```
   brew services start hoprd
   ```

2. Install HOPR Admin UI and Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#installing-hopr-admin-ui).

3. On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

4. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.

5. Navigate to the `CHANNELS: OUT` page to verify the outgoing payment channel has been successfully opened.

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).