---
id: node-linux-packages
title: Linux
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

When installing HOPRd via native packages on Linux (e.g., `.deb` or `.rpm`), the node integrates directly into the Linux file system using standard conventions.

---

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
<TabItem value="redhat_fedora_centos" label="RHEL / Fedora / CentOS">

1. **Download `.rpm` package**

   1. Go to the [Releases page](https://github.com/hoprnet/hoprnet/releases/latest) and expand the **Assets** section to view all files.
   2. Use the machine identifier from a previous step and locate the appropriate Debian/Ubuntu package (**.rpm format**).
   3. Download the HOPRd package using:

      ```
      curl -o hoprd.rpm -L <HOPRd_package_link>
      ```

      Replace `<HOPRd_package_link>` with the actual URL from the Releases page. Example: `https://github.com/hoprnet/hoprnet/releases/download/v3.0.0/hoprd_3.0.0_aarch64.rpm`. It will download the contents of the HOPRd package and write them into the file: `hoprd.rpm`.

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

## Configure hoprd node

1. **Adjust environment variables**

   Below is a quick reference of all the necessary environment variables you may need to configure:

   | Flag                                                        | Description                              |
   | ----------------------------------------------------------- | ---------------------------------------- |
   | `HOPRD_HOST`                            | Your public libp2p endpoint `<YOUR_PUBLIC_IP>:<LIBP2P_PORT>` (Default libp2p port is `9091`)  |
   | `HOPRD_PASSWORD`                           | Passphrase to encrypt your identity file. Write this down, as you'll need it to restore your node in the future. |
   | `HOPRD_API_TOKEN`                             | Your Admin UI API token                  |
   | `HOPRD_SAFE_ADDRESS`                     | Your staking Safe wallet address         |
   | `HOPRD_MODULE_ADDRESS`                        | Your staking Module contract address     |
   | `HOPRD_PROVIDER`                        | Gnosis Chain RPC URL (see [Custom RPC provider guide](./custom-rpc-provider.md)). |
   | `HOPRD_API_PORT` | REST API port to access via Admin UI (Default port is `3001`)   |


   These environment variables are stored in: `/etc/hoprd/hoprd.env`

   You can find a full list of supported environment variables in the [HOPRNET github repository](https://github.com/hoprnet/hoprnet?tab=readme-ov-file#usage).

2. **Adjust node configuration properties (optional)**

   By default, the strategy settings file is pre-configured and works well as is. However, if you have a clear understanding of the settings and their implications, you can customize them to better align with your specific needs. For detailed instructions, please refer to the section: [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies). 

   The configuration file is located at: `/etc/hoprd/hoprd.cfg.yaml`

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

## Node File Structure & Service Management

After installing the HOPRd package, the following directories and files are created:

| **Purpose**         | **Path**         | **Description**                                                    |
| ------------------- | ---------------- | ------------------------------------------------------------------ |
| Configuration files | `/etc/hoprd`     | Contains configuration files like `hoprd.cfg.yaml` and `hoprd.env` |
| Data directory      | `/var/lib/hoprd` | Stores the node’s database and runtime data                        |
| Log files           | `/var/log/hoprd` | Runtime logs generated by the node                                 |

The HOPRd package sets up a `systemd` service named `hoprd`, which you can manage using `systemctl`.

1. **Start the HOPRd node**

   Starts the node if it’s not already running:

   ```
   sudo systemctl start hoprd
   ```

2. **Stop the HOPRd node**

   Stops the running node:

   ```
   sudo systemctl stop hoprd
   ```

3. **Restart the HOPRd node**

   Stops and then restarts the node:

   ```
   sudo systemctl restart hoprd
   ```

4. **Check the Node Status**

   Displays the current status, including whether it's active and recent log output:

   ```
   sudo systemctl status hoprd
   ```

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

To start earning rewards through Cover Traffic, follow these steps to meet the necessary requirements:

1. **Install the HOPR Admin UI** 

   Install HOPR Admin UI and connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#installing-hopr-admin-ui).

2. **Check if the node is 100% synced**

   On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. **Open outgoing channel and verify**

   1. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.
   
   2. Navigate to the `CHANNELS: OUT` page to verify that the outgoing payment channel has been successfully opened. 

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).