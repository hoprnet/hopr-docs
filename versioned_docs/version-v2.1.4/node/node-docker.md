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

Before doing anything else, you need to install **Docker Desktop** on your machine.

<Tabs>
<TabItem value="Linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="mac" label="macOS">

1. Visit [Docker](https://www.docker.com/get-started) and download Docker Desktop to your computer.
2. Follow the wizard steps to ensure Docker is installed.
3. Ensure the installation was successful by running command `docker ps` in your terminal.

</TabItem>
</Tabs>

## 2. Configure hoprd command

The default command provided below is incomplete and will require manual adjustments. If you are currently in the onboarding process, you should have an auto-generated Docker command that includes Safe and Module addresses. However, you will need to manually adjust the remaining settings.

```md
docker run --pull always -d --restart on-failure -m 2g --security-opt seccomp=unconfined --platform linux/x86_64 --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db --name hoprd -p 9091:9091/tcp -p 9091:9091/udp -p 3001:3001 -e RUST_LOG=info europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable --network dufour --init --api --announce --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --apiHost '0.0.0.0' --apiToken '<SECRET_TOKEN>' --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <MODULE_ADDRESS> --host <YOUR_PUBLIC_IP>:9091 --provider <CUSTOM_RPC_PROVIDER>
```

Below are all the settings that need to be adjusted in the current Docker command:

### 2.1 Adjust "apiToken" setting

(**1**) Create a secret token. For guidance on how to create a secure secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). 

(**2**) Replace the "**\<SECRET_TOKEN>**" within your docker command with your own security token.

Example:

```md
--apiToken 'My#S3cur1ty#Token'
```

**Note:** Make sure to make a note of the API token you have created. You will need it to connect to your node via HOPR Admin UI.

### 2.2 Adjust "password" setting

Please fill in the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future. For guidance on how to create a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

Example:

```md
--password 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'
```

### 2.3 Adjust "safeAddress" & "moduleAddress" setting

If you have copied the docker command from the "Staking hub" during onboarding process, you will already have your Safe & Module address by default and can skip this step and go directly to [step 2.4](./node-docker.md#24-adjust-host-setting).

If you have not copied the command during the onboarding process, you will need to adjust **\<SAFE_WALLET_ADDRESS\>** and **\<MODULE_ADDRESS\>** manually and should follow the instructions below:

(**1**) Head over to the [Staking Hub dashboard](https://hub.hoprnet.org/staking/dashboard) where you should find your Safe and Module address at the top of the staking section.

![Module and Safe address](/img/node/updated-module-and-safe-address.png)

(**2**) Replace the "**\<SAFE_WALLET_ADDRESS>**" and "**\<MODULE_ADDRESS>**" within your own addresses.

Examples:

```md
--safeAddress 0xEe8D810feAb42313Cc6E2F9DC2D9E2e55d2eb6f9
```

```md
--moduleAddress 0x0cE0dD1532e58C09bd60bb2a50fad9BB03c541B2
```

### 2.4 Adjust "host" setting

(**1**) Find your public IP address by following these instructions [here](./frequently-asked-questions#how-to-find-your-public-ip).

(**2**) Replace the "**\<YOUR_PUBLIC_IP>**" within your docker command with your own public IP additionally adding libp2p port which is by default is **9091**.

Example: 

```md
--host 1.2.3.4:9091
```

**Important:** Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, please use a DDNS service** and specify the DDNS address as your public IP, including the port, in the Docker command. You can find instructions on how to do this [here](./frequently-asked-questions#how-to-use-dynamic-dns).

### 2.5 Adjust "provider" setting

You will have to adjust with a custom RPC provider. There are several methods to get an RPC provider on the Gnosis chain, please follow this [guideline](./custom-rpc-provider.md).

After you've got RPC provider url, please replace with "**\<CUSTOM_RPC_PROVIDER>**".

Example:

```md
--provider https://gnosis-rpc.publicnode.com
```

## 3. Start Your Node

Once you have [configured your docker command](node-docker.md#2-configure-hoprd-command) correctly, you can start your node by using the now adjusted docker command.

(**1**) Open your terminal.

(**2**) Check that Docker is installed by running the following command:

```md
docker --help
```

If you see an output of available docker commands, Docker is installed. If the docker command is not found, please make sure you have [correctly installed Docker](./node-docker.md#1-install-docker).

(**3**) After making sure, Docker is installed, paste into terminal and execute your configured hoprd command.

## 4. Start HOPR Admin UI

HOPR Admin UI is an application which helps you to connect and manage your hoprd node. Please copy bellow command and execute in your terminal window:

```md
docker run -d -p 4677:4677 --pull always --name hopr-admin-for-2.1 --platform linux/amd64 europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable
```

## 5. Link your node to your Safe wallet

(**1**) Access to recently launched HOPR Admin UI. Assuming you used the default port numbers, you should be able to access the HOPR Admin UI at [http://localhost:4677](http://localhost:4677) (replace **localhost** with your **server IP address** if you are using a VPS).

Example: 

```md
http://127.0.0.1:4677
```

(**2**) Click on the top right corner "**CONNECT TO NODE**". On a popup under "**Node credentials:**" do the following:

- Under the **API endpoint** field, by default api endpoint should be set to `http://localhost:3001`, but you may need to replace `localhost` with your server IP address if you used a VPS and change the port if you adjusted the mapping on installation.
- Under the **API token** field, enter the [custom security token you created](./node-docker.md#21-adjust-apitoken-setting).

(**3**) Click on the button "**Connect to the node**" where popup should appear with node address which starts with "**0x**". Copy your node address and go back to the [Staking Hub](https://hub.hoprnet.org) to register to the waitlist or if you have been approved to join the network, to complete your onboarding.

## 6. Whats next?

Once you’ve completed the onboarding process, ensure your node is fully synced (100%) and that you've opened at least one outgoing payment channel with a random peer. These are the requirements for Cover traffic, which allows your node to begin earning rewards. Follow these steps:

(**1**) Connect to your node via the [Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) On the "**INFO**" page, under the "**Network**" section, confirm that the "**Sync Process**" is at "**100%**." If it’s not fully synced yet, you will need to wait until the process is complete.

(**3**) Once your node is fully synced, go to the "**PEERS**" page and select a random peer with a connection quality above 90%. Click the "**OPEN Outgoing Channel**" icon, enter **1** as the amount (or any other amount of your choice), and then click "**Open Channel**". In less than a minute, you will receive a notification confirming that the payment channel has been opened.

(**4**) Navigate to the "**CHANNELS: OUT**" page to verify that the outgoing payment channel has been successfully opened.

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

