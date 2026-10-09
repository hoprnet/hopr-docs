---
id: node-docker-compose
title: Docker Compose
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Setting up a HOPR node with Docker Compose is intended for advanced users. It provides a sophisticated setup, allowing the use of a configuration file and node monitoring tools to enhance the node management experience.

---

## Install Docker, Docker Compose and unzip

Your node machine needs **Docker Engine**, the **Docker Compose** plugin, and the `curl` and `unzip` tools. Install them on the machine where you will run your node.

:::tip Already running a node with Docker Compose?
If you are migrating from v3.0.x, Docker and Docker Compose are already installed. Run the commands in the last step to check that `docker compose` and `unzip` work, then continue with [Create your node identity, Safe and node module](#create-your-node-identity-safe-and-node-module).
:::

<Tabs queryString="docker_os">
<TabItem value="linux" label="Linux">

1. **Install Docker Engine and Docker Compose**

   Follow the official guide for your distribution. Each guide installs Docker Engine together with the Docker Compose plugin (`docker-compose-plugin`).

   - [Install Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
   - [Install Docker on Debian](https://docs.docker.com/engine/install/debian/)
   - [Install Docker on Fedora](https://docs.docker.com/engine/install/fedora/)
   - [Install Docker on CentOS](https://docs.docker.com/engine/install/centos/)

2. **Install curl and unzip**

   **Ubuntu / Debian:**

   ```bash
   sudo apt-get update && sudo apt-get install -y curl unzip
   ```

   **Fedora / CentOS:**

   ```bash
   sudo dnf install -y curl unzip
   ```

3. **Allow your user to run Docker**

   The commands in this guide run `docker` without `sudo`. Add your user to the `docker` group:

   ```bash
   sudo usermod -aG docker $USER
   ```

   Log out and log back in (or reconnect via SSH) for the change to take effect. Members of the `docker` group have root-level access to the machine, so only add users you trust. If you prefer not to do this, add `sudo` in front of every `docker` command in this guide.

4. **Check the installation**

   Run these commands. Each one should print a version number:

   ```bash
   docker --version
   docker compose version
   unzip -v | head -1
   ```

   If `docker compose version` fails, the Docker Compose plugin is missing. The older `docker-compose` command (with a hyphen) is not used in this guide.

</TabItem>
<TabItem value="macos" label="macOS">

1. **Install Docker Desktop**

   Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/). It includes Docker Engine and Docker Compose. `curl` and `unzip` are already installed on macOS.

2. **Start Docker Desktop**

   Open Docker Desktop and wait until it shows that Docker is running.

3. **Check the installation**

   Open the **Terminal** app and run these commands. Each one should print a version number:

   ```bash
   docker --version
   docker compose version
   unzip -v | head -1
   ```

</TabItem>
</Tabs>

---

## Create your node identity, Safe and node module

:::tip Migrating from v3.0.x?
If you came here from the [migration guide](./backup-restore-update.md), you already have your identity file and your new Safe and node module addresses. Skip to [Download compose folder](#download-compose-folder).
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
   - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Example:

     ```text
     safe 0xAbC0000000000000000000000000000000000123
     node_module 0xDeF0000000000000000000000000000000000456
     ```

5. **Write down your Safe and node module addresses**

   Write down the `safe` and `node_module` addresses. You will enter them in [Configure your node](#configure-your-node).

6. **Keep your identity file and password**

   Keep the `hopr0.id` file and its password. You will copy the file to your node machine in [Manage the identity file](#manage-the-identity-file), and enter the password in [Set up secrets environment variables](#set-up-secrets-environment-variables).

---

## Download compose folder

Start by downloading the `compose` folder from the HOPR repository to the machine where you will run your node. Run the command in your home folder (or wherever you want the `compose` folder to live). It needs `curl` and `unzip` from [Install Docker, Docker Compose and unzip](#install-docker-docker-compose-and-unzip):

```bash
curl -fL -o v5.0.0-rc.2.zip https://github.com/hoprnet/hoprd/archive/refs/tags/v5.0.0-rc.2.zip && \
  unzip v5.0.0-rc.2.zip "hoprd-5.0.0-rc.2/deploy/compose/*" -d extracted_files && \
  mv extracted_files/hoprd-5.0.0-rc.2/deploy/compose . && \
  rm -rf v5.0.0-rc.2.zip extracted_files
```

---

## Set up environment variables

Inside the `compose` folder, rename `.env.sample` to `.env`:

```bash
mv .env.sample .env
```

Adjust the following environment variables in the `.env` file:

- `HOPRD_IMAGE`:  
  Sets the HOPRd Docker image. Change the tag at the end from `stable` to `5.0.0-rc.2`:  
  `europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:5.0.0-rc.2`

- `HOPRD_API_PORT`:  
  Sets the port on your machine that forwards to your node's REST API. Default is `3001`.  
  Inside the container, the API always listens on port `3001`.

- `HOPRD_P2P_PORT`:  
  Sets the peer-to-peer communication port. Default is `9091`.  
  If you plan to run your node behind NAT (e.g., at home or in an office), you must expose port `9091` to the public so other nodes can connect.  

  For help, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding). This port must remain open to allow external peer connections.

---

## Set up secrets environment variables

Inside the `compose` folder, rename `.env-secrets.sample` to `.env-secrets`:

```bash
mv .env-secrets.sample .env-secrets
```

Adjust the following secrets environment variables in the `.env-secrets` file:

- `HOPRD_PASSWORD`:  
  Enter the password you set when you created your node identity. If you are migrating, use the same password you used on v3.0.x. Make sure to write it down, as you will need it if you ever need to restore your node in the future.

- `HOPRD_API_TOKEN`:  
  Enter your own secret token. You need it to access your node's API. For guidance on how to create a secure token, see this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

---

## Configure your node

Inside the `compose` folder, navigate to the `hoprd/conf` subfolder and open the `hoprd.cfg.yaml` file. Set these values:

- `blokli_url`: change `https://blokli.prod.hoprnet.link` to `https://blokli.piz-palu.gnosisvpn.io`.
- `hopr.host.address.IPv4`: your public IP address (replace `127.0.0.1`).
- `hopr.host.port`: the value of `HOPRD_P2P_PORT` (default `9091`).
- `hopr.safe_module.safe_address`: the `safe` address you created.
- `hopr.safe_module.module_address`: the `node_module` address you created.

For details, see the [configuration guidelines](./manage-node-configuration?config=docker-compose) under the **Docker Compose** section.

---

## Manage the identity file

Copy your identity file into the `compose/hoprd/conf` folder on your node machine and rename it to `hopr.id`:

- **New node:** the `hopr0.id` file from the `hopr-identity` folder. After copying, keep a backup of `hopr.id` somewhere safe outside the node folder, then delete the temporary `hopr-identity` folder.
- **Migrating from v3.0.x:** your backed-up `hopr.id`.

---

## Fund your Safe wallet

:::tip Migrating from v3.0.x?
Skip this section. You moved your wxHOPR to your new Safe in the migration guide.
:::

Send at least `1 wxHOPR` to your Safe wallet: the `safe` address you created in [Create your node identity, Safe and node module](#create-your-node-identity-safe-and-node-module). Your node uses it to pay the fee for announcing itself on the network when it starts.

---

## Launch Docker Compose

Inside the `compose` folder, start your node with the `hoprd` profile:

```bash
COMPOSE_PROFILES=hoprd docker compose up -d
```

---

## Fund your node with xDai

When the node starts, it shows its address and waits until it has xDai.

1. **Find your node address**

    On the machine where you run your node, execute:

    ```bash
    docker logs hoprd 2>&1 | grep "blockchain_address"
    ```

    The value of `blockchain_address` is your node address.

2. **Send xDai to your node**

    Send at least `0.01 xDai` to your node address. The node checks its balance regularly and finishes starting once the funds arrive.

3. **Check that the node started**

    Check the logs:

    ```bash
    docker logs -f hoprd
    ```

    Look for `node announced successfully` or `node already announced on chain`. Press `Ctrl+C` to stop following the logs. The node keeps running.

:::note
Until both the Safe and the node are funded, the node may stop and restart a few times. This is expected and stops once the funds arrive.
:::

---

:::tip Your node is running
To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).
:::

If you are migrating from v3.0.x, go back to the migration guide and continue with [Verify and clean up](./backup-restore-update.md#verify-and-clean-up).