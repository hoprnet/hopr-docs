---
id: using-dappnode
title: Using Dappnode
---

:::caution Warning
Do not start installing a HOPR node without a HOPR Safe. To create a HOPR Safe and run a node please follow the onboarding process [here](https://hub.hoprnet.org/). 
:::

## 1. Install the HOPR Package

While connected to your Dappnode's network or via a VPN:

(**1**) Open the DAppStore using the sidebar to the left.

![DappStore](/img/node/DappStore-NR-1.png)

<<<<<<< HEAD
(**2**) Search for `HOPR` in the DappStore search bar.
=======
(**2**) Enter the following hash into the DAppStore search bar: 

```bash
/ipfs/QmWLs3SXJA36W5WTYZvy2WT3sXF6QNSWX1tamPSjyehieC
```
>>>>>>> 93f0ed256315f2b26d6716784516f405ce3a269f

(**3**) You should see the latest version of the HOPR client in the listed dApps. Click the `Get` button under the HOPR package, this should take you to a new interface.

(**4**) Then, toggle the `Bypass only signed safe restriction` on the left, and click `install`; this will open the setup wizard.

![bypass toggle](/img/node/dappnode-bypass-signed-safe.png)

**Note:** Alternatively, click update if you have already installed the HOPR client.

(**5**) Copy your Safe address and Module address from your Staking Hub onboarding process.

![dappnode env variable](/img/node/dappnode-env-variables-3.png)

**Note:** If you are re-installing an existing node and not onboarding, you can find the addresses within the dashboard. 

With the setup wizard open, in parallel, go to the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard).

From the dashboard, note your:

- Safe address
- Module address

![Module and Safe address](/img/node/module-and-safe-address.png)

(**6**) Find your home network's public IP address, you will need it. If you don't know how to find your IP address, follow the instructions [here](./hidden-page.md#find-your-ip-address).

(**7**) Return to the setup wizard and fill out the `Safe address`, `Module address` and `Public IP` fields accordingly (the bottom three).

- Add your Safe address under the field: `Staking safe address`
- Add your Module address under the field: `Staking safe module address`
- Add your Public IP **suffixed with the port** `:9091` under the field: `Host IP/Port mapping`

**Note:** Make sure to add the port suffix `:9091` at the end of your IP address as shown in the image below. 

![dappnode setup wizard](/img/node/dappnode-setup-wizard.png)

**Note:** For version 2.00 (Dufour), you must install a new node, so you cannot restore an old one.

(**8**) Now accept the disclaimer, and your HOPR package should start installing immediately. We recommend you enable auto-updates when prompted. 

(**9**) Once installed, go to `Packages` and click on `HOPR`. Once inside the HOPR package, click on `UI` to enter the HOPR Admin UI. 

![Dappnode package UI](/img/node/dappnode-package-UI.png)

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
