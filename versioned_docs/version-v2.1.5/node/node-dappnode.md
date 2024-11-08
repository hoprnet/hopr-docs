---
id: node-dappnode
title: For Dappnode
---

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## 1. Install the HOPR Package

While connected to your Dappnode's network or via a VPN:

(**1**) Open the DAppStore using the sidebar to the left.

(**2**) Search for **HOPR** using the DAppStore search bar.

![DAppStore Search Bar](/img/node/Search-HOPR-Dappstore.png)

(**3**) You should see the latest version of the HOPR client in the listed dApps. Click the "**GET**" button under the HOPR package. This will take you to a new interface.

(**4**) Press "**INSTALL**". This will open the setup wizard.

![Install HOPR](/img/node/dappnode-hopr-package-view.png)

**Note:** Alternatively, click "**UPDATE**" if you have already installed the HOPR client.

## 2. Obtain Safe & Module addresses to complete node setup

### 2.1 Copy your Safe address and Module address

Go to the [onboarding page](https://hub.hoprnet.org/staking/onboarding) and copy the afe and Module addresses.

![dappnode env variable](/img/node/dappnode-env-variables-3.png)

**Note:** If you are re-installing an existing node and not onboarding, you can find the addresses within the dashboard. Go to the [Staking Hub dashboard](https://hub.hoprnet.org/staking/dashboard) where you should find your Safe and Module address at the top of the staking section.

### 2.2 Complete installing HOPR package

(**1**) In the **Identity file password** field, enter the database password, which is required to encrypt your identity file. Make sure to write down this password, as you will need it if you ever need to restore your node in the future.

For guidance on creating a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

(**2**) In the **REST API Token** field, enter the **secret token**, which will be used to securely connect to your node. This ensures that unauthorized users on the same network cannot access your node.

For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

(**3**) In the **RPC Provider URL** field, enter your custom RPC provider. There are several methods to get an RPC provider on the Gnosis chain, please follow this [guideline](./custom-rpc-provider.md).

(**4**) In the **Staking safe address** field, enter the recently copied Safe address.

(**5**) In the **Staking safe module address** field, enter the recently copied Module address.

(**6**) In the **Public host IP and port** field, enter your public IP suffixed with the port "**:9091**". Find your public IP address by following these instructions [here](./frequently-asked-questions#how-do-i-find-my-public-ip-address).

**Important:** Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, please use a DDNS service** and specify the DDNS address as your public IP, including the port, in the Docker command. You can find instructions on how to do this [here](./frequently-asked-questions#how-to-use-dynamic-dns).

(**7**) Click "**Submit**". On the next screen, accept the disclaimer, and your HOPR package should start installing immediately.

![dappnode setup wizard](/img/node/dappnode-hopr-package-install-phase.jpg)

## 3. Link your node to your HOPR Safe wallet

(**1**) Once installed, go to "**Packages**" and click on "**HOPR**". Once inside the HOPR package, click on "**Ui**" to enter the HOPR Admin UI.

(**2**) Click "**CONNECT TO NODE**" in the top right corner. In the popup under "**Node credentials:**", do the following:

- In the **API endpoint** field, by default API endpoint should be set to `http://node.hopr.public.dappnode:3001`.
- In the **API token** field, it will be empty by default. If you entered one during the setup process, please enter it here.

(**3**) Click the button "**Connect to the node**" where popup should appear with your node address which starts with "**0x**". Copy your node address.

(**4**) **Note**: You don’t need to manually fund your node with **xDai** tokens. You will fund your node through the HOPR Staking Hub during the onboarding process. Return to the [HOPR Staking Hub](https://hub.hoprnet.org) to register for the waitlist, or, if you've been approved, to complete your onboarding.

## 4. What's next?

Once you’ve completed the onboarding process, ensure your node is fully synced (100%) and that you've opened at least one outgoing payment channel with a random peer. These are the requirements for Cover Traffic, which allows your node to start earning rewards. Follow these steps:

(**1**) Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

(**2**) On the "**INFO**" page, under the "**Network**" section, confirm that the "**Sync Process**" is at "**100%**." If it’s not fully synced yet, you will need to wait until the process is complete.

(**3**) Once your node is fully synced, go to the "**PEERS**" page and select a random peer with a connection quality above 90%. Click the "**OPEN Outgoing Channel**" icon, enter **1** as the amount (or any other amount of your choice), and then click "**Open Channel**". Within a minute, you will receive a notification confirming that the payment channel has been opened.

(**4**) Navigate to the "**CHANNELS: OUT**" page to verify that the outgoing payment channel has been successfully opened.

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).