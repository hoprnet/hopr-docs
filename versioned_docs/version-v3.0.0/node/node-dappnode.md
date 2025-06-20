---
id: node-dappnode
title: For Dappnode
---

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## Install the HOPR Package


1. Connect to your Dappnode:

   - [Via your local network](https://docs.dappnode.io/docs/user/access-your-dappnode/wifi)
   - Or remotely using [Dappnode VPN](https://docs.dappnode.io/docs/user/access-your-dappnode/vpn/overview). You’ll need to port forward port `51820` on your router to access your Dappnode from anywhere. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

2. Open the **DAppStore** from the sidebar.

3. Use the DAppStore search bar to find `HOPR`.

   ![DAppStore Search Bar](/img/node/Search-HOPR-Dappstore.png)

4. Click **GET** on the HOPR package to open the package details.

5. Click **INSTALL** to start the setup wizard.

   ![Install HOPR](/img/node/dappnode-hopr-package-view.png)

:::tip
Already have HOPR installed? Click **UPDATE** instead.
:::

---

## Obtain Safe & Module addresses to complete node setup

### Copy Your Safe and Module Addresses

Go to the [onboarding page](https://hub.hoprnet.org/staking/onboarding) and copy both your **Safe address** and **Module address**.

![dappnode env variable](/img/node/dappnode-env-variables-3.png)

:::tip
If you're re-installing an existing node (not onboarding), you can find your addresses in the  
[Staking Dashboard](https://hub.hoprnet.org/staking/dashboard), at the top of the staking section.
:::

### Complete installing HOPR package

1. **Identity file password**  

   In the **Identity file password** field, enter the database password, which is required to encrypt your identity file.  
   Make sure to write down this password, as you will need it if you ever need to restore your node in the future.

   For guidance on creating a secure database password, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

2. **REST API Token**  

   In the **REST API Token** field, enter the **secret token**, which will be used to securely connect to your node.  
   This ensures that unauthorized users on the same network cannot access your node.

   For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

3. **RPC Provider URL**  

   In the **RPC Provider URL** field, enter your custom RPC provider. There are several methods to get an RPC provider on the Gnosis chain, please follow this [guideline](./custom-rpc-provider.md). 
   
   If you're using a local RPC endpoint, ensure the URL includes the `http://` prefix followed by the IP address or `localhost`.

4. **Staking Safe Address**  

   In the **Staking safe address** field, enter the recently copied Safe address.

5. **Staking Module Address**  

   In the **Staking safe module address** field, enter the recently copied Module address.

6. **Public Host IP and Port**  

   In the **Public host IP and port** field, enter your public IP suffixed with the port `:9091`.

   - Locate your external IP address by referring to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address).
   - Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
   - Expose port `9091` to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

 7. **Submit to install package**  
   
   Click **Submit**. On the next screen, accept the disclaimer, and your HOPR package should start installing immediately.

   ![dappnode setup wizard](/img/node/dappnode-hopr-package-install-phase.jpg)

---

## Link your node to your HOPR Safe wallet

1. **Access the Admin UI**  
   
   Once installed, go to **Packages** and click on **HOPR**. Inside the HOPR package, click **Ui** to open the HOPR Admin UI.

2. **Connect to the Node**  
   
   Click **CONNECT TO NODE** in the top-right corner. In the popup under **Node credentials**, do the following:

   - In the **API endpoint** field, the default value should be: `http://node.hopr.public.dappnode:3001`

   - In the **API token** field, it will be empty by default. If you entered one during setup, enter it here.

3. **Copy Your Node Address**  
   
   Click the **Connect to the node** button. A popup will appear showing your node address, which starts with `0x`. Copy this address for the next step.

4. **Node Funding Note**  
   
   You don’t need to manually fund your node with **xDai** tokens. Your node will be funded automatically through the HOPR Staking Hub during onboarding.

   Visit the [HOPR Staking Hub](https://hub.hoprnet.org) to register for the waitlist or complete your onboarding if already approved.

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