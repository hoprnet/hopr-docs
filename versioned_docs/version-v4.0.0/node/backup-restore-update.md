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
    /<computer username>/.hoprd-db-dufour/
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
    
    You will need the identity file `.hopr-id-dufour` and the corresponding database password.

2. **Restore the Identity File**

    Copy your backed-up `.hopr-id-dufour` file into the following folder:  
    ```
     /<computer username>/.hoprd-db-dufour/
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

4. **Restart the HOPR Package**

    Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.
 
</TabItem>
</Tabs>

---

## Update your node

Migrate your node from `v3.0.0` to `v4.0.0`

When migrating from , there's no need to re-sync your node manually — the re-syncing process is automated. Simply follow the steps below.

Please select your platform to update your HOPRd node:

<Tabs queryString="update_node">
<TabItem value="docker" label="Docker">

1. **Back Up Your Identity File**

    Follow the instructions in this [guide](./backup-restore-update?backup_identity=docker#backup-your-node-identity).

2. **Remove current running HOPRd container**

    1. Enter the following command in your terminal to check running docker containers:
        
        ```md
        docker ps
        ```

        This will show all running Docker containers. Look for the one labeled: `europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable`

    2. Write down HOPRd node container ID:
    
        **Example:**
        ```md
        8baa38408847
        ```

        ![Docker ps](/img/node/docker-ps-node-update.png)

    3. Remove the old container using (Replace `<Your_Node_Container_ID>` with writen down HOPRd node container ID): `docker rm -f <Your_Node_Container_ID>`

        **Example:**
        ```
        docker rm -f 8baa38408847
        ```
3. **Update Configuration & Start Node**

    The configuration file structure has changed in HOPRd v4. To replace your current configuration file, please follow [this guide](manage-node-configuration.md?config=docker#create-and-apply-configuration-file-to-your-node).

    (**Optional**) If you want to customise your node configuration file, please follow [this guide](./manage-node-strategies.md#understanding-node-strategies). 

4. **What's next?**

    After migrating from HOPRd v3 to HOPRd v4 verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v3-to-hoprd-v4-was-successful).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

1. **Back Up Your HOPRd node**

    1. Connect to your machine via ssh.
    
    2. Backup whole HOPRd node `compose` folder by executing this command:

    ```md 
    cp -r compose compose_backup
    ``` 

2. **Stop hoprd Services**

    Navigate to the `compose` folder and stop the `hoprd` services by running:
   
    ```md
    COMPOSE_PROFILES=hoprd docker compose down
    ```

3. **Update compose folder and complete configuration using previous version**

    The following command assumes your HOPRd node folder is named `compose`. It downloads the latest compose folder, merges its files with your current `compose` folder, and updates the new configuration file with required fields from the previous configuration file.

    Exit the `compose` folder and execute the following command:

    ```
    address=$(grep 'address: !IPv4' compose/hoprd/conf/hoprd.cfg.yaml | head -n 1 | awk '{print $3}') && port=$(grep -m 1 'port:' compose/hoprd/conf/hoprd.cfg.yaml | awk '{print $2}') && safe_address=$(grep 'safe_address:' compose/hoprd/conf/hoprd.cfg.yaml | awk '{print $2}' | tr -d '"') && module_address=$(grep 'module_address:' compose/hoprd/conf/hoprd.cfg.yaml | awk '{print $2}' | tr -d '"') && wget https://github.com/hoprnet/hoprd/archive/refs/heads/main.zip && unzip main.zip "hoprd-main/deploy/compose/*" -d extracted_files && cp -r extracted_files/hoprd-main/deploy/compose/* ./compose/ && rm -rf main.zip extracted_files && sed -i "s|IPv4: 127.0.0.1.*|IPv4: $address|" compose/hoprd/conf/hoprd.cfg.yaml && sed -i "s|port: 9091.*|port: $port|" compose/hoprd/conf/hoprd.cfg.yaml && sed -i "s|safe_address: \"0x00.*|safe_address: \"$safe_address\"|" compose/hoprd/conf/hoprd.cfg.yaml && sed -i "s|module_address: \"0x00.*|module_address: \"$module_address\"|" compose/hoprd/conf/hoprd.cfg.yaml
    ```

4. **Start hoprd Services**

    Navigate to `compose` folder and start `hoprd` services to start re-syncing process:

    ```
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

5. **What's next?**

    After migrating from HOPRd v3 to HOPRd v4, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v3-to-hoprd-v4-was-successful).

</TabItem>
<TabItem value="dappnode" label="Dappnode">

Select based on your HOPR Package Update Status:

<Tabs queryString="auto_update">
<TabItem value="manual" label="HOPR Package Not Updated">

1. **Back Up Your Identity File**

    1. Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

    2. In the `Download file` section, enter the following path and click `Download` to retrieve the identity file:
    
        ```md
        /app/hoprd/conf/hopr.id
        ```

        :::important
        If you're using a browser like Brave, the identity file may not download automatically. Click `Keep` in the browser's downloads section to confirm. Ensure the file is fully downloaded, or you risk losing your node identity.
        :::

    3. Retrieve your database password by going to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
        
        Under Identity file password, click the eye icon to unhide the database password and write it down.

        Default password:
        ```md
        "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
        ```
        (Including the double quotes)

    4. Store both the downloaded `hopr.id` file and your database password in a secure location for future recovery.

3. **Open the Dappstore**

    Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).

4. **Find and Select the HOPR Package**

    Search for the HOPR package, access its details, and click `UPDATE`.

5. **Submit the Update**

    During the update process, all data fields should be pre-filled. Click `Submit` to complete the HOPRd node update process.

6. **Update Configuration & Start Node**

    The configuration file structure has changed in HOPRd v4. To replace your current configuration file, please follow [this guide](manage-node-configuration.md?config=dappnode#create-and-apply-configuration-file-to-your-node).

7. **What's next?**

    After migrating from HOPRd v3 to HOPRd v4, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v3-to-hoprd-v4-was-successful).

</TabItem>
<TabItem value="auto" label="HOPR Package Auto-Updated">

1. **Back Up Your Identity File**

    1. Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

    2. In the `Download file` section, enter the following path and click `Download` to retrieve the identity file:
    
        ```md
        /app/hoprd/conf/hopr.id
        ```

        :::important
        If you're using a browser like Brave, the identity file may not download automatically. Click `Keep` in the browser's downloads section to confirm. Ensure the file is fully downloaded, or you risk losing your node identity.
        :::

    3. Retrieve your database password by going to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
        
        Under Identity file password, click the eye icon to unhide the database password and write it down.

        Default password:
        ```md
        "open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
        ```
        (Including the double quotes)

    4. Store both the downloaded `hopr.id` file and your database password in a secure location for future recovery.

2. **Update Configuration & Start Node**

    The configuration file structure has changed in HOPRd v4. To replace your current configuration file, please follow [this guide](manage-node-configuration.md?config=dappnode#create-and-apply-configuration-file-to-your-node).

3. **What's next?**

    After migrating from HOPRd v3 to HOPRd v4, verify that your migration was successful by following [this guide](troubleshooting.md#how-to-check-if-the-migration-from-hoprd-v3-to-hoprd-v4-was-successful).

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

    Replace `<Your_Node_Container_ID>` with your actual container ID:

    ```bash
    docker rm -f <Your_Node_Container_ID>
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