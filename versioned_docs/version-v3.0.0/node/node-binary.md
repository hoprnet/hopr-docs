---
id: node-binary
title: Binary
---

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

## Download HOPRd binary file

1. **Go to the Release Page**  
   
   Visit the [HOPRd v3.0.0 release page](https://github.com/hoprnet/hoprnet/releases/tag/v3.0.0).

2. **Find the Right File**  
   
   In the **Assets** section, download the binary file that matches your operating system and architecture.  
   Look for a file named:

   ```
   hoprd-<architecture>-<platform>.zip
   ```

   **Examples:**

   - `hoprd-x86_64-linux.zip` – for most 64-bit Linux systems  
   - `hoprd-aarch64-linux.zip` – for ARM-based Linux (Raspberry Pi 4/5, ARM servers)  
   - `hoprd-x86_64-darwin.zip` – for macOS on Intel  
   - `hoprd-aarch64-darwin.zip` – for macOS on M1/M2

3. **Extract the Archive**  
   
   Create a folder named `hoprd`, move the downloaded `.zip` file into it, and extract it. After extraction, you should see the following files inside:
   - `hoprd`  
   - `hoprd-api-schema`  
   - `hoprd-cfg`

---

## Implement configuration file

1. **Create the Configuration Directory**  
   
   Inside the newly created `hoprd` folder, create a subfolder named `conf`.

2. **Download the Example Config File**  
   
   Get the example configuration file specifically for the Binary: [**hoprd-binary.cfg.yaml**](pathname:///files/hoprd-binary.cfg.yaml)

3. **Adjust Configuration Values**  
   
   Make necessary edits to the configuration file based on these [guidelines](./manage-node-strategies.md?config=native-binary).

---

## Configure systemd for binary

Systemd allows you to create a service that runs your application in the background.

:::important
Before setting up a systemd service for the HOPRd node, make sure you have **root** access.  
If not, you can use a process manager like [tmux](https://github.com/tmux/tmux/wiki/Getting-Started) instead.
:::

1. **Create the service file**  
   
   Open a terminal and create the `hoprd.service` systemd file:

   ```bash
   sudo vim /etc/systemd/system/hoprd.service
   ```

2. **Paste the service configuration**
   
   Use the following configuration. Adjust paths and values if needed:

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
   Environment="HOPRD_CONFIGURATION_FILE_PATH=/root/hoprd/conf/hoprd-binary.cfg.yaml"
   Environment="HOPR_INTERNAL_LIBP2P_MSG_ACK_MAX_TOTAL_STREAMS=1000"

   WorkingDirectory=/root/hoprd/
   StandardOutput=journal
   StandardError=journal

   [Install]
   WantedBy=multi-user.target
   ```

   **Configuration notes:**

   | Setting              | Description |
   |----------------------|-------------|
   | **User**             | User to run the service. Default is `root`. |
   | **ExecStart**        | Command used to start the HOPRd binary. This should be the full path to the executable file **hoprd**. Default value is `/root/hoprd/hoprd` |
   | **Environment**      | Sets environment variables required by the HOPRd process. |
   | **WorkingDirectory** | Sets the working directory where relative paths will resolve. |

   After making changes, save **hoprd.service** file.

3. **Reload systemd**  

   Update **systemd** to apply the changes. You need to run this command after creating, modifying, or deleting a unit file (such as a `hoprd.service` file). It refreshes systemd’s internal state so it can recognize the updated service configuration.

   ```bash
   sudo systemctl daemon-reload
   ```

4. **Enable the `hoprd.service` service on boot**  
   
   Enable the service to launch automatically at system boot:

   ```bash
   sudo systemctl enable hoprd
   ```

5. **Start the `hoprd.service` service**  
   
   Start the HOPRd node:

   ```bash
   sudo systemctl start hoprd
   ```

6. **Verify the `hoprd.service` service status**  
   
   Confirm that the service started successfully:

   ```bash
   sudo systemctl status hoprd
   ```

   Example output:

   ![HOPRd service status](/img/node/hoprd-service-status.png)


    :::note
    If `hoprd.service` is **not active**, generate logs before asking for help:

    ```bash
    journalctl -u hoprd >> "hoprd_$(date +%F).log"
    ```

    Then share the log file with the Ambassadors or Moderators for assistance.
    :::

---

## Start HOPR Admin UI

HOPR Admin UI is an application that helps you connect to and manage your HOPRd node. Copy the command below and execute it in your terminal window:

```md
docker run -d -p 4677:4677 --pull always --name hopr-admin-for-3.0 --platform linux/amd64 europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable
```

---

## Link your node to your HOPR Safe wallet

1. **Access the HOPR Admin UI**  
   
   If you're using the default configuration, open the Admin UI in your browser:

   ```
   http://localhost:4677
   ```

   - Replace `localhost` with your **server IP address** if running on a VPS.
   - Ensure the port `4677` is correctly mapped during setup.

2. **Connect to your node**  
   
   Click **CONNECT TO NODE** in the top-right corner. In the **Node credentials** popup:

   - **API endpoint**: Default is `http://localhost:3001`. Replace `localhost` with your VPS IP if applicable. Adjust the port if you changed it.

   - **API token**: Enter the custom security token you created during the [initial HOPRd setup](#implement-configuration-file).

3. **Copy your node address**  
   
   After clicking **Connect to the node**, your node address (starting with `0x`) will appear. Copy it for use during onboarding.

4. **Return to the HOPR Staking Hub**  
   
   There's no need to manually fund your node with xDai tokens. Funding will happen during onboarding via the HOPR Staking Hub.

   Visit the [HOPR Staking Hub](https://hub.hoprnet.org) to: Register for the waitlist, or complete onboarding if you’ve been approved.

---

## What's next?

Once you've completed the onboarding process, ensure your node is fully synced (`100%`) and that you've opened at least one outgoing payment channel with a random peer.

To start earning rewards through Cover Traffic, follow these steps to meet the necessary requirements:

1. Connect to your node via the [HOPR Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui).

2. On the `INFO` page, under the `Network` section, confirm that the `Sync Process` is at `100%`.  
   If it’s not fully synced yet, you’ll need to wait until the process is complete.

3. Once synced, go to the `PEERS` page and select a random peer with a connection quality above `90%`.  
   Click the `OPEN Outgoing Channel` icon, enter `1` as the amount (or another value), and click **Open Channel**.  
   You’ll receive a notification once the channel has been opened.

4. Navigate to the `CHANNELS: OUT` page to verify the outgoing payment channel has been successfully opened.

---

**Congratulations!** Your node should now be fully operational and earning rewards. Be sure to periodically check that your [node is performing properly](./troubleshooting.md#how-to-check-if-my-node-is-performing-normally).