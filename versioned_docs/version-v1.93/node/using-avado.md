---
id: using-avado
title: Using an Avado Node
---

To set up your AVADO Node, follow the instructions that came with the box. If you have a HOPR PC Node, it will come with HOPR pre-installed. All you have to do is download the HOPR client to start interacting with your node!

## Installing the HOPR Client: 1.93.5 (Monte Rosa)

While connected to your AVADO's network or via a VPN, go to the following [link](http://my.ava.do/#/installer/%2Fipfs%2FQmce6kLMmGLGkjPJQbDagAAHhn8SGLzXUXHzGPfcX2kJxx). Just click the install button and wait until the download completes.

If you are unable to use the link above, search for this hash in the AVADO DappStore:

```
/ipfs/Qmce6kLMmGLGkjPJQbDagAAHhn8SGLzXUXHzGPfcX2kJxx
```

![DappStore](/img/node/avado-1.png)

After you have installed the HOPR package, you can find the HOPR client in `my DApps`.

![MyDapps](/img/node/avado-2.png)

Your **security token** is set to `!5qxc9Lp1BE7IFQ-nrtttU`. You will need this to access your node.

If you are in the process of registering your node on the network registry, please complete the process [here](./network-registry-tutorial.md) before continuing.

Otherwise, the installation process is complete! You can proceed to our [hoprd tutorial](using-hopr-admin).

### Alternative method: using your identity file

If you have previously installed a node and have the [identity file downloaded](using-hopr-admin#backing-up-your-identity-file), you can use it to restore your old node.

**Note:** The backup you downloaded will be a zipped folder. If you haven't already, you need to extract this folder to [find the identity file](using-hopr-admin#how-to-view-your-avado-identity-file).

(**1**) Locate your HOPR package and click on the manage icon. From there, scroll down to the file manager.

![avado upload](/img/node/avado-db.png)

(**2**) Click on `Browse` button to the right of the first text field under `Upload to DNP`.

(**3**) Open your identity file when prompted.

(**4**) In the second text field, paste `/app/hoprd-db`, then click `Upload` to the right of the text field.

### Backup Identity File

For Avado, you have to specify you want to download /app/hoprd-db in the Avado UI. Locate your HOPR package and click on the 'manage' icon.

![avado manage](/img/node/avado-manage.png)

From here, scroll down to the file manager and enter `/app/hoprd-db/.hopr-identity` in the field under `Download from DNP`. Then click 'Download'. This will download the file `hopr-identity.tar.gz` which you will need to rename to `.hopr-identity`.

![avado download](/img/node/avado-db.png)

Use the identity file to [restore your node](using-avado#alternative-method-using-your-identity-file) if needed.

## Collecting Logs

If your node crashes, you will want to collect the logs and pass them on to our ambassadors on telegram or create an issue on GitHub.

To collect the logs:

(**1**) Locate your HOPR package and click on the manage icon.

![Manage Avado](/img/node/avado-manage.png)

(**2**) Scroll to the bottom to find your logs.

![Avado Logs](/img/node/Avado-logs.png)

(**3**) Enter 1500 into the `Lines` text field instead of 200 and turn `auto-refresh logs` off. Now you should be able to copy your logs easily.

With your copied loges either:

- Save them in a .txt file and send them to an ambassador on our [telegram](https://t.me/hoprnet) for assistance.
- Or, create an issue using our bug template on [GitHub.](https://github.com/hoprnet/hoprnet/issues)

## Using a Custom RPC Endpoint

You can set your own RPC endpoint for HOPR to use. Ideally, you would install an Gnosis Execution Client (Nethermind) on your Avado and use its local provider. A local provider helps increase decentralisation and is generally good practice, but you can also use any RPC provider of your choice.

### Finding your local endpoint

If you have already installed an Gnosis Execution Client (Nethermind), you can find its RPC endpoint on the client's settings page.

![ETH client settings](/img/node/RPC-endpoint-avado.png)

The image above shows the RPC for the Gnosis Execution Client (Nethermind): `http://nethermind-gnosis.my.ava.do:8545`. Your endpoint will be different depending on the client you have installed. Otherwise, you can use any non-local RPC provider such as [ankr.](https://www.ankr.com/)

### Changing your RPC endpoint

To change your RPC endpoint:

(**1**) Locate your HOPR package and click on the manage icon.

![Manage Avado](/img/node/avado-manage.png)

(**2**) Under `Environment Variables`, you should find the variable `HOPRD_PROVIDER` along with an editable text field to its right.

![Environment variables](/img/node/HOPR-provider-Avado.png)

(**3**) The default endpoint is `https://provider-proxy.hoprnet.workers.dev/xdai_mainnet`. Replace this with your own, e.g. `http://nethermind-gnosis.my.ava.do:8545` in my case.

(**4**) Click 'Update environment variables' and wait for your node to restart.

All done! Your Avado node will now use your specified RPC endpoint.

## Transitioning to Dappnode

:::info INFO
**Important:** Before following this guide to install DappnodeOS on your Avado device, make sure to first [backup your identity file.](./using-avado.md#backup-identity-file)

If you are running a validator or any other dApp, creating a backup of the data is crucial, as the migration process will wipe out all existing data.
:::

### Prerequisites

To complete the transition, you will need the following:

- An empty USB with at least 2 GB of space
- Physical access to your Avado node 

### How to convert your Avado node to a Dappnode 

(**1**) Create a bootable USB from the provided ISO file: [https://github.com/dappnode/DAppNode/releases/download/v0.2.69/DAppNode-v0.2.69-debian-bullseye-amd64-unattended.iso](https://github.com/dappnode/DAppNode/releases/download/v0.2.69/DAppNode-v0.2.69-debian-bullseye-amd64-unattended.iso). 

We strongly recommend using this tool [https://etcher.balena.io/#download-etcher](https://etcher.balena.io/#download-etcher) to create a bootable USB, as it will ensure a smooth migration process.

<!-- INSERT INSTRUCTIONS ON HOW TO USE ETCHER BALENA -->

(**2**) Attach the bootable USB to any Avado USB port and connect an Ethernet cable to provide internet connectivity to the Avado device.

(**3**) Turn on the Avado device, sit back, relax, and set a timer for 15 minutes.

(**4**) After 15 minutes, turn off the Avado device by clicking on the button located in front and wait until the red light goes off.

(**5**) Turn on the Avado device, remove the USB, and wait 5 minutes, and afterwards, check if `DappNodeWifi` has appeared on your computer's wifi list. Wifi password: `dappnode`

**Note:** If you cannot find the Dappnode wifi, follow [these additional steps](./using-avado.md#additional-steps-to-complete-the-installation) to complete the installation.

(**6**) Once connected to the Dappnode wifi, access the Dappnode Dashboard at: [http://my.dappnode/](http://my.dappnode/)

### Additional Steps To Complete The Installation 

These are additional steps to be followed in case you cannot find the Dappnode wifi after following the [above instructions](./using-avado.md#how-to-convert-your-avado-node-to-a-dappnode).

To login to your new Dappnode, you will need either:

- An external monitor, external keyboard & HDMI cable.
- Or, the [internal IP of your connected Avado/Dappnode](./using-avado.md#how-to-find-your-internal-ip-address). 

If you have the internal IP address of your device you can [login using SSH](./using-avado.md#login-using-ssh), otherwise you can [use an external monitor and keyboard](./using-avado.md#login-using-an-external-monitor--keyboard) to interact with your Avado/Dappnode directly.  

### Login Using SSH 

To complete the installation using SSH, you will need to make sure you know your device's internal IP address. You can follow [these steps](./using-avado.md#how-to-find-your-internal-ip-address) to find your internal IP address, if you haven't already.

(**1**) Connect to your now converted dappnode by entering the following command into your terminal:

```bash 
ssh dappnode@<YourInternalIPAddress> 
```

**Note:** replace <YourInternalIPAddress> with your devices' internal IP address. 

<!-- ADD SCREENSHOT OF SSH COMMAND -->

(**2**) You will then be asked to log in. Use the following default credentials to log in:

```bash
Username: dappnode
Password: dappnode.s0
```

<!-- ADD SCREENSHOT OF LOGIN -->

(**3**) Once you've logged in, complete the installation through the terminal as documented [here.](./using-avado.md#complete-installation)

### Login Using An External Monitor & Keyboard

You can log in to your node using an external monitor & keyboard. 

(**1**) Plug in your monitor to your Avado/Dappnode using an HDMI cable.

(**2**) Plug in your external keyboard to your Avado/Dappnode device. 

Your monitor should display a screen similar to the following, asking for your login details:

<!-- INSERT SCREENSHOT -->

(**3**) Use the following default credentials to login:

```bash
Username: dappnode
Password: dappnode.s0
```

<!-- ADD SCREENSHOT OF LOGIN -->

(**4**) Once you've logged in, complete the installation through the terminal as documented [here.](./using-avado.md#complete-installation)

### Complete Installation

(**1**) Install the prerequisites using the following command:

```bash
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**2**) Install the dappnode package using the following command:

```bash
Install dappnode package: sudo wget -O - https://installer.dappnode.io | sudo bash
```

**Note:** You may receive the following error running this command: `openvt: command not found`. If this is the case, then run the following command `sudo apt-get install -y kbd` followed by `sudo reboot`. Then try running the command again. 

(**3**) Finally, run the command:

```bash 
sudo reboot 
```

(**4**) Wait a few minutes and check if `DappNodeWifi` has appeared in your computer's wifi list. Wifi password: `dappnode`


### How to find your internal IP address


