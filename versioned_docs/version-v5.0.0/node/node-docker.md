---
id: node-docker
title: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { ReCounter2nd } from '@site/src/components/Counter';

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

## Configure hoprd command

The default command provided below is incomplete and requires manual adjustments. Follow the steps below to fill in each placeholder.

```bash
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
  europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:5.0.0-rc.1 \
  --init \
  --api \
  --announce \
  --identity /app/hoprd-db/hopr.id \
  --data /app/hoprd-db \
  --apiHost '0.0.0.0' \
  --apiToken '<YOUR_API_TOKEN>' \
  --password '<YOUR_IDENTITY_PASSWORD>' \
  --safeAddress '<SAFE_ADDRESS>' \
  --moduleAddress '<MODULE_ADDRESS>' \
  --host '<YOUR_PUBLIC_IP>:9091' \
  --configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'
```

Below is a quick reference of all the `hoprd` CLI flags you’ll need to adjust:

| Flag                                                        | Description                              |
| ----------------------------------------------------------- | ---------------------------------------- |
| `--apiToken '<YOUR_API_TOKEN>'`                             | Your Admin UI API token                  |
| `--password '<YOUR_IDENTITY_PASSWORD>'`                           | The password you set when creating your node identity (step 2.3). You need it to restore your node. |
| `--safeAddress '<SAFE_ADDRESS>'`                     | Your staking Safe wallet address         |
| `--moduleAddress '<MODULE_ADDRESS>'`                        | Your staking Module contract address     |
| `--host '<YOUR_PUBLIC_IP>:9091'`                            | Your public libp2p endpoint (port 9091)  |
| `--configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'` | Path to your custom strategy YAML file   |


The following settings need to be adjusted in the current Docker command:

<ReCounter2nd>

1. **Adjust `apiToken` setting**

   1. Create a secret token. For guidance on creating a secure secret token, refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).
   
   2. Replace `<YOUR_API_TOKEN>` in your Docker command with your own secret token.

        **Example:**

        ```md
        --apiToken 'My#S3cur1ty#Token'
        ```

        :::note
        Make sure to make a note of the API token you created. You will need it to connect to your node via the HOPR Admin UI.
        :::

2. **Create your node identity, Safe and node module**

   :::tip Migrating from v3.0.x?
   If you came here from the [migration guide](./backup-restore-update.md), your identity file is already in `~/hoprd` and you already have your new Safe and node module addresses. Skip to **Step 3**. You can also skip **Step 5**, because your configuration file is already in `~/hoprd`.
   :::

   Do these steps on your own computer, not on your node server. The command in step 2.4 asks for a private key, so never run it on a server.

   1. Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.  
   
   2. Create a temporary folder called `hopr-identity` in your home directory.

      **Linux / macOS** (Terminal):

      ```bash
      mkdir -p ~/hopr-identity
      ```

      **Windows** (PowerShell):

      ```powershell
      New-Item -ItemType Directory -Force -Path "$HOME\hopr-identity"
      ```   

   3. Gather the values you need for node identity creation. You'll paste these into the command.
   
      | Placeholder | What it is | Where to find it |
      |---|---|---|
      | `<YOUR_IDENTITY_PASSWORD>` | The password that protects your node identity file | Create a strong passphrase (refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password)). |
      | `<NUMBER>` | How many node identities to create, one per node | Use `1` unless you run several nodes (see [Multiple nodes](./multiple-nodes.md)). |

      Create your node identity. The folder path is written differently on each system.
   
      Create node identity, you can create as much identities as you need, one identity per node. The folder path is written differently on each system.  

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

   4. Gather the values you need for Safe and node module creation. You'll paste these into the command.
   
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
      -e IDENTITY_PASSWORD=<YOUR_IDENTITY_PASSWORD> \
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
      -e IDENTITY_PASSWORD=<YOUR_IDENTITY_PASSWORD> `
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

         ```
         safe 0xAbC0000000000000000000000000000000000123
         node_module 0xDeF0000000000000000000000000000000000456
         ```
   
   5. Replace `<SAFE_ADDRESS>` and `<MODULE_ADDRESS>` in the Docker command above with the addresses of the Safe and node module you just created.
   
   6. Move the identity file you just created to the machine where you will run your HOPRd node.

      - Create a folder named `hoprd` on the machine where you will run your HOPRd node.
      - In the temporary `hopr-identity` folder, rename the identity file `hopr0.id` to `hopr.id`, then move it to the `hoprd` folder.
      - Once `hopr.id` is in the `hoprd` folder, keep a backup copy of it somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.

3. **Adjust `password` setting**

   Replace `<YOUR_IDENTITY_PASSWORD>` in the Docker command above with the password you set when you created your node identity in step 2.3.

   **Example:**

   ```bash
   --password 'rjVFCcqnTNJSh_8Z3P94@M2bep&Dk#UHX$agWf'

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

   1. Download the example file for Docker: [hoprd-docker.cfg.yaml](pathname:///files/hoprd-docker.cfg.yaml).
   
   2. Customize your strategy (see [Understanding node strategies](./manage-node-strategies.md?config=docker#understanding-node-strategies)).
   
   3. Place the `hoprd-docker.cfg.yaml` file inside your `~/hoprd` folder.

</ReCounter2nd>

---

## Fund your Safe wallet

Send at least `1 wxHOPR` to your Safe wallet: the `safe` address from step 2.4, or your new Safe from the migration guide if you are migrating from v3.0.x. Your node uses it to pay the fee for announcing itself on the network when it starts.

---

## Start Your Node

Once you have [configured your Docker command](node-docker.md#configure-hoprd-command) correctly, you can start your node using the adjusted Docker command.

1. Open your terminal.

2. Verify that Docker is running (on macOS, start Docker Desktop first):

    ```bash
    docker --version
    ```

3. Paste your configured HOPRd command into the terminal and execute it.

4. Fund your node with xDai. When the node starts, it shows its address and waits until it has xDai. To find the address, run:

    ```bash
    docker logs -t hoprd | grep "blockchain_address"
    ```

    The value of `blockchain_address` is your node address. Send at least `0.01 xDai` to it. The node checks its balance regularly and finishes starting once the funds arrive.

5. Check the logs to confirm the node started:

    ```bash
    docker logs -f hoprd
    ```

    Look for `node announced successfully` or `node already announced on chain`. Press `Ctrl+C` to stop following the logs. The node keeps running.

---

**Congratulations!** Your node should now be fully operational. To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).