---
id: node-dappnode
title: Dappnode
---

## Create your node identity, Safe and node module

:::tip Migrating from v3.0.x?
If you came here from the [migration guide](./backup-restore-update.md), you already have your identity file and your new Safe and node module addresses. Skip to [Install the HOPR Package](#install-the-hopr-package).
:::

Run these steps on any computer with Docker Desktop, not on your Dappnode. The command in step 1.4 asks for a private key.

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
   | `<NUMBER>` | How many node identities to create | Use `1`. A Dappnode runs one HOPR node. |

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
   
   The command creates the identity file `hopr0.id` in the `hopr-identity` folder.

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

   Write down the `safe` and `node_module` addresses. You will enter them in the setup wizard.

6. **Keep your identity file and password**

   Keep the `hopr0.id` file and its password. You will upload the file to your Dappnode after installing the package.

---

## Install the HOPR package {#install-the-hopr-package}

1. **Connect to your Dappnode**

   Connect to your Dappnode:

   - [Via your local network](https://docs.dappnode.io/docs/user/access-your-dappnode/wifi)
   - [Remotely using Dappnode VPN](https://docs.dappnode.io/docs/user/access-your-dappnode/vpn/overview). 
     You’ll need to port forward port `51820` on your router to access your Dappnode from anywhere. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

2. **Open the DAppStore**

   Open the **DAppStore** from the sidebar.

3. **Search for HOPR**

   Use the DAppStore search bar to find `HOPR`.

   ![DAppStore Search Bar](/img/node/Search-HOPR-Dappstore.png)

4. **Open the package details**

   Click **GET** on the HOPR package to open the package details.

5. **Start the setup wizard**

   Click **INSTALL** to start the setup wizard.

   ![Install HOPR](/img/node/dappnode-hopr-package-view.png)

   :::tip
   Already have HOPR installed? Click **UPDATE** instead.
   :::

---

## Complete the setup wizard

Fill in the fields of the setup wizard:

1. **Identity file password**  

   In the **Identity file password** field, enter the password you set when you created your node identity.

   Make sure to write down this password, as you will need it if you ever need to restore your node in the future.

2. **REST API Token**  

   In the **REST API Token** field, enter the **secret token**, which will be used to securely connect to your node.  
   This ensures that unauthorized users on the same network cannot access your node.

   For guidance on creating a secret token, please refer to this [guide](./frequently-asked-questions.md#how-do-i-create-a-secure-password-for-the-secret-token-and-database-password).

3. **Staking Safe Address**  

   In the **Staking safe address** field, enter the `safe` address you created.

4. **Staking Module Address**  

   In the **Staking safe module address** field, enter the `node_module` address you created.

5. **Public Host IP and Port**  

   In the **Public host IP and port** field, enter your public IP suffixed with the port `:9091`.

   - Locate your external IP address by referring to our [FAQ here](./frequently-asked-questions.md#how-to-find-the-external-ip-address).
   - Refer to the [FAQ guide](./frequently-asked-questions#what-are-the-requirements-for-an-ip-address-to-run-a-hoprd-node) to determine if your IP address meets the requirements.
   - Expose port `9091` (TCP and UDP) to the public so that other nodes on the HOPR network can connect to your node. For instructions, see our [port forwarding guide](port-forwarding.md#how-to-configure-port-forwarding).

6. **Submit to install package**  

   Click **Submit**. On the next screen, accept the disclaimer, and your HOPR package should start installing immediately.

   ![dappnode setup wizard](/img/node/dappnode-hopr-package-install-phase.jpg)

---

## Upload your identity file

The HOPR package creates its own identity file when it is installed. Replace it with the identity file you created, so your node uses the identity that is linked to your Safe.

1. **Stop the HOPR package**

   Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

2. **Rename the identity file**

   On your computer, rename `hopr0.id` in the `hopr-identity` folder to `hopr.id`.

3. **Upload the identity file**

   Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager). Under the `Upload file` section:

   - In the **Choose file** field, click `Browse` and select the `hopr.id` file.
   - In the **Defaults to $WORKDIR/** field, enter:

      ```text
      /app/hoprd/conf/
      ```

   Click `Upload`.

4. **Back up the identity file**

   Keep a backup of `hopr.id` somewhere safe, then delete the temporary `hopr-identity` folder.

---

## Fund your Safe wallet

:::tip Migrating from v3.0.x?
Skip step 1. You moved your wxHOPR to your new Safe in the migration guide.
:::

1. Send at least `1 wxHOPR` to your Safe wallet (the `safe` address you created). Your node uses it to pay the fee for announcing itself on the network when it starts.

2. Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` icon to start the HOPR package.

---

## Fund your node with xDai

When the HOPR package starts, the node shows its address and waits until it has xDai.

1. **Find your node address**

   Go to the [HOPR package logs page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs) and search for `blockchain_address`. Its value, starting with `0x`, is your node address.

2. **Send xDai to your node**

   Send at least `0.01 xDai` to your node address. The node checks its balance regularly and finishes starting once the funds arrive.

3. **Check that your node started**

   On the same logs page, search for `announced`. When you see `node announced successfully` or `node already announced on chain`, your node is running on the network.

:::note
Until both the Safe and the node are funded, the node may stop and restart a few times. This is expected and stops once the funds arrive.
:::

---

:::tip Your node is running
To verify that it's working properly, follow [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).
:::

If you are migrating from v3.0.x, go back to the migration guide and continue with [Verify and clean up](./backup-restore-update.md#verify-and-clean-up).