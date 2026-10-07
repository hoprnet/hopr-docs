---
id: backup-restore-update
title: Backup, Restore and Update Your Node
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

<NoCounter>

## Backup your node identity

Your identity password (called the database password in older guides) is the `--password` value in Docker, `HOPRD_PASSWORD` in Docker Compose, and **Identity file password** in Dappnode.

Please select a platform to backup your node identity:

<Tabs queryString="backup_identity">
<TabItem value="docker" label="Docker">

The identity file is automatically created and stored on your machine.

1. **Back Up Your Identity File**

    :::note
    These steps are for a v3.0.x node. On v5.0.0, your identity file is `~/hoprd/hopr.id`.
    :::

    The identity file `.hopr-id-dufour` is located at:  
    ```
    ~/.hoprd-db-dufour/.hopr-id-dufour
    ```

    :::note
    The folder and the file names start with a dot, so they're hidden. In Finder, press **Cmd + Shift + .** to show them. In a terminal, use `ls -a`.
    :::

2. **Write Down Your Identity Password**

    The password is set using the `--password` flag in the HOPRd Docker command.

    Default password: 
    ```
    open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0
    ```

3. **Copy, Rename and Store Your Backup Safely**

    - Copy the identity file out of the node folder and rename it to `hopr.id`.
    - Save both `hopr.id` and your password in a secure location, ideally also off this machine.

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

For Docker compose, the identity file is automatically created and stored on your machine.

1. **Back Up Your Identity File**

    Back up the identity file `hopr.id`. It is in `compose/hoprd/conf/hopr.id`, inside the folder where you downloaded `compose`.

2. **Note Down Your Identity Password**

    In the `compose` folder, open the secrets environment file `.env-secrets` and locate the identity password stored under the variable: `HOPRD_PASSWORD`

3. **Store Your Backup Safely**

    Safely store both the `hopr.id` file and your identity password in a secure location in case you need to restore your node in the future.

</TabItem>
<TabItem value="dappnode" label="Dappnode">

The identity file is automatically created and stored on the Dappnode machine.

1. **Access the File Manager**

    Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

2. **Download Your Identity File**

    In the Download file section, enter the following path and click Download:  
    ```
    /app/hoprd/conf/hopr.id
    ```

    :::important
    If you're using a browser like Brave, the identity file may not download automatically. Click **Keep** in the browser's downloads section to confirm. Ensure the file is fully downloaded, or you risk losing your node identity.
    :::

3. **Retrieve Your Identity Password**

    Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
    Under Identity file password, click the eye icon to unhide the identity password and write it down.

    Default password:
    ```
    "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
    ```
    (Including the double quotes)

4. **Store Your Backup Safely**

    Store both the downloaded `hopr.id` file and your identity password in a secure location for future recovery.

</TabItem>
</Tabs>

---

## Restore your node identity

Please select platform to restore your node identity:

<Tabs queryString="restore_identity">
<TabItem value="docker" label="Docker">

1. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=docker#backup-your-node-identity).  
    
    You will need the identity file `hopr.id` and the corresponding identity password.

2. **Restore the Identity File**

    Copy your backed-up `hopr.id` file into the following folder:  
    ```
    ~/hoprd/
    ```

3. **Set the identity password**

    Set `identity.password` in `~/hoprd/hoprd-docker.cfg.yaml` to the identity password used for your previous node. Default password: `open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0`

4. **Configure and start your node**

    Fill in the rest of the configuration file and start the node, just as you did when initially setting up a new node.  

    For more details, see [this section](node-docker.md#configure-hoprd-command).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=docker-compose#backup-your-node-identity).  
    
    You will need the identity file `hopr.id` and the corresponding identity password.

2. **Stop the hoprd Services**

    Navigate to the `compose` folder and stop the `hoprd` services by running the following command:
    ```
    COMPOSE_PROFILES=hoprd docker compose down
    ```

3. **Restore the Identity File**

    Inside the `compose` folder, copy your `hopr.id` file into:
    ```
    /hoprd/conf/
    ```

4. **Restart the hoprd Services**

    Return to the main `compose` folder and restart the `hoprd` services by running:
    ```
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=dappnode#backup-your-node-identity). You will need the identity file `hopr.id` and the corresponding identity password.

2. **Pause the HOPR Package**

    Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

3. **Upload the Identity File**

    1. Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

    2. Under the `Upload file` section, fill in the following:

        - In the **Choose file** field, click `Browse` and select the `hopr.id` file.
        - In the **Defaults to $WORKDIR/** field, enter:

            ```
            /app/hoprd/conf/
            ```

    3. Click the `Upload` button to upload the identity file.

5. **Restart the HOPR Package**

    Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.
 
</TabItem>
</Tabs>

---

## Migrate your node from v3.0.x to v5.0.0

:::info
Running a HOPRd node is supported on **Linux and macOS** only. Windows commands are included
in the Safe migration step because that step runs a one-off tool, not the node. You can run
it from a Windows computer, but the node itself must run on Linux or macOS.
:::

### What changes in v5.0.0 {#what-changes-in-v500}

| Stays the same | Changes | Is lost |
|---|---|---|
| Your identity file and identity password | You get a new Safe and node module on the `piz-palu-prod` network | Tickets you haven't redeemed and wxHOPR in outgoing channels you haven't closed when you stop your node |
| Your node address and the xDai on it | You move your wxHOPR from your old Safe to the new one | |
| | Your node no longer needs an RPC provider. You need an RPC URL only to create your new Safe. | |

The Dufour network stops two weeks after the v5.0.0 release. Redeem your tickets and close your outgoing channels before then. If you migrate later, you can still withdraw your wxHOPR from your old Safe in the Staking Hub. You can't go back to v3.0.x, so if a step fails, fix it and continue.

### Before you start {#before-you-start}

Have these ready before you shut down your node. Your node is offline from the moment you redeem its tickets until v5.0.0 announces itself.

- The wallet that owns your current Safe.
- A new burner wallet with `0.02 xDai`, and a Gnosis Chain RPC URL (see the [Custom RPC provider guide](./custom-rpc-provider.md)).
- Docker Desktop running on the computer where you will create your new Safe.

| Your situation | What to do |
|---|---|
| One node | Follow every step. Where the steps split into tabs, choose your setup. |
| Several nodes under one Safe, including Dappnode and Docker together | Create the new Safe once, with all node addresses. Do the tab steps once per node. |
| You're changing setup, for example from Docker to Docker Compose | Back up and stop your node with your current setup's tab. Start v5.0.0 with the new setup's tab. |
| The Dufour network has already stopped | In [Shut down your v3.0.x node](#shut-down-your-v3-node), skip step 1. Unredeemed tickets and the wxHOPR in your outgoing channels are lost. You can still withdraw the wxHOPR in your old Safe in the Staking Hub. |
| You lost your identity file or password | You can't migrate this node. See [Start over with a new node](#start-over-with-a-new-node). |
| Your node runs on Windows | v5.0.0 nodes run on Linux and macOS only. Move your node to a Linux or macOS machine. |

### Prepare your migration {#prepare-your-migration}

Your node keeps running during these steps.

1. **Note your node and Safe owner addresses**

    Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#node), connect your Safe owner wallet, and write down the address of every node you run under your Safe. Also write down the address of your Safe owner wallet. You need both in [Create your new Safe](#create-your-new-safe).

2. **Back up your identity file and identity password**

    Follow [Backup your node identity](#backup-your-node-identity) for your setup. Store the copy off this machine.

3. **Docker only: save your current settings**

    Save the settings of your current container. You reuse the `--apiToken` and `--host` values in your v5.0.0 configuration file:

    ```bash
    docker inspect --format '{{join .Args " "}}' hoprd
    ```

    The output includes your password and API token in plain text. Don't share it. If you gave your container a different name, use that name instead of `hoprd`.

### Shut down your v3.0.x node {#shut-down-your-v3-node}

1. **Redeem your tickets and close your outgoing channels**

    Do this in the v3.0.x Admin UI while your node is still running. Tickets you don't redeem and wxHOPR left in outgoing channels are lost once you stop your node.

    1. Open the **TICKETS** page and click the **Redeem All Tickets** icon. Wait until **Unredeemed tickets** stops going down. Tickets worth less than `minimum_redeem_ticket_value` (default `1 wxHOPR`) aren't redeemed and stay in the count.
    2. Open the **CHANNELS: OUT** page and click the **CLOSE outgoing channel** icon next to each channel. Each channel changes to pending closure.
    3. Wait 5 minutes, then click **CLOSE outgoing channel** again next to each channel to finalize the closure. If your configuration file has the `!ClosureFinalizer` strategy, your node does this for you.
    4. Check that no channel on the **CHANNELS: OUT** page is still open or pending closure. Don't stop your node until this is true. The wxHOPR from these channels is now back in your old Safe. You move it to your new Safe in [Create your new Safe](#create-your-new-safe).

2. **Stop your node**

    :::tip Several nodes on one machine?
    Repeat this step for each node, using its own container name and folders: for example `hoprd-2` and `~/.hoprd-db-dufour-2`, or the `HOPRd-node-2` folder for Docker Compose. See [Running multiple nodes](./multiple-nodes.md).
    :::

    <Tabs groupId="update_node" queryString>
    <TabItem value="docker" label="Docker">

    On your node machine, remove the running HOPRd container:

    ```bash
    docker rm -f hoprd
    ```

    :::note
    If you gave your container a different name, find it with `docker ps` (look for the `hoprd:stable` image) and use that name or its container ID instead.
    :::

    Leave your v3.0.x folder `~/.hoprd-db-dufour` in place. You delete it in [Verify and clean up](#verify-and-clean-up), after your v5.0.0 node is running.

    </TabItem>
    <TabItem value="docker-compose" label="Docker Compose">

    1. Connect to your node machine via ssh.

    2. Navigate to the `compose` folder and stop the `hoprd` services:

        ```bash
        COMPOSE_PROFILES=hoprd docker compose down
        ```

    3. Go back to the folder that contains `compose` and rename it, so you can download the new `compose` folder next to it:

        ```bash
        cd ..
        mv compose compose_backup
        ```

        The renamed `compose_backup` folder keeps these files, which you reuse when you start v5.0.0:

        - `.env`: your ports
        - `.env-secrets`: your identity password (`HOPRD_PASSWORD`) and API token (`HOPRD_API_TOKEN`)
        - `hoprd/conf/hoprd.cfg.yaml`: your configuration (public IP, port)
        - `hoprd/conf/hopr.id`: your identity file

    </TabItem>
    <TabItem value="dappnode" label="Dappnode">

    Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

    </TabItem>
    </Tabs>

### Create your new Safe {#create-your-new-safe}

Do this once, even if you run several nodes under one Safe.

1. **Create your new Safe and node module**

    Run this step on any computer with Docker Desktop. This can be your node machine if it is your own computer. Don't run it on a rented or shared server, because the command asks for a private key.

    1. Gather the values you need. You'll paste these into the command in the next step:

        | Placeholder | What it is | Where to find it |
        |---|---|---|
        | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint, used only for this migration. Your node doesn't need it. | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
        | `<SAFE_OWNER>` | The address of the wallet that owns your current Safe. It will also own the new Safe. | The address you wrote down in [Prepare your migration](#prepare-your-migration). |
        | `<NODE1,NODE2,NODE3>` | The addresses of the nodes you ran on v3.0.x, separated by commas with no spaces. For one node, enter one address. | The addresses you wrote down in [Prepare your migration](#prepare-your-migration). |

    2. This command creates a new Safe and node module, and adds the nodes you ran on v3.0.x to them.

        :::important
        Before you run the command, create a new **burner wallet** (a fresh wallet with no other funds) and send it `0.02 xDai`. The command asks for this wallet's private key and uses it only to pay the transaction fees. Your new Safe is owned by your `<SAFE_OWNER>` wallet, not the burner wallet, so you never need to paste your Safe owner's private key.
        :::

        - Replace every value in `<...>` with your own from the previous step. Then run the command for your system. Only the line-continuation character differs.

        **Linux / macOS** (Terminal):

        ```bash
        docker run --rm -it --pull always \
        europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest \
        safe-module create \
        --network piz-palu-prod \
        --provider-url <YOUR_RPC_PROVIDER_URL> \
        --admin-address <SAFE_OWNER> \
        --node-address <NODE1,NODE2,NODE3> \
        --allowance 15000000000000000000000
        ```

        **Windows** (PowerShell):

        ```powershell
        docker run --rm -it --pull always `
        europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
        safe-module create `
        --network piz-palu-prod `
        --provider-url <YOUR_RPC_PROVIDER_URL> `
        --admin-address <SAFE_OWNER> `
        --node-address <NODE1,NODE2,NODE3> `
        --allowance 15000000000000000000000
        ```

        - At the **Enter private key:** prompt, paste the private key of your **burner wallet** and press Enter. Nothing appears on screen while you paste, which is expected.
        - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in the next steps. Example:

            ```text
            safe 0xAbC0000000000000000000000000000000000123
            node_module 0xDeF0000000000000000000000000000000000456
            ```

2. **Check that you own the new Safe**

    Go to [Safe\{Wallet\}](https://app.safe.global), connect your Safe owner wallet on **Gnosis Chain**, and check that the new `safe` address appears in your list of Safes. If it doesn't, stop here and don't move any funds. Run the previous step again with the right `<SAFE_OWNER>` address. A Safe created with the wrong owner address doesn't affect your nodes.

3. **Move your funds to the new Safe**

    1. Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking), connect your Safe owner wallet, and withdraw your `wxHOPR` from your old Safe to the new `safe` address. Your node needs at least **1 wxHOPR** to start, which covers the fee for announcing it on the network.

    2. Make sure your node has at least `0.01` xDai. Your node address stays the same, so any xDai it already has carries over.

### Start your v5.0.0 node {#start-your-v5-node}

:::tip Several nodes on one machine?
Repeat this step for each node. Give each node its own folder (`~/hoprd`, `~/hoprd-2`, and so on), container name and ports, as described in [Running multiple nodes](./multiple-nodes.md).
:::

<Tabs groupId="update_node" queryString>
<TabItem value="docker" label="Docker">

1. **Set up the new node folder**

    On your node machine, run:

    ```bash
    mkdir -p ~/hoprd
    curl -o ~/hoprd/hoprd-docker.cfg.yaml https://docs.hoprnet.org/files/hoprd-docker.cfg.yaml
    ```

    - Then copy your backed-up `hopr.id` into `~/hoprd`.

    (**Optional**) To adjust the strategies, see [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

2. **Fill in the configuration file and start your node**

    Open `~/hoprd/hoprd-docker.cfg.yaml` and fill it in as described in [Configure your node](node-docker.md#configure-hoprd-command). Use these values:

    - `hopr.safe_module.safe_address`: the **new safe address** from [Create your new Safe](#create-your-new-safe). Do not use your old safe address, or the node will not work on the Piz Palu network.
    - `hopr.safe_module.module_address`: the **new node module address** from [Create your new Safe](#create-your-new-safe). Do not use your old module address, or the node will not work on the Piz Palu network.
    - `identity.password`: the same password you used on v3.0.x.
    - `api.auth.Token` and `hopr.host.address.IPv4`: the values you saved in [Prepare your migration](#prepare-your-migration). You can also choose a new API token.

    Then start your node with the [Docker command](node-docker.md#configure-hoprd-command) from step 3.4. It already uses your new `hoprd` folder and the identity file you copied in the previous step. Follow the logs as described in [Start Your Node](node-docker.md#start-your-node). When you see `node announced successfully` or `node already announced on chain`, come back here and continue with [Verify and clean up](#verify-and-clean-up).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

On your node machine, in the folder that contains `compose_backup`, follow the [Docker Compose guide](node-docker-compose.md) to set up your node. Use these values when you reach each section:

- **Set up environment variables**: your previous ports, if you changed them (from `compose_backup/.env`).
- **Set up secrets environment variables**:
    - `HOPRD_PASSWORD`: the same value as in `compose_backup/.env-secrets`. Your identity file is encrypted with this password, so the node can't start with a different one.
    - `HOPRD_API_TOKEN`: your previous token from `compose_backup/.env-secrets`, or a new one.
- **Configure your node**: copy your previous public IP and port from `compose_backup/hoprd/conf/hoprd.cfg.yaml`, and set:
    - `blokli_url`: change `https://blokli.prod.hoprnet.link` to `https://blokli-piz-palu.prod.hoprnet.link`.
    - `hopr.safe_module.safe_address`: the **new safe address** from [Create your new Safe](#create-your-new-safe). Do not use your old safe address, or the node will not work on the Piz Palu network.
    - `hopr.safe_module.module_address`: the **new node module address** from [Create your new Safe](#create-your-new-safe). Do not use your old node module address, or the node will not work on the Piz Palu network.
- **Manage the identity file**: copy your backed-up `hopr.id` into `compose/hoprd/conf`. If you have multiple nodes, each node's `compose/hoprd/conf` folder needs its own identity file, named `hopr.id`.
- **Fund your Safe wallet**: skip this section. You already moved your wxHOPR.

When the logs show `node announced successfully` or `node already announced on chain`, come back here and continue with [Verify and clean up](#verify-and-clean-up).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Update the Dappnode HOPR package**

    1. Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).
    2. Search for the HOPR package, access its details, and click `UPDATE`.
    3. The form is pre-filled with your current settings. Replace both addresses with the new ones from [Create your new Safe](#create-your-new-safe):

        - **Staking safe address**: the new `safe` address.
        - **Staking safe module address**: the new `node_module` address.

        :::warning
        Do not skip this step. The pre-filled values are your old Dufour Safe and module, and the node will not work on the Piz Palu network with them. If you have already submitted the update, correct both fields on the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config) and click `Update`.
        :::

    4. Click `Submit` to complete the update.

2. **Upload the v5.0.0 configuration file**

    The update keeps your identity file and your v3.0.x configuration file. Your node doesn't start until you replace the configuration file with the v5.0.0 one, so errors in the logs at this point are expected.

    1. Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon.
    2. Upload the v5.0.0 configuration file by following [this guide](./manage-node-configuration.md?config=dappnode#create-and-apply-configuration-file-to-your-node).
    3. Click the `Play` icon to start the HOPR package.

3. **Check that your node started**

    Go to the [HOPR package logs page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/logs) and search for `announced`. When you see `node announced successfully` or `node already announced on chain`, continue with [Verify and clean up](#verify-and-clean-up).

</TabItem>
</Tabs>

### Verify and clean up {#verify-and-clean-up}

1. **Verify your migration**

    Check that your node works on v5.0.0 by following [this guide](./troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).

2. **Delete your v3.0.x files**

    :::warning
    This permanently deletes your old node files, including the copy of your identity file on this machine. Keep the backup of `hopr.id` and your identity password that you stored off this machine.
    :::

    - **Docker**: on your node machine, run `rm -rf ~/.hoprd-db-dufour`.
    - **Docker Compose**: on your node machine, in the folder that contains `compose_backup`, run `rm -rf compose_backup`.
    - **Dappnode**: nothing to delete.

---

## Start over with a new node

If you lost your identity file or its password, you can't migrate your node. While your v3.0.x node is still running:

1. Redeem all tickets and close outgoing channels in the Admin UI.
2. Withdraw the xDai from your node to your own wallet in the Admin UI.
3. Withdraw your wxHOPR from your old Safe in the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking).

If your v3.0.x node is no longer running, the xDai on its address can't be recovered.

Then set up a new node with the guide for your setup: [Docker](./node-docker.md), [Docker Compose](./node-docker-compose.md) or [Dappnode](./node-dappnode.md).

</NoCounter>
