---
id: node-docker
title: For Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## Install Docker

Before proceeding, you need to install **Docker Desktop** on your machine.

<Tabs queryString="docker_os">
<TabItem value="linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="macos" label="macOS">

1. Visit the [Docker website](https://www.docker.com/get-started) and download Docker Desktop.  
2. Follow the installation wizard instructions.  
3. Verify the installation by running:

</TabItem>
</Tabs>

---

## Configure hoprd command

The default command provided below is incomplete and requires manual adjustments. If you are currently in the onboarding process, you should have received an auto-generated Docker command that includes Safe and Module addresses. However, you will need to manually adjust the remaining settings.

```bash
docker run \
  --pull always \
  -d --restart on-failure \
  -m 2g \
  --security-opt seccomp=unconfined \
  --platform linux/x86_64 \
  --log-driver json-file \
  --log-opt max-size=100M \
  --log-opt max-file=5 \
  -ti \
  -v $HOME/hoprd/:/app/data \
  --name hoprd \
  -p 9091:9091/tcp \
  -p 9091:9091/udp \
  -p 3001:3001 \
  -e RUST_LOG=info \
  europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable \
  --network dufour \
  --init \
  --api \
  --announce \
  --identity /app/conf/hopr.id \
  --data /app/data/ \
  --apiHost '0.0.0.0' \
  --apiToken '<YOUR_API_TOKEN>' \
  --password '<YOUR_DB_PASSWORD>' \
  --safeAddress '<SAFE_WALLET_ADDRESS>' \
  --moduleAddress '<MODULE_ADDRESS>' \
  --host '<YOUR_PUBLIC_IP>:9091' \
  --provider '<CUSTOM_RPC_PROVIDER>' \
  --configurationFilePath '/app/conf/hoprd-docker.cfg.yaml'
```

Below is a quick reference of all the `hoprd` CLI flags you’ll need:

| Flag                                                        | Description                              |
| ----------------------------------------------------------- | ---------------------------------------- |
| `--apiToken '<YOUR_API_TOKEN>'`                             | Your Admin UI API token                  |
| `--password '<YOUR_DB_PASSWORD>'`                           | Passphrase to encrypt your identity file. write down this password, as you will need it if you ever need to restore your node in the future. |
| `--safeAddress '<SAFE_WALLET_ADDRESS>'`                     | Your staking Safe wallet address         |
| `--moduleAddress '<MODULE_ADDRESS>'`                        | Your staking Module contract address     |
| `--host '<YOUR_PUBLIC_IP>:9091'`                            | Your public libp2p endpoint (port 9091)  |
| `--provider '<CUSTOM_RPC_PROVIDER>'`                        | Gnosis Chain RPC URL                     |
| `--configurationFilePath '/app/conf/hoprd-docker.cfg.yaml'` | Path to your custom strategy YAML file   |

The following settings need to be adjusted in the current Docker command:

### Adjust `apiToken` setting

1. Create a secret token. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

2. Replace `<SECRET_TOKEN>` in your Docker command with your own secret token.

Example:

```md
--apiToken 'My#S3cur1ty#Token'
```

:::note
Make sure to make a note of the API token you created. You will need it to connect to your node via the HOPR Admin UI.
:::

---

### Adjust `password` setting

Enter the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on creating a secure database password, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

Example:

```md
--password 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'
```

---

### Adjust `safeAddress` and `moduleAddress`

:::tip Already Have These Addresses?
If you copied the Docker command from the **HOPR Staking Hub** during onboarding, the Safe and Module addresses are already included. You can skip to [Step 2.4](./node-docker.md#24-adjust-host-setting).
:::

If not, follow these steps to retrieve and set them manually:

1. Visit the [Staking Hub dashboard](https://hub.hoprnet.org/staking/dashboard).  
   Your **Safe** and **Module** addresses will be displayed at the top of the staking section.

   ![Staking Hub showing Safe and Module addresses](/img/node/updated-module-and-safe-address.png)

2. Replace `SAFE_WALLET_ADDRESS` and `MODULE_ADDRESS` in your Docker command with your actual values.
   
   Example:

   ```bash
   --safeAddress 0xEe8D810feAb42313Cc6E2F9DC2D9E2e55d2eb6f9
   --moduleAddress 0x0cE0dD1532e58C09bd60bb2a50fad9BB03c541B2
   ```

---

### Adjust `host` setting

1. Locate your external IP address by refering to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address). 

2. If you are planning to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment. Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.

3. If you plan to run HOPRd node(s) behind NAT (Network Address Translation), such as on computers or servers at home or in an office environment, you must expose port `9091` to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

4. Replace `YOUR_PUBLIC_IP` in your Docker command with your own public IP, and add the libp2p port which by default is `9091`.

    Example: 

    ```md
    --host 1.2.3.4:9091
    ```

:::caution
Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, use a DDNS service** and specify the DDNS address as your public IP, including the port, in the Docker command. You can find instructions on how to do this [here](./frequently-asked-questions#how-to-use-dynamic-dns).
:::

---

### Adjust `provider` setting

You will need to adjust the setting with a custom RPC provider. There are several methods to get an RPC provider on the Gnosis chain, please follow this [guideline](./custom-rpc-provider.md). 

After obtaining the RPC provider URL, replace `CUSTOM_RPC_PROVIDER` with your own RPC provider URL. If you're using a local RPC endpoint, ensure the URL includes the `http://` prefix followed by the IP address or localhost.

Example:

```md
--provider https://gnosis-rpc.publicnode.com
```

---

### Implement configuration file 

1. Download the example file specificaly for Docker: [hoprd-docker.cfg.yaml](pathname:///files/hoprd-docker.cfg.yaml)

2. Feel free to customize the strategy settings to suit your specific needs. For detailed guidance, refer to the section: [understanding node strategies](./manage-node-strategies.md#understanding-node-strategies).

3. Navigate to the `.hopr-id-dufour` directory on your machine, create a `conf` directory, and upload the newly created configuration file there. Ensure the file is named `hoprd-docker.cfg.yaml`.

---

## Start Your Node

Once you have [configured your Docker command](node-docker.md#2-configure-hoprd-command) correctly, you can start your node using the adjusted Docker command.

1. Open your terminal.

2. Verify that Docker is installed:

    ```md
    docker --help
    ```
    If you see a list of available Docker commands, Docker is installed correctly. If not, make sure [Docker is installed](./node-docker.md#1-install-docker).

3. Paste your configured HOPRd command into the terminal and execute it.

---

## Start HOPR Admin UI

HOPR Admin UI is an application that helps you connect to and manage your HOPRd node. Copy the command below and execute it in your terminal window:

```md
docker run -d -p 4677:4677 --pull always --name hopr-admin-for-3.0 --platform linux/amd64 europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable
```

---

## Link your node to your HOPR Safe wallet

1. **Access the HOPR Admin UI**  
   
   If you're using the default configuration, open the Admin UI in your browser:

   ```
   http://localhost:4677
   ```

   - Replace `localhost` with your **server IP address** if running on a VPS.
   - Ensure the port `4677` is correctly mapped during setup.

2. **Connect to your node**  
   
   Click **CONNECT TO NODE** in the top-right corner. In the **Node credentials** popup:

   - **API endpoint**:  
     
     Default is `http://localhost:3001`. Replace `localhost` with your VPS IP if applicable. Adjust the port if you changed it.

   - **API token**:  
     
     Enter your [custom security token](./node-docker.md#21-adjust-apitoken-setting) from setup.

3. **Copy your node address**  
   
   After clicking **Connect to the node**, your node address (starting with `0x`) will appear. Copy it for use during onboarding.

4. **Return to the HOPR Staking Hub**  
   
   There's no need to manually fund your node with xDai tokens. Funding will happen during onboarding via the HOPR Staking Hub.

   Visit the [HOPR Staking Hub](https://hub.hoprnet.org) to: Register for the waitlist, or complete onboarding if you’ve been approved.

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

These are the requirements for Cover Traffic, which allows your node to start earning rewards.

Follow these steps:

1. Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

2. On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.

4. Navigate to the `CHANNELS: OUT` page to verify the outgoing payment channel has been successfully opened.

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).