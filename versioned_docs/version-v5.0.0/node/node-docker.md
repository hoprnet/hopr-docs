---
id: node-docker
title: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install Docker

Before proceeding, you need to install **Docker Engine** on your machine.

<Tabs queryString="docker_os">
<TabItem value="linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="macos" label="macOS">

1. Visit the [Docker website](https://www.docker.com/get-started) and download Docker Desktop.  
2. Follow the installation wizard instructions.  
3. Verify the installation by running:

   ```bash
   docker --version
   ```

</TabItem>
</Tabs>

---

## Create your node identity, Safe and node module

:::tip Migrating from v3.0.x?
If you came here from the [migration guide](./backup-restore-update.md), your identity file is already in `~/hoprd` and you already have your new Safe and node module addresses. Skip to [Configure your node](#configure-hoprd-command).
:::

Run these steps on any computer with Docker Desktop. This can be your node machine if it is your own computer. Don't run them on a rented or shared server, because the command in step 2.4 asks for a private key.

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
   - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in the next step. Example:

      ```text
      safe 0xAbC0000000000000000000000000000000000123
      node_module 0xDeF0000000000000000000000000000000000456
      ```

5. **Move the identity file to your node machine**

   Move the identity file you just created to the machine where you will run your HOPRd node.

   - Create a folder named `hoprd` in your home directory (`~/hoprd`) on the machine where you will run your HOPRd node.
   - In the temporary `hopr-identity` folder, rename the identity file `hopr0.id` to `hopr.id`, then move it to the `hoprd` folder.
   - Once `hopr.id` is in the `hoprd` folder, keep a backup copy of it somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.


---

## Configure your node {#configure-hoprd-command}

Your node reads all its settings from a configuration file in your `~/hoprd` folder. Fill it in before you start the node.

1. **Download the configuration file**

   On your node machine, run:

   ```bash
   curl -o ~/hoprd/hoprd-docker.cfg.yaml https://docs.hoprnet.org/files/hoprd-docker.cfg.yaml
   ```

2. **Fill in your values**

   Open `~/hoprd/hoprd-docker.cfg.yaml` in a text editor and replace each placeholder. Keep the quotes around the values.

   | Placeholder | Setting | What to enter |
   |---|---|---|
   | `<YOUR_IDENTITY_PASSWORD>` | `identity.password` | The password you set in step 2.3. If you are migrating, the password you used on v3.0.x. |
   | `<YOUR_API_TOKEN>` | `api.auth` | A secret token for the REST API, at least 8 characters. See this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password). |
   | `<YOUR_PUBLIC_IP>` | `hopr.host.address.IPv4` | Your public IP address. See [How to find the external IP address](./frequently-asked-questions.md#how-to-find-the-external-ip-address). |
   | `<SAFE_ADDRESS>` | `hopr.safe_module.safe_address` | The `safe` address from step 2.4. |
   | `<MODULE_ADDRESS>` | `hopr.safe_module.module_address` | The `node_module` address from step 2.4. |

   :::caution
   Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, use a DDNS service** and enter your DDNS hostname instead of an IP address, as described in [hopr.host](./manage-node-configuration.md#hoprhost). You can find instructions on how to set up DDNS [here](./frequently-asked-questions.md#how-to-use-dynamic-dns).
   :::

   - If behind NAT such as on computers or servers at home or in an office environment, configure port forwarding for port `9091` (TCP and UDP) (see [Port forwarding guide](./port-forwarding.md#how-to-configure-port-forwarding)).
   - Write down your identity password and API token. You need the password if you ever need to restore your node, and the token to access your node's API, for example in the built-in API browser at `http://<YOUR_NODE_IP>:3001/swagger-ui/`.
   - (Optional) To adjust the strategies, see [Understanding node strategies](./manage-node-strategies.md?config=docker#understanding-node-strategies).

3. **Protect and check the file**

   The file contains your identity password and API token. Make it readable only by you, and don't share it or commit it to a repository:

   ```bash
   chmod 600 ~/hoprd/hoprd-docker.cfg.yaml
   ```

   Check the file before you start the node:

   ```bash
   docker run --rm -v $HOME/hoprd/:/app/hoprd-db europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:5.0.0-rc.2 hoprd-cfg --validate /app/hoprd-db/hoprd-docker.cfg.yaml
   ```

   If the command prints nothing, the file is valid. Otherwise it shows the setting to fix, for example a placeholder you haven't replaced.

4. **Copy the Docker command**

   This command starts your node with your configuration file. You don't need to change it.

   ```bash title="hoprd command"
   docker run -d \
     --name hoprd \
     --restart unless-stopped \
     --pull always \
     --stop-signal SIGINT \
     -m 2g \
     --security-opt seccomp=unconfined \
     --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 \
     -v $HOME/hoprd/:/app/hoprd-db \
     -p 9091:9091/tcp -p 9091:9091/udp \
     -p 3001:3001 \
     -p 1422:1422/tcp -p 1422:1422/udp \
     -e RUST_LOG=info \
     europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:5.0.0-rc.2 \
     --configurationFilePath /app/hoprd-db/hoprd-docker.cfg.yaml
   ```

---

## Fund your Safe wallet

:::tip Migrating from v3.0.x?
Skip this section. You moved your wxHOPR to your new Safe in the migration guide.
:::

Send at least `1 wxHOPR` to your Safe wallet: the `safe` address from step 2.4. Your node uses it to pay the fee for announcing itself on the network when it starts.

---

## Start your node

Once your configuration file is filled in and valid, start your node with the [Docker command](#configure-hoprd-command) from step 3.4.

1. **Open your terminal**

2. **Check that Docker is running**

    On macOS, start Docker Desktop first.

    ```bash
    docker --version
    ```

3. **Run your hoprd command**

    Paste the command from step 3.4 into the terminal and execute it.

4. **Fund your node with xDai**

    When the node starts, it shows its address and waits until it has xDai. To find the address, run:

    ```bash
    docker logs -t hoprd | grep "blockchain_address"
    ```

    The value of `blockchain_address` is your node address. Send at least `0.01 xDai` to it. The node checks its balance regularly and finishes starting once the funds arrive.

5. **Check that the node started**

    Check the logs:

    ```bash
    docker logs -f hoprd
    ```

    Look for `node announced successfully` or `node already announced on chain`. Press `Ctrl+C` to stop following the logs. The node keeps running.

    If the container keeps restarting, run `docker logs hoprd` and look for `configuration validation failed`. The lines above it name the setting to fix.

---

:::tip Your node is running
To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).
:::

If you are migrating from v3.0.x, go back to the migration guide and continue with [Verify and clean up](./backup-restore-update.md#verify-and-clean-up).