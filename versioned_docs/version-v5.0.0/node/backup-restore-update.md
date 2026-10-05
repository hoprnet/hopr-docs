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

2. **Write Down Your Database Password**

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

    Back up the identity file `hopr.id`, which you will find at the following path:  
    ```
    /<computer username>/compose/hoprd/conf/
    ```

2. **Note Down Your Database Password**

    In the `compose` folder, open the secrets environment file `.env-secrets` and locate the database password stored under the variable: `HOPRD_PASSWORD`

3. **Store Your Backup Safely**

    Safely store both the `hopr.id` file and your database password in a secure location in case you need to restore your node in the future.

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

3. **Retrieve Your Database Password**

    Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
    Under Identity file password, click the eye icon to unhide the database password and write it down.

    Default password:
    ```
    "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
    ```
    (Including the double quotes)

4. **Store Your Backup Safely**

    Store both the downloaded `hopr.id` file and your database password in a secure location for future recovery.

</TabItem>
</Tabs>

---

## Restore your node identity

Please select platform to restore your node identity:

<Tabs queryString="restore_identity">
<TabItem value="docker" label="Docker">

1. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=docker#backup-your-node-identity).  
    
    You will need the identity file `hopr.id` and the corresponding database password.

2. **Restore the Identity File**

    Copy your backed-up `hopr.id` file into the following folder:  
    ```
    /hoprd/
    ```

3. **Set the Password Flag**

    Update the `--password` tag in your Docker command to match the database password used for your previous node. Default password: `open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0`

4. **Configure Your Docker Command**

    Configure the Docker command with the required information, just as you did when initially setting up a new node.  

    For more details, see [this section](node-docker.md#configure-hoprd-command).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=docker-compose#backup-your-node-identity).  
    
    You will need the identity file `hopr.id` and the corresponding database password.

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

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=dappnode#backup-your-node-identity). You will need the identity file `hopr.id` and the corresponding database password.

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

:::tip
If you run several nodes under one Safe, for example a Dappnode and a Docker node, create the new Safe and node module only once, with all your node addresses. Then use the same new addresses for every node.
:::

Please select your platform to update your HOPRd node:

<Tabs queryString="update_node">
<TabItem value="docker" label="Docker">

1. **Manually redeem tickets and close incoming channels**

    :::info
    Your node only redeems tickets worth at least `minimum_redeem_ticket_value`. Any ticket you don't redeem before closing your channels is lost. You can always lower this value before redeeming all tickets.
    :::

    1. Connect to your node via the Admin UI, open the **TICKETS** page, and click the **Redeem All Tickets** icon. Wait until the **Unredeemed tickets** value drops to 0 or close to it.

    2. Open the **CHANNELS: IN** page and close all incoming channels by clicking the **Close Incoming Channel** button next to each channel.

2. **Back up your identity file and write down your identity password**

    Follow the instructions in this [guide](./backup-restore-update?backup_identity=docker#backup-your-node-identity).

3. **Remove the running HOPRd container**

    ```bash
    docker rm -f hoprd
    ```

    :::note
    If you gave your container a different name, find it with `docker ps` (look for the `hoprd:stable` image) and use that name or its container ID instead.
    :::

4. **Set up the new node folder**

    :::warning
    This permanently deletes your old node folder, including your old identity file. Make sure you have completed the identity backup before you continue.
    :::

    ```bash
    rm -rf ~/.hoprd-db-dufour
    mkdir -p ~/hoprd
    curl -o ~/hoprd/hoprd.cfg.yaml https://docs.hoprnet.org/files/hoprd.cfg.yaml
    ```

    - Then copy your backed-up `hopr.id` into `~/hoprd`.

    (Optional) To adjust the configuration file, see [Understanding Node Strategies](./manage-node-strategies.md#understanding-node-strategies).

5. **Migrate node from Dufour to Piz Palu network**

    Do this step on your own computer, not on your node server. The command asks for a private key, so never run it on a server.

    1. Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.  

    2. Gather the values you need. You'll paste these into the command in the next step:

        | Placeholder | What it is | Where to find it |
        |---|---|---|
        | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
        | `<SAFE_OWNER>` | The address of the wallet that owns your current Safe. It will also own the new Safe. | Your wallet app, for example MetaMask. |
        | `<NODE1,NODE2,NODE3>` | The addresses of the nodes you ran on v3.0.x, separated by commas with no spaces | The [Staking Hub](https://hub.hoprnet.org/staking/dashboard#node) or the [Admin UI](node-management-admin-ui.md#access-the-hopr-admin-ui). |

    3. This command creates a new Safe and node module, and adds the nodes you ran on v3.0.x to them.

        :::important
        Before you run the command, create a new **burner wallet** (a fresh wallet with no other funds) and send it `0.02 xDai`. The command asks for this wallet's private key and uses it only to pay the transaction fees. Your new Safe is owned by your `<SAFE_OWNER>` wallet, not the burner wallet, so you never need to paste your Safe owner's private key.
        :::
    
        - Replace every value in `<...>` with your own from the previous step and keep the quotes. Then run the command for your system. Only the line-continuation character differs.

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
        - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in the next step. Example:

            ```
            safe 0xAbC0000000000000000000000000000000000123
            node_module 0xDeF0000000000000000000000000000000000456
            ```

6. **Start your node**

    Start your node with the [Docker command](node-docker.md#configure-hoprd-command). Use these values:

    - `--safeAddress`: the **new safe address** from the previous step. Do not use your old safe address, or the node will not work on the Piz Palu network.
    - `--moduleAddress`: the **new node module address** from the previous step. Do not use your old module address, or the node will not work on the Piz Palu network.
    - `--password`: the same password you used on v3.0.x release.

    The command already uses your new `hoprd` folder and the identity file you copied in step 4. Fill in the remaining `<...>` values as described in the guide, then run it.

7. **Move your funds to the new Safe**

    :::important
    Before moving funds, make sure you own the new Safe. Go to [Safe\{Wallet\}](https://app.safe.global), connect your Safe owner wallet on **Gnosis Chain**, and check that the new `safe` address from step 4 appears in your list of Safes. If it isn't there, don't move any funds. Instead, check that you used the right `<SAFE_OWNER>` address in step 5.
    :::

    1. Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking), connect your Safe owner wallet, and withdraw your `wxHOPR` from your old Safe to the new `safe` address from step 4. Your node needs at least **1 wxHOPR** to start, which covers the fee for announcing it on the network.

    2. Make sure your node has at least `0.01` xDai. Your node address stays the same, so any xDai it already has carries over.

8. **What's next?**

    After migrating from HOPRd v3.0.x to HOPRd v5.0.0, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Manually redeem tickets and close incoming channels**

    :::info
    Your node only redeems tickets worth at least `minimum_redeem_ticket_value`. Any ticket you don't redeem before closing your channels is lost. You can always lower this value before redeeming all tickets.
    :::

    1. Connect to your node via the Admin UI, open the **TICKETS** page, and click the **Redeem All Tickets** icon. Wait until the **Unredeemed tickets** value drops to 0 or close to it.

    2. Open the **CHANNELS: IN** page and close all incoming channels by clicking the **Close Incoming Channel** button next to each channel.

2. **Stop hoprd Services**

    1. Connect to your node machine via ssh.

    2. Navigate to the `compose` folder and stop the `hoprd` services by running:

        ```bash
        COMPOSE_PROFILES=hoprd docker compose down
        ```
3. **Back up your node files**

    Go back to the folder that contains `compose` and rename it.

    ```bash
    cd ..
    mv compose compose_backup
    ```

    - `.env-secrets`: your identity password (`HOPRD_PASSWORD`) and API token (`HOPRD_API_TOKEN`)
    - `hoprd/conf/hoprd.cfg.yaml`: your configuration (public IP, port)
    - `hoprd/conf/hopr.id`: your identity file

    Also save a copy of `hopr.id` and your `HOPRD_PASSWORD` in a secure location off this machine.

4. **Migrate node from Dufour to Piz Palu network**

    Do this step on your own computer, not on your node server. The command asks for a private key, so never run it on a server.

    1. Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.  

    2. Gather the values you need. You'll paste these into the command in the next step:

        | Placeholder | What it is | Where to find it |
        |---|---|---|
        | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
        | `<SAFE_OWNER>` | The address of the wallet that owns your current Safe. It will also own the new Safe. | Your wallet app, for example MetaMask. |
        | `<NODE1,NODE2,NODE3>` | The addresses of the nodes you ran on v3.0.x, separated by commas with no spaces | The [Staking Hub](https://hub.hoprnet.org/staking/dashboard#node) or the [Admin UI](node-management-admin-ui.md#access-the-hopr-admin-ui). |

    3. This command creates a new Safe and node module, and adds the nodes you ran on v3.0.x to them.

        :::important
        Before you run the command, create a new **burner wallet** (a fresh wallet with no other funds) and send it `0.02 xDai`. The command asks for this wallet's private key and uses it only to pay the transaction fees. Your new Safe is owned by your `<SAFE_OWNER>` wallet, not the burner wallet, so you never need to paste your Safe owner's private key.
        :::
    
        - Replace every value in `<...>` with your own from the previous step and keep the quotes. Then run the command for your system. Only the line-continuation character differs.

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
        - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in the next step. Example:

            ```
            safe 0xAbC0000000000000000000000000000000000123
            node_module 0xDeF0000000000000000000000000000000000456
            ```

5. **Set up your node**

    On your node machine, follow the [Docker Compose guide](node-docker-compose.md) to set up your node. Use these values when you reach each step:

    - **Set up environment variables**: your previous ports, if you changed them (from `compose_backup/.env`).
    - **Set up secrets environment variables**:
        - `HOPRD_PASSWORD`: the same value as in `compose_backup/.env-secrets`. Your identity file is encrypted with this password, so the node can't start with a different one.
        - `HOPRD_API_TOKEN`: your previous token from `compose_backup/.env-secrets`, or a new one.
    - **Configure node strategies**: copy your previous public IP and port from `compose_backup/hoprd/conf/hoprd.cfg.yaml`, and set:
        - `safe_address`: the **new safe address** from the previous step. Do not use your old safe address, or the node will not work on the Piz Palu network.
        - `module_address`: the **new node module address** from the previous step. Do not use your old node module address, or the node will not work on the Piz Palu network.
    - **Manage the identity file**: copy your backed-up `hopr.id` into `compose/hoprd/conf`. If you have multiple nodes, each node's `compose/hoprd/conf` folder needs its own identity file, named `hopr.id`.

6. **Move your funds to the new Safe**

    :::important
    Before moving funds, make sure you own the new Safe. Go to [Safe\{Wallet\}](https://app.safe.global), connect your Safe owner wallet on **Gnosis Chain**, and check that the new `safe` address from step 4 appears in your list of Safes. If it isn't there, don't move any funds. Instead, check that you used the right `<SAFE_OWNER>` address in step 4.
    :::

    1. Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking), connect your Safe owner wallet, and withdraw your `wxHOPR` from your old Safe to the new `safe` address from step 4. Your node needs at least **1 wxHOPR** to start, which covers the fee for announcing it on the network.

    2. Make sure your node has at least `0.01` xDai. Your node address stays the same, so any xDai it already has carries over.

7. **What's next?**

    After migrating from HOPRd v3.0.x to HOPRd v5.0.0, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

1. **Manually redeem tickets and close incoming channels**

    :::info
    Your node only redeems tickets worth at least `minimum_redeem_ticket_value`. Any ticket you don't redeem before closing your channels is lost. You can always lower this value before redeeming all tickets.
    :::

    1. Connect to your node via the `Admin UI`, navigate to the `Tickets` page, and click the **Redeem All Tickets** icon. Wait until the **unredeemed tickets** value decreases and approaches 0.

    2. Navigate to the `CHANNELS: IN` page and close all incoming channels by clicking the **Close Incoming Channel** button next to each channel.

2. **Back up your identity file and write down your identity password**

    Follow the instructions in this [guide](./backup-restore-update.md?backup_identity=dappnode#backup-your-node-identity). You will upload the `hopr.id` file again in step 6.

3. **Create your new Safe and node module**

    Do this step on your own computer, not on your Dappnode. The command asks for a private key, so never run it on your Dappnode.

    1. Download and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) on your computer.

    2. Gather the values you need. You'll paste these into the command in the next step:

        | Placeholder | What it is | Where to find it |
        |---|---|---|
        | `<YOUR_RPC_PROVIDER_URL>` | The URL of a Gnosis Chain RPC endpoint, used only for this migration. Your node doesn't need it. | See the [Custom RPC provider guide](./custom-rpc-provider.md). |
        | `<SAFE_OWNER>` | The address of the wallet that owns your current Safe. It will also own the new Safe. | Your wallet app, for example MetaMask. |
        | `<NODE_ADDRESS>` | The address of the node you ran on v3.0.x | The [Staking Hub](https://hub.hoprnet.org/staking/dashboard#node) or the [Admin UI](./node-management-admin-ui.md#access-the-hopr-admin-ui). |

    3. This command creates a new Safe and node module, and adds the node you ran on v3.0.x to them.

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
        --node-address <NODE_ADDRESS>
        ```

        **Windows** (PowerShell):

        ```powershell
        docker run --rm -it --pull always `
        europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopli:latest `
        safe-module create `
        --network piz-palu-prod `
        --provider-url <YOUR_RPC_PROVIDER_URL> `
        --admin-address <SAFE_OWNER> `
        --node-address <NODE_ADDRESS>
        ```

        - At the **Enter private key:** prompt, paste the private key of your **burner wallet** and press Enter. Nothing appears on screen while you paste, which is expected.
        - `hopli` sends the transactions. When it finishes, the last two lines show your new `safe` and `node_module` addresses. Write both down, because you need them in the next steps. Example:

            ```text
            safe 0xAbC0000000000000000000000000000000000123
            node_module 0xDeF0000000000000000000000000000000000456
            ```

4. **Move your funds to the new Safe**

    :::important
    Before moving funds, make sure you own the new Safe. Go to [Safe\{Wallet\}](https://app.safe.global), connect your Safe owner wallet on **Gnosis Chain**, and check that the new `safe` address from step 3 appears in your list of Safes. If it isn't there, don't move any funds. Instead, check that you used the right `<SAFE_OWNER>` address in step 3.
    :::

    1. Go to the [Staking Hub](https://hub.hoprnet.org/staking/dashboard#staking), connect your Safe owner wallet, and withdraw your `wxHOPR` from your old Safe to the new `safe` address from step 3. Your node needs at least **1 wxHOPR** to start, which covers the fee for announcing it on the network.

    2. Make sure your node has at least `0.01` xDai. Your node address stays the same, so any xDai it already has carries over.

5. **Update the Dappnode HOPR package**

    1. Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).
    2. Search for the HOPR package, access its details, and click `UPDATE`.
    3. The form is pre-filled with your current settings. Replace both addresses with the new ones from step 3:

        - **Staking safe address**: the new `safe` address.
        - **Staking safe module address**: the new `node_module` address.

        :::warning
        Do not skip this step. The pre-filled values are your old Dufour Safe and module, and the node will not work on the Piz Palu network with them. If you have already submitted the update, correct both fields on the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config) and click `Update`.
        :::

    4. Click `Submit` to complete the update.

6. **Restore your node identity**

    1. **Pause the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

    2. **Upload the Identity File**

        - Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

        - Under the `Upload file` section, fill in the following:

            - In the **Choose file** field, click `Browse` and select the `hopr.id` file.
            - In the **Defaults to $WORKDIR/** field, enter:

                ```text
                /app/hoprd/conf/
                ```

        - Click the `Upload` button to upload the identity file.

    3. **Update the configuration file**

        Follow this [guide](./manage-node-configuration.md?config=dappnode#create-and-apply-configuration-file-to-your-node) to update with the latest configuration file.

    4. **Restart the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.

7. **What's next?**

    After migrating from HOPRd v3.0.x to HOPRd v5.0.0, verify that your migration was successful by following [this guide](./troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v30x-to-hoprd-v500-was-successful).

</TabItem>
</Tabs>
</NoCounter>