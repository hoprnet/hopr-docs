---
id: backup-restore-update
title: Backup and Restore Your Node
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

The migration guide has its own page: [Migrate node from v3.0.x to v5.0.0](./migrate-node-from-v3.md).

</NoCounter>
