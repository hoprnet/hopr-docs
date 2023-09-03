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

(**2**) Enter the following hash into the DAppStore search bar. 

```bash
/ipfs/QmRLJwmwkE3hh1Br7QsT6nZ2BSUyxbAAUUpzTNfzXgDmhC
```

You should see the latest version of the HOPR client in the listed dApps. Click `Get`. This should take you to a new interface.

(**3**) Toggle the `Bypass only signed safe restriction` on the left, then click `install`; this will open the setup wizard.

![bypass toggle](/img/node/dappnode-bypass-signed-safe.png)

(**4**) Copy your Safe address and Module address from your Staking Hub onboarding process.

![dappnode env variable](/img/node/dappnode-env-variables-3.png)

**Note:** If you are re-installing an existing node and not onboarding, you can find the addresses within the dashboard. 

With the setup wizard open, in parallel, go to the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard).

From the Dashboard, note your:

- Safe address
- Module address

![Module and Safe address](/img/node/module-and-safe-address.png)

(**5**) Find your home network's public IP address, you will need it. If you don't know how to find your IP address, follow the instructions [here](./hidden-page.md#find-your-ip-address).

(**6**) Return to the setup wizard and fill out the `Safe address`, `Module address` and `Public IP` fields accordingly (the bottom three).

- Add your Safe address under the field: `Staking safe address`
- Add your Module address under the field: `Staking safe module address`
- Add your Public IP **suffixed with the port** `:9091` under the field: `Host IP/Port mapping`

**Note:** Make sure to add the port suffix `:9091` at the end of your IP address as shown in the image below. 

![dappnode setup wizard](/img/node/dappnode-setup-wizard.png)

**Note:** For version 2.00 (Dufour), you must install a new node, so you cannot restore an old one.

(**7**) Now accept the disclaimer, and your HOPR package should start installing immediately. We recommend you enable auto-updates when prompted. 

(**8**) Once installed, go to `Packages` and click on `HOPR`. Once inside the HOPR package, click on `UI` to enter the HOPR Admin UI. 

![Dappnode package UI](/img/node/dappnode-package-UI.png)

(**9**) Scroll down until you see the section `Addresses`. Copy the Node address and return to [Staking Hub](https://hub.hoprnet.org) to register on the waitlist.

## 2. Link Your Node to Your Safe

:::info

Only do this if you have been approved to join the network. If you are still on the waitlist, please wait until you have been approved to join the network. 

:::info

While connected to your Dappnode's network or via a VPN:

(**1**) Login to your Dappnode and go to `Packages`.

(**2**) Click on `HOPR`. Once inside the HOPR package, click on `UI` to enter the HOPR Admin UI. 

(**3**) Scroll down until you see the section `Addresses`. Copy the Node address and return to the [Staking Hub](https://hub.hoprnet.org) to complete the onboarding process.