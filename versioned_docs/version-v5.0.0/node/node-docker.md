---
id: node-docker
title: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Please note that you must start the onboarding process before setting up your node. To start, visit the [Overview](./run-a-node-overview.md) page.

:::

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
If you came here from the [migration guide](./backup-restore-update.md), your identity file is already in `~/hoprd` and you already have your new Safe and node module addresses. Skip to [Configure hoprd command](#configure-hoprd-command). You can also skip step 3.5, because your configuration file is already in `~/hoprd`.
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

   - Create a folder named `hoprd` on the machine where you will run your HOPRd node.
   - In the temporary `hopr-identity` folder, rename the identity file `hopr0.id` to `hopr.id`, then move it to the `hoprd` folder.
   - Once `hopr.id` is in the `hoprd` folder, keep a backup copy of it somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.


---

## Configure hoprd command

The default command provided below is incomplete and requires manual adjustments. Follow the steps below to fill in each placeholder.

```bash title="hoprd command (edit the highlighted lines)" {27-31}
docker run \
  --pull always \
  -d --restart on-failure \
  -m 2g \
  --security-opt seccomp=unconfined \
  --platform linux/x86_64 \
  --log-driver json-file \
  --log-opt max-size=100M \
  --log-opt max-file=5 \
  -ti \
  -v $HOME/hoprd/:/app/hoprd-db \
  --name hoprd \
  -p 9091:9091/tcp \
  -p 9091:9091/udp \
  -p 3001:3001 \
  -p 1422:1422/udp \
  -p 1422:1422/tcp \
  -e RUST_LOG=info \
  europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:5.0.0-rc.2 \
  --init \
  --api \
  --announce \
  --blokliUrl https://blokli-piz-palu.prod.hoprnet.link \
  --identity /app/hoprd-db/hopr.id \
  --data /app/hoprd-db \
  --apiHost '0.0.0.0' \
  --apiToken '<YOUR_API_TOKEN>' \
  --password '<YOUR_IDENTITY_PASSWORD>' \
  --safeAddress '<SAFE_ADDRESS>' \
  --moduleAddress '<MODULE_ADDRESS>' \
  --host '<YOUR_PUBLIC_IP>:9091' \
  --defaultSessionListenHost 'auto:1422' \
  --configurationFilePath '/app/hoprd-db/hoprd.cfg.yaml'
```

Replace these placeholders in the command. Each one is explained in the step linked next to it:

| Placeholder | Step |
|---|---|
| `<YOUR_API_TOKEN>` | 3.1 Adjust `apiToken` setting |
| `<SAFE_ADDRESS>`, `<MODULE_ADDRESS>` | 3.2 Add your Safe and node module addresses |
| `<YOUR_IDENTITY_PASSWORD>` | 3.3 Adjust `password` setting |
| `<YOUR_PUBLIC_IP>` | 3.4 Adjust `host` setting |

The following settings need to be adjusted in the current Docker command:

1. **Adjust `apiToken` setting**

   1. Create a secret token. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).
   
   2. Replace `<YOUR_API_TOKEN>` in your Docker command with your own secret token. For example: `--apiToken 'My#S3cur1ty#Token'`

        :::note
        Make sure to make a note of the API token you created. You need it to access your node's API, for example in the built-in API browser at `http://<YOUR_NODE_IP>:3001/swagger-ui/`.
        :::

2. **Add your Safe and node module addresses**

   Replace `<SAFE_ADDRESS>` and `<MODULE_ADDRESS>` in the Docker command above with the `safe` and `node_module` addresses from step 2.4.

3. **Adjust `password` setting**

   Replace `<YOUR_IDENTITY_PASSWORD>` in the Docker command above with the password you set when you created your node identity in step 2.3.

   For example: `--password 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'`

   :::note
   Make sure to write down this password, as you will need it if you ever need to restore your node in the future.
   :::

4. **Adjust `host` setting**

   :::caution
   Dynamic IPs are not suitable for this setup, as your node will become unreachable once your IP address changes. **If you have a dynamic IP, use a DDNS service** and specify the DDNS address as your public IP, including the port, in the Docker command. You can find instructions on how to do this [here](./frequently-asked-questions.md#how-to-use-dynamic-dns).
   :::

   1. Find your public IP (see [FAQ](./frequently-asked-questions.md#how-to-find-the-external-ip-address)).
   
   2. If behind NAT such as on computers or servers at home or in an office environment, configure port forwarding for port `9091` (TCP and UDP) (see [Port forwarding guide](./port-forwarding.md#how-to-configure-port-forwarding)).
   
   3. Replace `<YOUR_PUBLIC_IP>` with your public IP or DDNS hostname. The result should look like `--host '1.2.3.4:9091'`.

5. **Add the configuration file** 

   1. Download the example file for Docker: [hoprd.cfg.yaml](pathname:///files/hoprd.cfg.yaml).
   
   2. Customize your strategy (see [Understanding node strategies](./manage-node-strategies.md?config=docker#understanding-node-strategies)).
   
   3. Place the `hoprd.cfg.yaml` file inside your `~/hoprd` folder.

---

## Fund your Safe wallet

:::tip Migrating from v3.0.x?
Skip this section. You moved your wxHOPR to your new Safe in the migration guide.
:::

Send at least `1 wxHOPR` to your Safe wallet: the `safe` address from step 2.4. Your node uses it to pay the fee for announcing itself on the network when it starts.

---

## Start your node

Once you have [configured your Docker command](node-docker.md#configure-hoprd-command) correctly, you can start your node using the adjusted Docker command.

1. **Open your terminal**

2. **Check that Docker is running**

    On macOS, start Docker Desktop first.

    ```bash
    docker --version
    ```

3. **Run your hoprd command**

    Paste your configured HOPRd command into the terminal and execute it.

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

---

:::tip Your node is running
To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).
:::

If you are migrating from v3.0.x, go back to the migration guide and continue with [Verify and clean up](./backup-restore-update.md#verify-and-clean-up).