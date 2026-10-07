---
id: node-binary
title: Binary
---

:::info
The HOPRd v5.0.0 binary is available for **Linux** only (`x86_64` and `aarch64`). On macOS, use [Docker](./node-docker.md) or [Docker Compose](./node-docker-compose.md).
:::

This guide installs the HOPRd binary in `/root/hoprd` and runs it as a systemd service. When you finish, the folder looks like this:

| Path | What it is |
|---|---|
| `/root/hoprd/hoprd` | The HOPRd binary |
| `/root/hoprd/conf/hoprd-binary.cfg.yaml` | Your node configuration |
| `/root/hoprd/conf/hopr.id` | Your node identity file |
| `/root/hoprd/data` | Your node database |

---

## Create your node identity, Safe and node module

:::tip Migrating from v3.0.x?
If you came here from the [migration guide](./backup-restore-update.md), you already have your identity file and your new Safe and node module addresses. Skip to [Download the HOPRd binary](#download-the-hoprd-binary). In step 3.2, use your backed-up `hopr.id` and the identity password you used on v3.0.x.
:::

Run these steps on any computer with Docker Desktop. This can be your node machine if it is your own computer. Don't run them on a rented or shared server, because the command in step 1.4 asks for a private key.

1. **Start Docker Desktop**

   Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.

2. **Create a temporary folder**

   Create a temporary folder called `hopr-identity` in your home directory.

   **Linux / macOS** (Terminal):

   ```bash
   mkdir -p ~/hopr-identity
   ```

   **Windows** (PowerShell):

   ```powershell
   New-Item -ItemType Directory -Force -Path "$HOME\hopr-identity"
   ```

3. **Create your node identity**

   Gather the values you need for node identity creation. You'll paste these into the command.

   | Placeholder | What it is | Where to find it |
   |---|---|---|
   | `<YOUR_IDENTITY_PASSWORD>` | The password that protects your node identity file | Create a strong passphrase (refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password)). |
   | `<NUMBER>` | How many node identities to create, one per node | Use `1` unless you run several nodes (see [Multiple nodes](./multiple-nodes.md)). |

   Create your node identity. The folder path is written differently on each system.

   **Linux / macOS** (Terminal):

   ```bash
   docker run --rm -it --pull always \
   -v ~/hopr-identity:/data \
   -e IDENTITY_PASSWORD='<YOUR_IDENTITY_PASSWORD>' \
   europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest \
   identity create \
   --identity-directory /data \
   --identity-prefix hopr \
   --number <NUMBER>
   ```

   **Windows** (PowerShell):

   ```powershell
   docker run --rm -it --pull always `
   -v "$HOME\hopr-identity:/data" `
   -e 'IDENTITY_PASSWORD=<YOUR_IDENTITY_PASSWORD>' `
   europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
   identity create `
   --identity-directory /data `
   --identity-prefix hopr `
   --number <NUMBER>
   ```

   The command creates one file per identity in the `hopr-identity` folder: `hopr0.id`, `hopr1.id`, and so on.

4. **Create your Safe and node module**

   Gather the values you need for Safe and node module creation. You'll paste these into the command.

   | Placeholder | What it is | Where to find it |
   |---|---|---|
   | `<YOUR_IDENTITY_PASSWORD>` | The password that protects your node identity file | The password you set in previous step during node identity creation. |
   | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
   | `<SAFE_OWNER>` | The address of the wallet that owns your Safe wallet. | Your wallet app, for example Rabby wallet, MetaMask. |

   :::important
   Before you run the command, create a new **burner wallet** (a fresh wallet with no other funds) and send it `0.02 xDai`. The command asks for this wallet's private key and uses it only to pay the transaction fees. Your new Safe is owned by your `<SAFE_OWNER>` wallet, not the burner wallet, so you never need to paste your Safe owner's private key.
   :::

   Create your Safe and node module, and add the node identity you just created to them. The folder path is written differently on each system.

   **Linux / macOS** (Terminal):

   ```bash
   docker run --rm -it --pull always \
   -v ~/hopr-identity:/data \
   -e IDENTITY_PASSWORD='<YOUR_IDENTITY_PASSWORD>' \
   europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest \
   safe-module create \
   --network piz-palu-prod \
   --provider-url <YOUR_RPC_PROVIDER_URL> \
   --admin-address <SAFE_OWNER> \
   --identity-directory /data \
   --allowance 15000000000000000000000
   ```

   **Windows** (PowerShell):

   ```powershell
   docker run --rm -it --pull always `
   -v "$HOME\hopr-identity:/data" `
   -e 'IDENTITY_PASSWORD=<YOUR_IDENTITY_PASSWORD>' `
   europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
   safe-module create `
   --network piz-palu-prod `
   --provider-url <YOUR_RPC_PROVIDER_URL> `
   --admin-address <SAFE_OWNER> `
   --identity-directory /data `
   --allowance 15000000000000000000000
   ```

   - At the **Enter private key:** prompt, paste the private key of your **burner wallet** and press Enter. Nothing appears on screen while you paste, which is expected.
   - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in step 3.2. Example:

      ```text
      safe 0xAbC0000000000000000000000000000000000123
      node_module 0xDeF0000000000000000000000000000000000456
      ```

5. **Move the identity file to your node machine**

   On your node machine, create the node folder:

   ```bash
   sudo mkdir -p /root/hoprd/conf
   ```

   - In the temporary `hopr-identity` folder, rename the identity file `hopr0.id` to `hopr.id`, then move it to `/root/hoprd/conf/` on your node machine.
   - Once `hopr.id` is in `/root/hoprd/conf/`, keep a backup copy of it somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.

---

## Download the HOPRd binary

1. **Find your machine architecture**

   On your node machine, run:

   ```bash
   uname -m
   ```

   | Output | File to download |
   |---|---|
   | `x86_64` | `hoprd-x86_64-linux` |
   | `aarch64` or `arm64` | `hoprd-aarch64-linux` |

2. **Download the binary and check it**

   Replace `<ARCH>` with `x86_64` or `aarch64` from the previous step:

   ```bash
   curl -fLO https://github.com/hoprnet/hoprd/releases/download/v5.0.0-rc.2/hoprd-<ARCH>-linux
   curl -fLO https://github.com/hoprnet/hoprd/releases/download/v5.0.0-rc.2/hoprd-<ARCH>-linux.sha256
   sha256sum hoprd-<ARCH>-linux
   cat hoprd-<ARCH>-linux.sha256
   ```

   The two checksums must match. If they don't, delete the file and download it again.

   All files are on the [HOPRd v5.0.0-rc.2 release page](https://github.com/hoprnet/hoprd/releases/tag/v5.0.0-rc.2).

3. **Install the binary**

   Move the binary into the node folder, name it `hoprd` and make it executable:

   ```bash
   sudo mv hoprd-<ARCH>-linux /root/hoprd/hoprd
   sudo chmod +x /root/hoprd/hoprd
   ```

---

## Configure your node

1. **Download the configuration file**

   ```bash
   sudo curl -fL -o /root/hoprd/conf/hoprd-binary.cfg.yaml https://docs.hoprnet.org/files/v5/hoprd-binary.cfg.yaml
   ```

2. **Fill in your values**

   Open the file:

   ```bash
   sudo vim /root/hoprd/conf/hoprd-binary.cfg.yaml
   ```

   Set these values. The other settings work as they are.

   | Setting | What to enter |
   |---|---|
   | `identity.password` | The identity password from step 1.3. |
   | `api.auth.Token` | A secret token for the REST API, at least 8 characters. See this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
   | `hopr.host.address.IPv4` | Your public IP address. If you use a DDNS hostname, see [hopr.host](./manage-node-configuration.md#hoprhost). |
   | `hopr.safe_module.safe_address` | The `safe` address from step 1.4. |
   | `hopr.safe_module.module_address` | The `node_module` address from step 1.4. |

   If your node runs behind a router, forward port `9091` (TCP and UDP) to it. See the [port forwarding guide](./port-forwarding.md#how-to-configure-port-forwarding). For the other settings, see [Understanding configuration file settings](./manage-node-configuration.md#understanding-configuration-file-settings).

3. **Check your configuration**

   Download the configuration checker for your architecture and run it:

   ```bash
   curl -fLO https://github.com/hoprnet/hoprd/releases/download/v5.0.0-rc.2/hoprd-cfg-<ARCH>-linux
   chmod +x hoprd-cfg-<ARCH>-linux
   sudo ./hoprd-cfg-<ARCH>-linux --validate /root/hoprd/conf/hoprd-binary.cfg.yaml
   ```

   If the command prints nothing, your configuration is valid. Otherwise it prints what to fix.

---

## Run HOPRd with systemd

:::important
You need **root** access to set up the systemd service. If you don't have it, you can use a process manager like [tmux](https://github.com/tmux/tmux/wiki/Getting-Started) instead.
:::

1. **Create the service file**

   ```bash
   sudo vim /etc/systemd/system/hoprd.service
   ```

   Paste this configuration and save the file:

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

   Environment="HOPRD_CONFIGURATION_FILE_PATH=/root/hoprd/conf/hoprd-binary.cfg.yaml"

   WorkingDirectory=/root/hoprd/
   StandardOutput=journal
   StandardError=journal

   [Install]
   WantedBy=multi-user.target
   ```

2. **Reload systemd**

   Run this after you create or change the service file:

   ```bash
   sudo systemctl daemon-reload
   ```

3. **Start HOPRd on boot**

   ```bash
   sudo systemctl enable hoprd
   ```

4. **Start HOPRd**

   ```bash
   sudo systemctl start hoprd
   ```

5. **Check the service status**

   ```bash
   sudo systemctl status hoprd
   ```

   The status should show `active (running)`. If it doesn't, see [View logs](./node-operations.md?node_service=binary#view-logs).

---

## Fund your node

1. **Fund your Safe wallet**

   :::tip Migrating from v3.0.x?
   Skip this step. You moved your wxHOPR to your new Safe in the migration guide.
   :::

   Send at least `1 wxHOPR` to your Safe wallet: the `safe` address from step 1.4. Your node uses it to pay the fee for announcing itself on the network when it starts.

2. **Fund your node with xDai**

   When the node starts, it shows its address and waits until it has xDai. To find the address, run:

   ```bash
   sudo journalctl -u hoprd | grep "blockchain_address"
   ```

   The value of `blockchain_address` is your node address. Send at least `0.01 xDai` to it. The node checks its balance regularly and finishes starting once the funds arrive.

---

## Check that your node is running

1. **Check that the node announced itself**

   ```bash
   sudo journalctl -u hoprd -f
   ```

   Look for `node announced successfully` or `node already announced on chain`. Press `Ctrl+C` to stop following the logs. The node keeps running.

2. **Check that the node is ready**

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3001/readyz
   ```

   `200` means your node is running, connected to the network and to the chain. `412` means it's still starting; wait a few minutes and try again.

3. **Check your node address through the API**

   Replace `<YOUR_API_TOKEN>` with the `api.auth.Token` value from step 3.2:

   ```bash
   curl -s -H "X-Auth-Token: <YOUR_API_TOKEN>" http://localhost:3001/api/v4/account/addresses
   ```

   The response shows your node address, for example `{"native":"0x07eaf07d6624f741e04f4092a755a9027aaab7f6"}`.

:::tip Your node is running
To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-my-node-is-performing-normally).
:::

To start, stop, upgrade or uninstall your node, see [Managing Node Service](./node-operations.md?node_service=binary).
