---
id: node-binary
title: For Native Binary
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## 1. Download HOPRd binary file

(**1**) Go to the [HOPRd v3 release page](https://github.com/hoprnet/hoprnet/releases/tag/v2.2.3).

(**2**) In the **"Assets"** section, find and download the file that matches your operating system and architecture.
Look for a file named `hoprd-<architecture>-<platform>.zip` — for example:

- **hoprd-x86_64-linux.zip** for most 64-bit Linux systems
- **hoprd-aarch64-linux.zip** for ARM-based Linux (like Raspberry Pi 4/5 or ARM servers)
- **hoprd-x86_64-darwin.zip** for macOS on Intel
- **hoprd-aarch64-darwin.zip** for macOS on M1/M2

(**3**) Create a folder called **hoprd**, move the recently downloaded file into it, and extract it.
After extraction, you should see the following files: **hoprd**, **hoprd-api-schema**, and **hoprd-cfg**.

## 2. Implement configuration file

(**1**) Inside the newly created **hoprd** folder, download the example file specificaly for Native Binary: [hoprd-binary.cfg.yaml](pathname:///files/hoprd-binary.cfg.yaml).

(**2**) Make adjustments according to these [guidelines](./manage-node-strategies.md?config=native-binary).

## 3. Configure systemd for native binary

Systemd allows you to create a service that runs your application in the background.

:::important

Before setting up a systemd service for the HOPRd node, make sure you have **root** access. If not, you can use a process manager like [tmux](https://github.com/tmux/tmux/wiki/Getting-Started) instead.

:::

(**1**) Create new systemd service for HOPRd binary file:

```bash
sudo vim /etc/systemd/system/hoprd.service
```

(**2**) Use configuration bellow make adjustments and paste into recently created **hoprd.service**:

```ini
[Unit]
Description=HOPRd Node Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/root/hoprd/hoprd
Restart=on-failure
RestartSec=5

Environment="HOPRD_DATA=/root/hoprd/data/"
Environment="HOPRD_CONFIGURATION_FILE_PATH=/root/hoprd/hoprd.cfg.yaml"
Environment="HOPR_INTERNAL_LIBP2P_MSG_ACK_MAX_TOTAL_STREAMS=1000"

WorkingDirectory=/root/hoprd/
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Make adjustments if needed:

| Setting | Description |
| ---| --- |
| **User** | Runs the service as the user. Default value is **root**. |
| **ExecStart** | Command used to start the HOPRd binary. This should be the full path to the executable file **hoprd**. Default value is **/root/hoprd/hoprd** |
| **Environment** | Sets environment variables required by the HOPRd process. |
| **WorkingDirectory** | Sets the working directory where relative paths will resolve. |

After making changes, save **hoprd.service** file.

(**3**) Update **systemd** to apply the changes. You need to run this command after creating, modifying, or deleting a unit file (such as a **.service** file). It refreshes systemd’s internal state so it can recognize the updated service configuration.

```
sudo systemctl daemon-reload
```

(**4**) Enable **hoprd.service** to automatically start the hoprd service at boot time. This needs to be executed only once.

```
sudo systemctl enable hoprd
```

(**5**) Start **hoprd.service** service:

```
sudo systemctl enable start
```

(**6**) Check if **hoprd.service** service started successfully:

```
sudo systemctl status hoprd
```

Example screenshot of successfully started service:
![HOPRd service status](/img/node/hoprd-service-status.png)

:::note 

If the `hoprd.service` is not active, please generate the logs before seeking help.

Run the following command to generate the logs:

```
journalctl -u hoprd >> "hoprd_$(date +%F).log"
```
Then, reach out to the Ambassadors and Moderators with the log file for further assistance.

:::

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

(**2**) On the "**INFO**" page, under the "**Network**" section, confirm that the "**Sync Process**" is at "**100%**". If it’s not fully synced yet, you will need to wait until the process is complete.

(**3**) Once your node is fully synced, go to the "**PEERS**" page and select a random peer with a connection quality above 90%. Click the "**OPEN Outgoing Channel**" icon, enter **1** as the amount (or any other amount of your choice), and then click "**Open Channel**". Within a minute, you will receive a notification confirming that the payment channel has been opened.

(**4**) Navigate to the "**CHANNELS: OUT**" page to verify that the outgoing payment channel has been successfully opened.

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).

