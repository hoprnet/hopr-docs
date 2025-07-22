---
id: node-linux-packages
title: Linux
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Determine machine architecture

In your terminal window, run the following command to determine your machine’s architecture: 

```
uname -m
```

Based on the output, use the corresponding identifier in the next step to download the appropriate HOPRd package for your operating system:

| Output    | Use this identifier |
| --------- | ------------------- |
| `x86_64`  | `x86_64`            |
| `aarch64` | `aarch64`           |
| `arm64`   | `aarch64`           |

---

## Install HOPRd node

Before proceeding, select Linux distribution:

<Tabs queryString="linux_distribution">
<TabItem value="debian_ubuntu" label="Debian / Ubuntu">

1. **Download `.deb` package**

   1. Go to the [Releases page](https://github.com/hoprnet/hoprnet/releases/latest) and expand the **Assets** section to view all files.
   2. Use the machine identifier from a previous step and locate the appropriate Debian/Ubuntu package (**.deb format**).
   3. Download the HOPRd package using:

      ```
      curl -o hoprd.deb -L <HOPRd_package_link>
      ```

      Replace `<HOPRd_package_link>` with the actual URL from the Releases page. Example: `https://github.com/hoprnet/hoprnet/releases/download/v3.0.0/hoprd_3.0.0_aarch64.deb`. It will download the contents of the HOPRd package and write them into the file: `hoprd.deb`.

2. **Export variables**
   
   Export the necessary variables before proceeding to install the HOPRd package:

      ```
      export HOPRD_SAFE_ADDRESS=<SAFE_WALLET_ADDRESS>
      export HOPRD_MODULE_ADDRESS=<MODULE_ADDRESS>
      export HOPRD_PROVIDER=<CUSTOM_RPC_PROVIDER>
      ```

      Below is a quick reference for all the variables you’ll need to adjust:

      | Variable                     | Description                              |
      | ---------------------------- | ---------------------------------------- |
      | `<SAFE_WALLET_ADDRESS>`      | Your staking Safe wallet address         |
      | `<MODULE_ADDRESS>`           | Your staking Module contract address     |
      | `<CUSTOM_RPC_PROVIDER>`      | Gnosis Chain RPC URL (see [Custom RPC provider guide](./custom-rpc-provider.md)).  |

      Once you have adjusted the values, execute the command to export variables.

3. **Install and launch HOPRd package**
 
   Install HOPRd package using commands below:

      ```
      sudo apt-get update
      sudo -E apt -y install ./hoprd.deb
      ```

</TabItem>
<TabItem value="redhat_fedora_centos" label="Red Hat / Fedora / CentOS">

1. **Download `.rem` package**

   1. Go to the [Releases page](https://github.com/hoprnet/hoprnet/releases/latest) and expand the **Assets** section to view all files.
   2. Use the machine identifier from a previous step and locate the appropriate Debian/Ubuntu package (**.rem format**).
   3. Download the HOPRd package using:

      ```
      curl -o hoprd.rem -L <HOPRd_package_link>
      ```

      Replace `<HOPRd_package_link>` with the actual URL from the Releases page. Example: `https://github.com/hoprnet/hoprnet/releases/download/v3.0.0/hoprd_3.0.0_aarch64.rem`. It will download the contents of the HOPRd package and write them into the file: `hoprd.rem`.

2. **Export variables**
   
   Export the necessary variables before proceeding to install the HOPRd package:

      ```
      export HOPRD_SAFE_ADDRESS=<SAFE_WALLET_ADDRESS>
      export HOPRD_MODULE_ADDRESS=<MODULE_ADDRESS>
      export HOPRD_PROVIDER=<CUSTOM_RPC_PROVIDER>
      ```

      Below is a quick reference for all the variables you’ll need to adjust:

      | Variable                     | Description                              |
      | ---------------------------- | ---------------------------------------- |
      | `<SAFE_WALLET_ADDRESS>`      | Your staking Safe wallet address         |
      | `<MODULE_ADDRESS>`           | Your staking Module contract address     |
      | `<CUSTOM_RPC_PROVIDER>`      | Gnosis Chain RPC URL (see [Custom RPC provider guide](./custom-rpc-provider.md)). |

      Once you have adjusted the values, execute the command to export variables.

3. **Install and launch HOPRd package**
 
   Install HOPRd package using commands below:

      ```
      sudo dnf update -y
      sudo -E dnf install -y ./hoprd.rpm
      ```

</TabItem>
<TabItem value="archlinux" label="Arch Linux">

1. **Download `.pkg.tar.zst` package**

   1. Go to the [Releases page](https://github.com/hoprnet/hoprnet/releases/latest) and expand the **Assets** section to view all files.
   2. Use the machine identifier from a previous step and locate the appropriate Debian/Ubuntu package (**.pkg.tar.zst format**).
   3. Download the HOPRd package using:

      ```
      curl -o hoprd.pkg.tar.zst -L <HOPRd_package_link>
      ```

      Replace `<HOPRd_package_link>` with the actual URL from the Releases page. Example: `https://github.com/hoprnet/hoprnet/releases/download/v3.0.0/hoprd_3.0.0_aarch64.pkg.tar.zst`. It will download the contents of the HOPRd package and write them into the file: `hoprd.pkg.tar.zst`.

2. **Export variables**
   
   Export the necessary variables before proceeding to install the HOPRd package:

      ```
      export HOPRD_SAFE_ADDRESS=<SAFE_WALLET_ADDRESS>
      export HOPRD_MODULE_ADDRESS=<MODULE_ADDRESS>
      export HOPRD_PROVIDER=<CUSTOM_RPC_PROVIDER>
      ```

      Below is a quick reference for all the variables you’ll need to adjust:

      | Variable                     | Description                              |
      | ---------------------------- | ---------------------------------------- |
      | `<SAFE_WALLET_ADDRESS>`      | Your staking Safe wallet address         |
      | `<MODULE_ADDRESS>`           | Your staking Module contract address     |
      | `<CUSTOM_RPC_PROVIDER>`      | Gnosis Chain RPC URL (see [Custom RPC provider guide](./custom-rpc-provider.md)). |

      Once you have adjusted the values, execute the command to export variables.

3. **Install and launch HOPRd package**
 
   Install HOPRd package using commands below:

      ```
      sudo pacman -Syu
      sudo pacman --noconfirm -U ./hoprd.pkg.tar.zst
      ```
</TabItem>
</Tabs>

---

## Configure hoprd node (optional)

By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies). 

---

## Link your node to your HOPR Safe wallet

1. **Retrieve HOPRd node address**

   Retrieve HOPRd node blockchain address (**0x...**) from the logs executing command:

   ```
   grep "blockchain_address" /var/log/hoprd/hoprd.log | head -n 1
   ```

2. **Register node address on the HOPR Staking Hub**

   Go to [HOPR Staking Hub](https://hub.hoprnet.org) and register for the waitlist, or complete onboarding if you’ve been approved.

   :::info

   There's no need to manually fund your node with xDai tokens. Funding will happen during onboarding via the HOPR Staking Hub.

   :::

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

To start earning rewards through Cover Traffic, follow these steps to meet the necessary requirements:

1. Install HOPR Admin UI and Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#installing-hopr-admin-ui).

2. On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.

4. Navigate to the `CHANNELS: OUT` page to verify the outgoing payment channel has been successfully opened.

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).