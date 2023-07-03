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

For Avado, you have to specify you want to download /app/hoprd-db in the Avado UI. 

(**1**) Locate your HOPR package and click on the 'manage' icon.

![avado manage](/img/node/avado-manage.png)

(**2**) From here, scroll down to the file manager and enter `/app/hoprd-db/.hopr-identity` in the field under `Download from DNP`.

![avado download](/img/node/avado-db.png)

(**3**) Then click `Download`. This will download the file `hopr-identity.tar.gz` which you will need to rename to `.hopr-identity`.

**Note:** Make sure to rename the file, as the incorrect file suffix will make using it or opening it impossible. On Windows, this should be easy through the UI of the file manager. For Mac users, you can follow these additional [instructions to rename the file.](./using-avado.md#renaming-identity-file-on-macos)

**Restoring an old node:** Use the identity file to [restore your node](using-avado#alternative-method-using-your-identity-file) if needed.

### Renaming Identity File On macOS

Downloading the HOPR identity file on Avado downloads a text file tagged with an incorrect file type (.tar.gz). This means to use the file, you will need to rename the file. On MacOS, you will need to do the following steps:

(**1**) Open the terminal window and locate the directory of the downloaded HOPR identity file. E.g. for the default location, `Downloads` use the command:

```
cd downloads
```

(**2**) Once in the correct directory, use the following command to rename the file:

```
mv hopr-identity.tar.gz .hopr-identity
```

(**3**) To see hidden files when prompted (E.g. when uploading the identity file to restore an old node), use the key combination: `Shift + command + .` 

Make sure you are in the correct folder when looking for the identity file. 

## Default ports

- 3000 on TCP : Admin UI port (speaks HTTP protocol)
- 3001 on TCP: REST API port (speaks HTTP)
- 8080 on TCP: Healthcheck service - is used to see that the node is up & running (speaks HTTP)
- 9091 on TCP: main P2P port used for HOPR protocol
- 9091 on UDP: used for STUN requests by other non-public nodes reaching out to you to see what their IP address is

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

## Transitioning To Dappnode

:::caution Warning
**Important:** Before following this guide to install DappnodeOS on your Avado device, make sure to first [backup your identity file.](./using-avado.md#backup-identity-file)

If you are running a validator or any other dApp, creating a backup of the data is crucial, as the migration process will wipe out all existing data.
:::

### Prerequisites

To complete the transition, you will need the following:

- An empty USB with at least 2 GB of space
- Physical access to your Avado device 

### How To Migrate Your Avado Node To A Dappnode 

(**1**) Create a bootable USB from [this ISO file](https://github.com/dappnode/DAppNode/releases/download/v0.2.73/DAppNode-v0.2.73-debian-bullseye-amd64-unattended.iso). 

We strongly recommend using [Etcher](https://etcher.balena.io/#download-etcher) to create a bootable USB, as it will ensure a smooth migration process.

**Note:** The following instructions show how to use Etcher to create a bootable USB. But you can use any tool for this.

(**2**) Download Etcher; you can download it [here.](https://etcher.balena.io/#download-etcher)

![Download Etcher](/img/node/Download_Etcher.png)

(**3**) Plug your USB stick into your computer and open Etcher.

![Open Etcher](/img/node/Open_Etcher.png)

(**4**) Press the `Flash from file` button and select the [Dappnode ISO file](https://github.com/dappnode/DAppNode/releases/download/v0.2.73/DAppNode-v0.2.73-debian-bullseye-amd64-unattended.iso) when prompted.

(**5**) Then press `Flash!` and wait for the download to complete.

![Loading Flash](/img/node/Loading_flash.png)

(**6**) Once the download completes, you can remove the USB and use it to upgrade your Avado node's software.

(**7**) Turn off your Avado device by holding the power button at the front.

(**8**) Attach the bootable USB to any Avado USB port and connect an Ethernet cable to provide internet to the Avado device.

(**9**) With the USB attached, turn on the Avado device and **wait 15 minutes**.

(**10**) **After 15 minutes**, turn off the Avado device by holding the power button and waiting until the red light goes off.

(**11**) Now remove the USB, turn the Avado device back on, and **wait 5 minutes**. 

(**12**) After 5 minutes have passed, check if `DappNodeWifi` has appeared on your computer's wifi list. If it has, try and log in with the Wifi password: `dappnode`

![Dappnode Wifi](/img/node/Dappnode_wifi.png)

**If you cannot find the Dappnode wifi** follow [these additional steps](./using-avado.md#additional-steps-to-troubleshoot-your-installation) to complete the installation.

**If you cannot find the Dappnode wifi and still see your Avado wifi** follow [these additional step](./using-avado.md#additional-step-if-you-still-see-your-avado-wifi-after-migrating) to complete the installation.

(**13**) Once connected to the Dappnode wifi, access the Dappnode Dashboard at: [http://my.dappnode/](http://my.dappnode/) and you can follow the instructions [here to set up your HOPR node.](./using-dappnode.md) 

### Additional Steps To Troubleshoot Your Installation 

:::info INFO
These are additional steps to be followed in case you cannot find the Dappnode wifi after following the [above instructions](./using-avado.md#how-to-migrate-your-avado-node-to-a-dappnode).

**Note:** If you can see the wifi network "DappNodeWifi" on your computer's list of available networks, you do not have to complete these additional steps.
:::

To login to your new Dappnode, you will need either:

- An external monitor, external keyboard & HDMI cable.
- Or, the [internal IP of your connected Avado/Dappnode](./using-avado.md#how-to-find-your-internal-ip-address). 

If you have the internal IP address of your device you can [login using SSH](./using-avado.md#login-using-ssh), otherwise you can [use an external monitor and keyboard](./using-avado.md#login-using-an-external-monitor-and-keyboard) to interact with your Avado/Dappnode directly.  

### Login Using SSH 

To complete the installation using SSH, you will need to make sure you know your device's internal IP address. You can follow [these steps](./using-avado.md#how-to-find-your-internal-ip-address) to find your internal IP address, if you haven't already.

(**1**) Connect to your now converted dappnode by entering the following command into your terminal:

```bash 
ssh dappnode@[INSERT_YourInternalIPAddress]
```

**Note:** replace `[INSERT_YourInternalIPAddress]` with your devices' internal IP address E.g. `192.xxx.x.xxx`. 

![Dappnode Login](/img/node/Dappnode_ssh.png)

(**2**) You will then be asked to log in. Use the following default credentials to log in:

```bash
Username: dappnode
Password: dappnode.s0
```

(**3**) Once you've logged in, complete the installation through the terminal as documented [here.](./using-avado.md#complete-installation)

### Login Using An External Monitor and Keyboard

You can log in to your node using an external monitor & keyboard. 

(**1**) Plug in your monitor to your Avado/Dappnode using an HDMI cable.

(**2**) Plug in your external keyboard to your Avado/Dappnode device. 

Your monitor should display a screen asking for your login details.

(**3**) Use the following default credentials to login:

```bash
Username: dappnode
Password: dappnode.s0
```

(**4**) Once you've logged in, complete the installation through the terminal as documented [here.](./using-avado.md#complete-installation)

### Complete Installation 

These are additional steps to complete the installation of Dappnode software in case you cannot find the Dappnode wifi after following the [above instructions](./using-avado.md#how-to-migrate-your-avado-node-to-a-dappnode).

Follow these steps after having logged into your now semi-transitioned Avado device. You should see the following screen:

![Dappnode Screen](/img/node/Dappnode_screen.png)

(**1**) Install the follwoing package and enter the password `dappnode.s0` if prompted. 

```bash
sudo apt-get install -y kbd
```

(**2**) Install the prerequisites using the following command:

```bash
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**3**) Install the dappnode package using the following command:

```bash
sudo wget -O - https://installer.dappnode.io | sudo bash
```

(**4**) Finally, run the command:

```bash 
sudo reboot 
```

(**4**) Wait a few minutes and check if `DappNodeWifi` has appeared in your computer's wifi list. Wifi password: `dappnode`

### How To Find Your Device's Internal IP Address

To find your Device's internal IP address, you need to look through the connected devices in your browser's UI. Where this is located on your UI will depend on your internet provider, but the general format can be followed as is below. 

(**1**) Find your Router's IP address. For Windows and macOS users, you can use [this guide.](https://www.hellotech.com/guide/for/how-do-i-find-my-router-ip-address)

(**2**) Log in to your router's UI by entering your IP address into your browser. You will be greeted with a screen similar to the following (this will vary depending on your provider):

![Browser UI Login](/img/node/browser_UI_login.png)

(**3**) Login to your browser's UI, and then locate the connected devices panel. Here you should find the device `dappnode` along with the IP address of the device. 

![Dappnode internal IP](/img/node/Dappnode_internal_IP.png)

### How To Re-Install Dappnode 

These are instructions to re-install Dappnode software on your Avado. This is only for troubleshooting a failed previous installation.

To do this, you will need:

- Physical access to your Avado device
- A micro screwdriver
- A bootable USB with Dappnode software

(**1**) Remove the power cable and any other cables from your Avado device.

(**2**) Remove the bottom of your Avado (you will need a micro screwdriver for this).

(**3**) Now detach the Ram module by gently pulling the two pins outwards. The module should pop upwards without any pressure. Remove the erected module and you should see a circular battery underneath.

(**4**) Remove the battery and wait **10 minutes.**

(**5**) Then add the battery and any other detached modules back to the device and screw back on the bottom.

(**5**) Re-attach the power supply and ethernet cable.

(**6**) Turn on the Avado device for 2 minutes, and then turn the device back off.

(**7**) Plug in the USB stick, and turn the device back on. 

(**8**) Wait for **15 minutes**, then turn off the device.

(**9**) Detach the USB and turn on your device.

(**10**) Wait for **5 minutes** and check if `DappNodeWifi` has appeared in your computer's wifi list. Wifi password: `dappnode`

### Additional Step If You Still See Your Avado Wifi After Migrating

If after having completed the [migration steps](./using-avado.md#how-to-migrate-your-avado-node-to-a-dappnode) you still see your Avado wifi instead of `DappNodeWifi`. Then there is likely an issue with your USB's boot options.

To solve this issue with the instructions below, you will need access to the following:

- An external keyboard
- An external monitor

**If you do not have an external monitor & keyboard** Follow the instructions [here](./using-avado.md#how-to-re-install-dappnode) instead.

(**1**) Turn off your Avado device.

(**2**) Attach the external keyboard using one of the USB ports on the Avado. And attach the external monitor to the Avado using an HDMI cable.

(**3**) With your external monitor & keyboard connected, plug in the bootable USB you created earlier.

(**4**) Now turn on the Avado, and start pressing the `Esc` key until you enter the BIOS. This should be visible on the monitor you have connected.

(**5**) Use the arrow keys to navigate to the `Boot` tab.

(**6**) Here, under `Boot Option Priorities`, select `Boot Option #` and then change it to your attached USB.

(**7**) Now using your arrow keys, navigate to the `Save & Exit` tab and save your settings.

(**8**) Your device should now restart and begin booting from your attached USB. You can now resume the [initial installation method](./using-avado.md#how-to-migrate-your-avado-node-to-a-dappnode) but now starting directly from the 10th step.



