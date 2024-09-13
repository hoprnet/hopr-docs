---
id: ac-migration-from-legacy
title: Migration from Avado
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. Prerequisites for migration to Dappnode

To complete the transition, you will need the following:

- An empty USB with at least 2 GB of space
- Physical access to your Avado device

**Important:** Before following this guide to install DappnodeOS on your Avado device, make sure to first backup any data if you are running a validator or any other dApp. The migration process will otherwise wipe all existing data.

## 2. Prepare bootable USB stick
 
(**1**) Download [Dappnode ISO file](https://github.com/dappnode/DAppNode/releases/download/v0.2.94/DAppNode-v0.2.94-debian-bookworm-amd64-unattended.iso)

(**2**) Download [Etcher](https://etcher.balena.io/#download-etcher) to create a bootable USB, as it will ensure a smooth migration process.

![Download Etcher](/img/node/download-etcher.png)

(**3**) Plug your USB stick into your computer and open Etcher software.

![Open Etcher](/img/node/etcher-wizard-1.png)

(**4**) Click the "**Flash from file**" button and choose the Dappnode ISO file you recently downloaded when prompted.

(**5**) Click "**Select target**" and choose your USB stick. Ensure you have backed up any important data, as all contents on the USB stick will be erased!

(**5**) Then press "**Flash!**" and wait for the process to complete.

![Loading Flash](/img/node/etcher-wizard-2.png)

(**6**) Once the flashing process is complete, you can remove the USB stick and use it to upgrade your Avado node's software.

**Important**: Your USB stick may not be recognized by your machine due to its different file system. This is expected, and you should proceed with the migration process as planned.

## 3. Finalise migration process

(**1**) Turn off your Avado device by pressing and holding the power button on the front for **10 seconds**.

(**2**) Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port and connect an **Ethernet cable** to provide internet to the Avado device.

(**3**) Turn on the Avado device and **wait 15 minutes**.

(**4**) **After 15 minutes**, turn off the Avado device by holding the power button and waiting until the red light goes off.

(**5**) Remove the USB stick, power the Avado device back on, and **wait 5 minutes**.

(**6**) **After 5 minutes**, check if "**DappNodeWifi**" appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.

## 4. Start your HOPR node

After migrating your Avado device to run Dappnode software, begin the process of setting up your node by visiting the [overview page](./run-a-node-overview#ready-to-run-your-node). This guide will help you get started and ensure your node is running smoothly.

---

## Migration process troubleshooting

<details>
<summary>

### What should I do if "DappNodeWifi" and my Avado Wi-Fi network don't appear in my computer's Wi-Fi list?
</summary>

Please select connection method to your Avado device:

<Tabs>
<TabItem value="migration_method_ssh" label="Connect using SSH">

#### 1. Find your Avado internal IP address

(**1**) To locate the internal IP address of your Avado device, first connect to your router. Please follow only the specific step outlined in [this guide](./port-forwarding.md#2-find-your-routers-gateway-ip-address) to identify your router's gateway IP address.

(**2**) Log in to your router by entering the router's gateway IP address into your browser's address bar. Since router interfaces vary, search for sections labeled "**DHCP Clients**," "**Connected Devices**," or "**Connected Clients**." Within this section, look for the client named "**dappnode**" to find its associated IP address.

#### 2. Connect to your Avado device

(**1**) Connect to your Avado device by entering the following command into your terminal/windows powershell:

```md
ssh dappnode@<avado_internal_ip_address>
```

Please replace "**\<avado_internal_ip_address>**" with your Avado internal IP address.

Example:

```md
ssh dappnode@192.168.5.68
```

(**2**) If this is your first time connecting via SSH, you'll be prompted to confirm the connection to your node. Type **yes** and press enter. Next, you'll be asked to enter a password; the default password is `dappnode.s0`.

**Important**: On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.

#### 3. Finalise migration process

(**1**) Once you've logged in, install "**kbd**" package:

```md
sudo apt-get install -y kbd
```

(**2**) Install the prerequisites using the following command:

```md
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**3**) Install the dappnode package using the following command:

```md
sudo wget -O - https://installer.dappnode.io | sudo bash
```

(**4**) Once the installation is complete, please restart your Avado device by executing the following command:

```md
sudo reboot
```

(**5**) Please wait 5 minutes, then check if "**DappNodeWifi**" appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="migration_method_external" label="Connect using external monitor and keyboard">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Power on your monitor and Avado device, and wait for the login screen to appear. Log in using the following default credentials:

```bash
Username: dappnode
Password: dappnode.s0
```

**Important**: On Linux systems, the password entry will not display characters as you type. Ensure you enter the password correctly before pressing enter.

#### 3. Finalise migration process

(**1**) Once you've logged in, install "**kbd**" package:

```md
sudo apt-get install -y kbd
```

(**2**) Install the prerequisites using the following command:

```md
sudo wget -O - https://prerequisites.dappnode.io | sudo bash
```

(**3**) Install the dappnode package using the following command:

```md
sudo wget -O - https://installer.dappnode.io | sudo bash
```

(**4**) Once the installation is complete, please restart your Avado device by executing the following command:

```md
sudo reboot
```

(**5**) Please wait 5 minutes, then check if "**DappNodeWifi**" appears in your computer's Wi-Fi list. The default Wi-Fi password for DappNode is `dappnode`.

</TabItem>
</Tabs>

</details>

<details>
<summary>

### What should I do if only my Avado Wi-Fi appears but "DappNodeWifi" is missing from my computer's Wi-Fi list?
</summary>

If the Avado Wi-Fi appears on your computer's Wi-Fi list, it suggests a problem with the USB's boot settings, as the device did not attempt to initiate the installation process. Please select connection method to your Avado device:

<Tabs>
<TabItem value="migration_method_ssh_avado" label="Connect using SSH">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- Physical access to your Avado device
- Micro Phillips head screwdriver
- A bootable USB stick with Dappnode software

#### 2. Avado disassembly guide: accessing the internal battery

(**1**) Remove the power cable and any other cables from your Avado device.

(**2**) Detach the bottom panel of your Avado using a micro Phillips screwdriver.

(**3**) Carefully release the RAM module by gently pushing the two clips outward. The module will pop up slightly. Remove the angled module to expose the circular battery located beneath it.

(**4**) Remove the battery and wait **10 minutes**.

(**5**) Reinsert the battery and the RAM module into the device, then secure the bottom panel by replacing and tightening the screws.

(**5**) Re-attach the power supply and ethernet cable.

#### 3. Finalise migration process

(**1**) Power on the Avado device for **2 minutes**.

(**2**) Turn off Avado device.

(**3**) Insert the **bootable USB stick containing the Dappnode software** and power the device back on.

(**4**) Leave the device running for **15 minutes**, then turn it off.

(**5**) Remove the USB stick and power on the device again.

(**6**) Wait for **5 minutes** and check if "**DappNodeWifi**" has appeared in your computer's wifi list. The default Wi-Fi password for DappNode is `dappnode`.
</TabItem>
<TabItem value="migration_method_external_avado" label="Connect using external monitor and keyboard">

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.
- A bootable USB stick with Dappnode software

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Connect an Ethernet cable to your Avado device.

(**5**) Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

#### 3. Finalise migration process

(**1**) Power on your monitor and Avado device and start pressing the "**Esc**" key until you enter the "**BIOS**". This should be visible on the monitor you have connected.

(**2**) Use the arrow keys to navigate to the "**Boot**" tab.

(**3**) Under "**Boot Option Priorities**", select "**Boot Option #**" and then change it to your attached USB.

(**4**) Now, using your arrow keys, navigate to the "**Save & Exit**" tab and save your settings.

(**5**) Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#3-finalise-migration-process) but now starting directly from the **3rd step**.
</TabItem>
</Tabs>
</details>

<details>
<summary>

### What should I do if my DappNode isn't reachable via Wi-Fi and I've forgotten the SSH password?
</summary>

If you've forgotten the SSH password and cannot access your DappNode, you will need to physically connect to the device and perform a reinstall of the DappNode software.

#### 1. Prerequisites for connection to your Avado device

Make sure you have:

- An external monitor & HDMI cable.
- External keyboard.
- A bootable USB stick with Dappnode software

#### 2. Connect to your Avado device

(**1**) Connect your monitor to your Avado device using an HDMI cable.

(**2**) Connect an external keyboard to your Avado device.

(**3**) Connect an Ethernet cable to your Avado device.

(**4**) Attach the **bootable USB stick containing the Dappnode software** to any Avado USB port.

#### 3. Finalise migration process

(**1**) Power on your monitor and Avado device and start pressing the "**Esc**" key until you enter the "**BIOS**". This should be visible on the monitor you have connected.

(**2**) Use the arrow keys to navigate to the "**Boot**" tab.

(**3**) Under "**Boot Option Priorities**", select "**Boot Option #**" and then change it to your attached USB.

(**4**) Now, using your arrow keys, navigate to the "**Save & Exit**" tab and save your settings.

(**5**) Your device should now restart and begin booting from your attached bootable USB stick with Dappnode software. You can now resume the [initial installation method](./ac-migration-from-legacy.md#3-finalise-migration-process) but now starting directly from the **3rd step**.
</details>