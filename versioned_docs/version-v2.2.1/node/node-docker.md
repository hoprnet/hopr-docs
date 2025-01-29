---
id: node-docker
title: For Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## 1. Install Docker

Before proceeding, you need to install **Docker Desktop** on your machine.

<Tabs>
<TabItem value="Linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="mac" label="macOS">

1. Visit the [Docker](https://www.docker.com/get-started) website and download Docker Desktop to your computer.
2. Follow the installation wizard steps to ensure Docker is installed.
3. Ensure the installation was successful by running the command `docker ps` in your terminal.

</TabItem>
</Tabs>

## 2. Configure hoprd command

The default command provided below is incomplete and requires manual adjustments. If you are currently in the onboarding process, you should have received an auto-generated Docker command that includes Safe and Module addresses. However, you will need to manually adjust the remaining settings.

```md
docker run --pull always -d --restart on-failure -m 2g --security-opt seccomp=unconfined --platform linux/x86_64 --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db --name hoprd -p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001 -e RUST_LOG=info europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable --network dufour --init --api --announce --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --apiHost '0.0.0.0' --apiToken '<SECRET_TOKEN>' --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <MODULE_ADDRESS> --host <YOUR_PUBLIC_IP>:9091 --provider <CUSTOM_RPC_PROVIDER>
```

The following settings need to be adjusted in the current Docker command:

### 2.1 Adjust "apiToken" setting

(**1**) Create a secret token. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

(**2**) Replace "**\<SECRET_TOKEN>**" in your Docker command with your own secret token.

Example:

```md
--apiToken 'My#S3cur1ty#Token'
```

**Note:** Make sure to make a note of the API token you created. You will need it to connect to your node via the HOPR Admin UI.

### 2.2 Adjust "password" setting

Enter the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on creating a secure database password, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

Example:

```md
--password 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'
```

### 2.3 Adjust "safeAddress" & "moduleAddress" setting

If you copied the Docker command from the "HOPR Staking Hub" during the onboarding process, you will already have your Safe and Module address by default and can skip this step and proceeding directly to [step 2.4](./node-docker.md#24-adjust-host-setting).

If you did not copy the command during the onboarding process, you will need to adjust **\<SAFE_WALLET_ADDRESS\>** and **\<MODULE_ADDRESS\>** manually and should follow the instructions below:

(**1**) Go to the [Staking Hub dashboard](https://hub.hoprnet.org/staking/dashboard) where you should find your Safe and Module address at the top of the staking section.

![Module and Safe address](/img/node/updated-module-and-safe-address.png)

(**2**) Replace "**\<SAFE_WALLET_ADDRESS>**" and "**\<MODULE_ADDRESS>**" within your own addresses.

Examples:

```md
--safeAddress 0xEe8D810feAb42313Cc6E2F9DC2D9E2e55d2eb6f9
```

```md
--moduleAddress 0x0cE0dD1532e58C09bd60bb2a50fad9BB03c541B2
```

### 2.4 Adjust "host" setting

(**1**) Find your public IP address by following these instructions [here](./frequently-asked-questions#how-do-i-find-my-public-ip-address).

(**2**) Replace "**\<YOUR_PUBLIC_IP>**" in your Docker command with your own public IP, and add the libp2p port which by default is **9091**.

Example: 

```md
--host 1.2.3.4:9091
```

**Important:** Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, use a DDNS service** and specify the DDNS address as your public IP, including the port, in the Docker command. You can find instructions on how to do this [here](./frequently-asked-questions#how-to-use-dynamic-dns).

### 2.5 Adjust "provider" setting

You will need to adjust the setting with a custom RPC provider. There are several methods to get an RPC provider on the Gnosis chain, please follow this [guideline](./custom-rpc-provider.md). 

After obtaining the RPC provider URL, replace "**\<CUSTOM_RPC_PROVIDER>**" with your own RPC provider URL. If you're using a local RPC endpoint, ensure the URL includes the "**http://**" prefix followed by the IP address or localhost.

Example:

```md
--provider https://gnosis-rpc.publicnode.com
```

## 3. Start Your Node

Once you have [configured your Docker command](node-docker.md#2-configure-hoprd-command) correctly, you can start your node by using the adjusted docker command.

(**1**) Open your terminal.

(**2**) Check that Docker is installed by running the following command:

```md
docker --help
```

If you see an output of available docker commands, Docker is installed. If the docker command is not found, ensure that [Docker](./node-docker.md#1-install-docker) is installed correctly.

(**3**) After ensuring Docker is installed, paste your configured HOPRd command into the terminal and execute it.

## 4. Start HOPR Admin UI

HOPR Admin UI is an application that helps you connect to and manage your HOPRd node. Copy the command below and execute it in your terminal window:

```md
docker run -d -p 4677:4677 --pull always --name hopr-admin-for-2.1 --platform linux/amd64 europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable
```

## 5. Link your node to your HOPR Safe wallet

(**1**) Access the recently launched HOPR Admin UI. Assuming you used the default port numbers, you should be able to access the HOPR Admin UI at [http://localhost:4677](http://localhost:4677) (replace **localhost** with your **server IP address** if you are using a VPS).

Example: 

```md
http://127.0.0.1:4677
```

(**2**) Click "**CONNECT TO NODE**" in the top right corner.  In the popup under "**Node credentials:**", do the following: 

- In the **API endpoint** field, the default API endpoint should be set to `http://localhost:3001`. However, you may need to replace `localhost` with your server's IP address if you used a VPS, and adjust the port if you changed the mapping during installation.
- In the **API token** field, enter the [custom security token you created](./node-docker.md#21-adjust-apitoken-setting).

(**3**) Click the button "**Connect to the node**" where popup should appear with your node address which starts with "**0x**". Copy your node address.

(**4**) **Note:** You don’t need to manually fund your node with **xDai** tokens. You will fund your node through the HOPR Staking Hub during the onboarding process. Return to the [HOPR Staking Hub](https://hub.hoprnet.org) to register for the waitlist, or, if you've been approved, to complete your onboarding.

## 6. What's next?

Once you’ve completed the onboarding process, ensure your node is fully synced (100%) and that you've opened at least one outgoing payment channel with a random peer. These are the requirements for Cover Traffic, which allows your node to start earning rewards. Follow these steps:

(**1**) Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) On the "**INFO**" page, under the "**Network**" section, confirm that the "**Sync Process**" is at "**100%**." If it’s not fully synced yet, you will need to wait until the process is complete.

(**3**) Once your node is fully synced, go to the "**PEERS**" page and select a random peer with a connection quality above 90%. Click the "**OPEN Outgoing Channel**" icon, enter **1** as the amount (or any other amount of your choice), and then click "**Open Channel**". Within a minute, you will receive a notification confirming that the payment channel has been opened.

(**4**) Navigate to the "**CHANNELS: OUT**" page to verify that the outgoing payment channel has been successfully opened.

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

