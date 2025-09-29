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

    The identity file `.hopr-id-dufour` is located at:  
    ```
    /<computer username>/hoprd/
    ```

2. **Write Down Your Database Password**

    The password is set using the `--password` flag in the HOPRd Docker command.

    Default password: 
    ```
    open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0
    ```

3. **Store Your Backup Safely**

    Save both the `.hopr-id-dufour` file and your password in a secure location.

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

The identity file is automatically created and stored on the DappNode machine.

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
    
    You will need the identity file `.hopr-id-dufour` and the corresponding database password.

2. **Restore the Identity File**

    Copy your backed-up `.hopr-id-dufour` file into the following folder:  
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

1. **Enable Viewing Hidden Files**

    - **For Windows:**  
        Open the File Manager app, and under `View → Show`, ensure that hidden files is checked.

        ![Hidden Files](/img/node/Hidden_files_windows.png)

    - **For Mac:**  
        With the Finder app open, press the key combination:  
        `Command + Shift + . (Dot)`  
        You will need to repeat this whenever you upload the identity file.

2. **Ensure You Have a Backup**

    Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update?backup_identity=dappnode#backup-your-node-identity). You will need the identity file `hopr.id` and the corresponding database password.

3. **Pause the HOPR Package**

    Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

4. **Upload the Identity File**

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

## Update your node

When migrating from `v2.2.x` to `v3.0.0`, there's no need to re-sync your node manually — the re-syncing process is automated. Simply follow the steps below.

Please select your platform to update your HOPRd node:

<Tabs queryString="update_node">
<TabItem value="docker" label="Docker">

1. **Redeem manually tickets and close incoming channels**

    :::info
    Before redeeming tickets, note that the `minimum_redeem_ticket_value` configuration setting determines the minimum channel balance. If the balance falls below this value, it represents the amount of HOPR tokens you’re willing to lose. You can always lower this amount before redeeming all tickets.
    :::

    1. Connect to your node via the `Admin UI`, navigate to the `Tickets` page, and click the **Redeem All Tickets** icon. Wait until the **unredeemed tickets** value decreases and approaches 0.

    2. Navigate to the `CHANNELS: IN` page and close all incoming channels by clicking the **Close Incoming Channel** button next to each channel.

2. **Back Up Your Identity File**

    Follow the instructions in this [guide](./backup-restore-update?backup_identity=docker#backup-your-node-identity).

3. **Remove current running HOPRd container**

    1. Enter the following command in your terminal to check running docker containers:
        
        ```
        docker ps
        ```

        This will show all running Docker containers. Look for the one labeled: `europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable`

    2. Write down HOPRd node container ID:
    
        **Example:**
        ```
        8baa38408847
        ```

        ![Docker ps](/img/node/docker-ps-node-update.png)

    3. Remove the old container using (Replace `<Your_Container_ID>` with writen down HOPRd node container ID): `docker rm -f <Your_Container_ID>`

        **Example:**
        ```
        docker rm -f 8baa38408847
        ```
3. **Remove Database Files**

    1. Navigate to your HOPRd node folder, which is named `.hoprd-db-dufour` by default.

    2. Execute the following command to delete all database files:

        ```
        rm -rf db && rm -f tbf
        ```

4. **Update Your Configuration File**

    Ensure your configuration file is up to date. To replace your current configuration file with a new one, follow [this guide](manage-node-configuration.md#create-and-apply-configuration-file-to-your-node).

5. **Enable Fast Sync (Optional)**

    Fast Sync significantly accelerates node synchronization. This process can take anywhere from 10 to 20 minutes, depending on your hardware specifications. To enable fast sync, follow [this guide](./fast-sync.md).

6. **Start Your Node**

    To start your node, use the command you previously executed or refer to the [Docker command](node-docker.md#configure-hoprd-command).

7. **What's next?**

    After migrating from HOPRd v2 to HOPRd v3, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v2-to-hoprd-v3-was-successful).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Redeem manually tickets and close incoming channels**

    :::info
    Before redeeming tickets, note that the `minimum_redeem_ticket_value` configuration setting determines the minimum channel balance. If the balance falls below this value, it represents the amount of HOPR tokens you’re willing to lose. You can always lower this amount before redeeming all tickets.
    :::

    1. Connect to your node via the `Admin UI`, navigate to the `Tickets` page, and click the **Redeem All Tickets** icon. Wait until the **unredeemed tickets** value decreases and approaches 0.

    2. Navigate to the `CHANNELS: IN` page and close all incoming channels by clicking the **Close Incoming Channel** button next to each channel.

2. **Back Up Your HOPRd node**

    1. Connect to your machine via ssh.
    
    2. Backup whole HOPRd node `compose` folder by executing this command:

        ``` 
        cp -r compose compose_backup
        ``` 

3. **Stop hoprd Services**

    Navigate to the `compose` folder and stop the `hoprd` services by running:
   
    ```
    COMPOSE_PROFILES=hoprd docker compose down
    ```

4. **Update compose folder and complete configuration using previous version**

    The following command assumes your HOPRd node folder is named `compose`. It downloads the latest compose folder, merges its files with your current `compose` folder, and updates the new configuration file with required fields from the previous configuration file.

    Exit the `compose` folder and execute the following command:

    ```
    wget https://github.com/hoprnet/hoprnet/archive/refs/heads/release/kaunas.zip && unzip kaunas.zip "hoprnet-release-kaunas/deploy/compose/*" -d extracted_files && rsync -a --remove-source-files extracted_files/hoprnet-release-kaunas/deploy/compose/ ./compose/ && rm -rf extracted_files/hoprnet-release-kaunas/deploy/compose && rm -rf kaunas.zip extracted_files && address=$(yq e '.hopr.host.address' compose/hoprd_data/hoprd.cfg.yaml | sed 's/!IPv4 //') && port=$(yq e '.hopr.host.port' compose/hoprd_data/hoprd.cfg.yaml) && safe_address=$(yq e '.hopr.safe_module.safe_address' compose/hoprd_data/hoprd.cfg.yaml) && module_address=$(yq e '.hopr.safe_module.module_address' compose/hoprd_data/hoprd.cfg.yaml) && yq e -i '.hopr.host.address = "!IPv4 '"$address"'"' compose/hoprd/conf/hoprd.cfg.yaml && yq e -i '.hopr.host.port = '"$port"'' compose/hoprd/conf/hoprd.cfg.yaml && yq e -i '.hopr.safe_module.safe_address = "'"$safe_address"'"' compose/hoprd/conf/hoprd.cfg.yaml && yq e -i '.hopr.safe_module.module_address = "'"$module_address"'"' compose/hoprd/conf/hoprd.cfg.yaml
    ```

5. **Enable automatic Fast Sync (Optional)**

    Fast Sync significantly speeds up node synchronization, taking 10–20 minutes depending on hardware. Due to the HOPRd v2 to v3 migration, Fast Sync requires the automatic method (see disclaimer in the guide below).
    
    To enable automatic Fast Sync, follow [this guide](fast-sync.md?fast_sync_method=automatic).

6. **Start hoprd Services**

    Navigate to `compose` folder and start `hoprd` services to start re-syncing process:

    ```
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

7. **What's next?**

    After migrating from HOPRd v2 to HOPRd v3, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v2-to-hoprd-v3-was-successful).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

Select based on your HOPR Package Update Status:

<Tabs queryString="auto_update">
<TabItem value="manual" label="HOPR Package Not Updated">

1. **Back Up Your Identity File**

    1. Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

    2. In the `Download file` section, enter the following path and click `Download` to retrieve the identity file:
    
        ```
        /app/hoprd-db/.hopr-identity
        ```

        :::important
        If you're using a browser like Brave, the identity file may not download automatically. Click `Keep` in the browser's downloads section to confirm. Ensure the file is fully downloaded, or you risk losing your node identity.
        :::

    3. Retrieve your database password by going to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
        
        Under Identity file password, click the eye icon to unhide the database password and write it down.

        Default password:
        ```
        "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
        ```
        (Including the double quotes)

    4. Store both the downloaded `hopr-identity.tar` file and your database password in a secure location for future recovery.

2. **Open the Dappstore**

    Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).

3. **Find and Select the HOPR Package**

    Search for the HOPR package, access its details, and click `UPDATE`.

4. **Submit the Update**

    During the update process, all data fields should be pre-filled. Click `Submit` to complete the HOPRd node update process.

5. **Restore your node identity**

    1. **Enable Viewing Hidden Files**

        - **For Windows:**  
            Open the File Manager app, and under `View → Show`, ensure that hidden files is checked.

            ![Hidden Files](/img/node/Hidden_files_windows.png)

        - **For Mac:**  
            With the Finder app open, press the key combination:  
            `Command + Shift + . (Dot)`  
            You will need to repeat this whenever you upload the identity file.

    2. **Unarchive and rename identity file**

        Unarchive the recently backed-up `hopr-identity.tar` file to extract the hidden `.hopr-identity` file. Ensure your file explorer is set to display hidden files. Then, rename the `.hopr-identity` file to `hopr.id`.

    3. **Pause the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

    4. **Upload the Identity File**

        - Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

        - Under the `Upload file` section, fill in the following:

            - In the **Choose file** field, click `Browse` and select the `hopr.id` file.
            - In the **Defaults to $WORKDIR/** field, enter:

                ```
                /app/hoprd/conf/
                ```

        - Click the `Upload` button to upload the identity file.

    5. **Change configuration file path**

        - Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config), scroll to the bottom and click on `SHOW ADVANCED EDITOR`. 
        
        - Next to `HOPRD_CONFIGURATION_FILE_PATH` change value to `/app/hoprd/conf/hoprd.cfg.yaml` and click `Update`.

    6. **Restart the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.

5. **Enable automatic Fast Sync (Optional)**

    Fast Sync significantly speeds up node synchronization, taking 10–20 minutes depending on hardware. Due to the HOPRd v2 to v3 migration, Fast Sync requires the automatic method (see disclaimer in the guide below).
    
    To enable automatic Fast Sync, follow [this guide](fast-sync.md?fast_sync_method=automatic).

6. **What's next?**

    After migrating from HOPRd v2 to HOPRd v3, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v2-to-hoprd-v3-was-successful).

</TabItem>
<TabItem value="auto" label="HOPR Package Auto-Updated">

1. **Back Up Your Identity File**

    1. Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

    2. In the `Download file` section, enter the following path and click `Download` to retrieve the identity file:
    
        ```
        /app/hoprd-db/.hopr-identity
        ```

        :::important
        If you're using a browser like Brave, the identity file may not download automatically. Click `Keep` in the browser's downloads section to confirm. Ensure the file is fully downloaded, or you risk losing your node identity.
        :::

    3. Retrieve your database password by going to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
        
        Under Identity file password, click the eye icon to unhide the database password and write it down.

        Default password:
        ```
        "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
        ```
        (Including the double quotes)

    4. Store both the downloaded `hopr-identity.tar` file and your database password in a secure location for future recovery.

2. **Restore your node identity**

    1. **Enable Viewing Hidden Files**

        - **For Windows:**  
            Open the File Manager app, and under `View → Show`, ensure that hidden files is checked.

            ![Hidden Files](/img/node/Hidden_files_windows.png)

        - **For Mac:**  
            With the Finder app open, press the key combination:  
            `Command + Shift + . (Dot)`  
            You will need to repeat this whenever you upload the identity file.

    2. **Unarchive and rename identity file**

        Unarchive the recently backed-up `hopr-identity.tar` file to extract the hidden `.hopr-identity` file. Ensure your file explorer is set to display hidden files. Then, rename the `.hopr-identity` file to `hopr.id`.

    3. **Pause the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

    4. **Upload the Identity File**

        - Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

        - Under the `Upload file` section, fill in the following:

            - In the **Choose file** field, click `Browse` and select the `hopr.id` file.
            - In the **Defaults to $WORKDIR/** field, enter:

                ```
                /app/hoprd/conf/
                ```

        - Click the `Upload` button to upload the identity file.

    5. **Change configuration file path**

        - Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config), scroll to the bottom and click on `SHOW ADVANCED EDITOR`. 
        
        - Next to `HOPRD_CONFIGURATION_FILE_PATH` change value to `/app/hoprd/conf/hoprd.cfg.yaml` and click `Update`.

    6. **Restart the HOPR Package**

        Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.

3. **Enable automatic Fast Sync (Optional)**

    Fast Sync significantly speeds up node synchronization, taking 10–20 minutes depending on hardware. Due to the HOPRd v2 to v3 migration, Fast Sync requires the automatic method (see disclaimer in the guide below).
    
    To enable automatic Fast Sync, follow [this guide](fast-sync.md?fast_sync_method=automatic).

4. **What's next?**

    After migrating from HOPRd v2 to HOPRd v3, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v2-to-hoprd-v3-was-successful).

</TabItem>
</Tabs>


 
</TabItem>
</Tabs>

---

## Update your HOPR Admin UI

:::note
For Dappnode users, the HOPR Admin UI is bundled with the HOPR package and cannot be updated separately.
:::

Please select your platform to update the HOPR Admin UI:

<Tabs queryString="update_admin">
<TabItem value="docker" label="Docker">

1. **List Running Docker Containers**

    Run the following command in your terminal:

    ```bash
    docker ps
    ```

    Look for the container using the image:

    ```
    europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable
    ```

    Note the container ID listed in your terminal.

    ![Docker container list showing hopr-admin image](/img/node/docker-ps-admin-ui-update.png)

2. **Remove the Admin UI Container**

    Replace `<Your_Container_ID>` with your actual container ID:

    ```bash
    docker rm -f <Your_Container_ID>
    ```

    **Example:**

    ```bash
    docker rm -f 0a74437b27f8
    ```

3. **Reinstall the Latest Admin UI**

    Retrieve and run the [latest Admin UI installation command](./node-management-admin-ui.md#installing-hopr-admin-ui) in your terminal.

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Navigate to Your Compose Directory**

    Locate and open the `compose` folder (assuming you haven't renamed it).

2. **Stop the Admin UI Services**

    Use the following command:

    ```bash
    COMPOSE_PROFILES=admin-ui docker compose down
    ```

3. **Restart the Admin UI Services**

    To restart and apply the update:

    ```bash
    COMPOSE_PROFILES=admin-ui docker compose up -d
    ```

</TabItem>
</Tabs>

</NoCounter>