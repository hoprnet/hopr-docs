---
id: using-dappnode
title: Set Up & Use Dappnode
---

:::caution Warning
Do not start installing a HOPR node without a HOPR Safe. To create a HOPR Safe and run a node please follow the onboarding process [here](https://hub.hoprnet.org/). 
:::

## 1. Install the HOPR Package

While connected to your Dappnode's network or via a VPN:

(**1**) Open the DAppStore using the sidebar to the left.

(**2**) Search for `HOPR` using the DAppStore search bar.

![DAppStore Search Bar](/img/node/test-image2.png)

(**3**) You should see the latest version of the HOPR client in the listed dApps. Click the `Get` button under the HOPR package, this should take you to a new interface.

(**4**) Press `install`; this will open the setup wizard.

![Install HOPR](/img/node/install-HOPR-dappnode-new-package.png)

**Note:** Alternatively, click update if you have already installed the HOPR client.

(**5**) Copy your Safe address and Module address from your Staking Hub onboarding process.

![dappnode env variable](/img/node/dappnode-env-variables-3.png)

**Note:** If you are re-installing an existing node and not onboarding, you can find the addresses within the dashboard. 

With the setup wizard open, in parallel, go to the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard).

From the dashboard, note your:

- Safe address
- Module address

![Module and Safe address](/img/node/updated-module-and-safe-address.png)

(**6**) Find your home network's public IP address, you will need it. If you don't know how to find your IP address, follow the instructions [here](./hidden-page.md#find-your-ip-address).

(**7**) Return to the setup wizard and fill out the `Safe address`, `Module address`, `Public IP` and `RPC provider` fields accordingly (the bottom three).

- Add your Safe address under the field: `Staking safe address`
- Add your Module address under the field: `Staking safe module address`
- Add your Public IP **suffixed with the port** `:9091` under the field: `Host IP/Port mapping`
- Add custom RPC provider under the field: `RPC Provider URL` (to obtain the RPC provider URL, you can find guidelines [here](./start-here.md#understanding-rpc-importance-and-setting-up-your-own-custom-rpc-provider))

**Note:** Make sure to add the port suffix `:9091` at the end of your IP address as shown in the image below. 

![dappnode setup wizard](/img/node/dappnode-setup-wizard.png)

(**8**) Now accept the disclaimer, and your HOPR package should start installing immediately. We recommend you enable auto-updates when prompted. 

(**9**) Once installed, go to `Packages` and click on `HOPR`. Once inside the HOPR package, click on `UI` to enter the HOPR Admin UI. 

![Dappnode package UI](/img/node/Dappnode-new-packag-UI.png)

(**10**) Click on the top right corner "Connect to node" and enter these details:

- API endpoint - http://node.hopr.public.dappnode:3001
- API token - If you haven't changed the security token during the installation process, the security token will be the default one: `!5qxc9Lp1BE7IFQ-nrtttU`.

After filling API endpoint & API token fields click on "Connect to the node".

(**11**) It will display an error message, indicating that you need to fund your node. Copy the Node address and return to [Staking Hub](https://hub.hoprnet.org) to register on the waitlist.

:::caution Warning
**Do not fund your node by sending funds from your wallet.** Wait to complete the rest of the onboarding flow. You will be able to do this through the Staking Hub. Trying to fund the node directly may cause problems. 
:::

## 2. Link Your Node to Your Safe

:::info

Only do this if you have been approved to join the network. If you are still on the waitlist, please wait until you have been approved to join the network. 

:::info

While connected to your Dappnode's network or via a VPN:

(**1**) Login to your Dappnode and go to `Packages`.

(**2**) Click on `HOPR`. Once inside the HOPR package, click on `UI` to enter the HOPR Admin UI. 

(**3**) Scroll down until you see the section `Addresses`. Copy the Node address and return to the [Staking Hub](https://hub.hoprnet.org) to complete the onboarding process.

## 3. Backup Your Identity File

Make sure to back up your identity file incase. This will help you restore your node in the future, if ever needed.

(**1**) Go to [http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager)

(**2**) Under the `Download file` section, enter `/app/hoprd-db/.hopr-identity` and click `Download`.

(**3**) Unarchive the hopr-identity.tar file to see the .hopr-identity file.

**Note:** Make sure you are able to see hidden files. Adjust the settings on your device, otherwise the identity file will not be visible.

(**4**) Copy this file and save it somewhere safe.

## Next Steps

Once you've completed the above steps, you should have a working HOPR node. You will then want to access the HOPR admin panel to interact with your node. You can read how to access and set up HOPR admin [here](./using-hopr-admin-v2.md). 

## Set Up Portforwarding

In order to run a HOPR node on the HOPR network you will need to have set up portforwarding, You can read up on why you need this and how to set it up [here](./using-hopr-admin.md#types-of-nodes).