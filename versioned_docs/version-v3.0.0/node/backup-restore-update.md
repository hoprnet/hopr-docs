---
id: backup-restore-update
title: Backup, Restore and Update Your Node
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Backup your node identity

Please select a platform to backup your node identity:

<Tabs queryString="backup_identity">
<TabItem value="docker" label="Docker">

The identity file is automatically created and stored on your machine.

---

### 1. Back Up Your Identity File

The identity file `hopr.id` is located at:  
```
/<computer username>/hoprd/conf/
```

---

### 2. Write Down Your Database Password

The password is set using the `--password` flag in the HOPRd Docker command.

**Default password:**
```
open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0
```

---

### 3. Store Your Backup Safely

Save both the `hopr.id` file and your password in a secure location.

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

For Docker compose, the identity file is automatically created and stored on your machine.

---

### 1. Back Up Your Identity File

Back up the identity file `hopr.id`, which you will find at the following path:  
```
/<computer username>/compose/hoprd/conf/
```

### 2. Note Down Your Database Password

In the `compose` folder, open the secrets environment file `.env-secrets` and locate the database password stored under the variable:  
```
HOPRD_PASSWORD
```

### 3. Store Your Backup Safely

Safely store both the `hopr.id` file and your database password in a secure location in case you need to restore your node in the future.

</TabItem>
<TabItem value="dappnode" label="Dappnode">

The identity file is automatically created and stored on the DappNode machine.

---

### 1. Access the File Manager

Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

---

### 2. Download Your Identity File

In the Download file section, enter the following path and click Download:  
```
/app/hoprd/conf/hopr.id
```

**Important:**
If you're using a browser like Brave, the identity file may not download automatically.  
Click **Keep** in the browser's downloads section to confirm.  
Ensure the file is fully downloaded, or you risk losing your node identity.

---

### 3. Retrieve Your Database Password

Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config).  
Under Identity file password, click the eye icon to unhide the database password and write it down.

Default password:
```
"open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"
```
(Including the double quotes)

---

### 4. Store Your Backup Safely

Store both the downloaded `hopr.id` file and your database password in a secure location for future recovery.

</TabItem>

</Tabs>
---

## Restore your node identity

Please select platform to restore your node identity:

<Tabs queryString="restore_identity">
<TabItem value="docker" label="Docker">

### 1. Ensure You Have a Backup

Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update#backup-your-node-identity).  
You will need the identity file `hopr.id` and the corresponding database password.

---

### 2. Restore the Identity File

Copy your backed-up `hopr.id` file into the following folder:  
```
/hoprd/conf/
```

---

### 3. Set the Password Flag

Update the `--password` tag in your Docker command to match the database password used for your previous node.

---

### 4. Configure Your Docker Command

Configure the Docker command with the required information, just as you did when initially setting up a new node.  
For more details, see [this section](node-docker.md#2-configure-hoprd-command).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

### 1. Ensure You Have a Backup

Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update#backup-your-node-identity).  
You will need the identity file `hopr.id` and the corresponding database password.

---

### 2. Stop the hoprd Services

Navigate to the `compose` folder and stop the `hoprd` services by running the following command:
```
COMPOSE_PROFILES=hoprd docker compose down
```

---

### 3. Restore the Identity File

Inside the `compose` folder, copy your `hopr.id` file into:
```
/hoprd/conf/
```

---

### 4. Restart the hoprd Services

Return to the main `compose` folder and restart the `hoprd` services by running:
```
COMPOSE_PROFILES=hoprd docker compose up -d
```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

### 1. Enable Viewing Hidden Files

**For Windows**:  
Open the File Manager app, and under `View → Show`, ensure that hidden files is checked.

![Hidden Files](/img/node/Hidden_files_windows.png)

**For Mac**:  
With the Finder app open, press the key combination:  
`Command + Shift + . (Dot)`  
You will need to repeat this whenever you upload the identity file.

---

### 2. Ensure You Have a Backup

Before restoring your node identity, make sure you have already [backed up your HOPR node identity](./backup-restore-update#backup-your-node-identity).  
You will need the identity file `hopr.id` and the corresponding database password.

---

### 3. Pause the HOPR Package

Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Pause` icon to stop the HOPR package.

---

### 4. Upload the Identity File

Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

Under the `Upload file` section, fill in the following:

- In the **Choose file** field, click `Browse` and select the `hopr.id` file.
- In the **Defaults to $WORKDIR/** field, enter:
```
/app/hoprd/conf/
```

Click the `Upload` button to upload the identity file.

---

### 5. Restart the HOPR Package

Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the `Play` or `Restart` icon to start the HOPR package.
 
</TabItem>
</Tabs>

---

## Update your node

When migrating from `v2.2.x` to `v3.0.0`, there's no need to re-sync your node — the process is automated. Simply follow the steps below.

Please select your platform to update your HOPRd node:

<Tabs queryString="update_node">
<TabItem value="docker" label="Docker">

### 1. Back Up Your Identity File

Follow the instructions in this [guide](./backup-restore-update#backup-your-node-identity).

---

### 2. Check Your Running Docker Containers

Enter the following command in your terminal:
```
docker ps
```

This will show all running Docker containers. Look for the one labeled:
```
europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable
```

Note the container ID. For example:
```
8baa38408847
```

![Docker ps](/img/node/docker-ps-node-update.png)

---

### 3. Remove the Old Container

Remove the old container using:
```
docker rm -f <Your_Container_ID>
```

Example:
```
docker rm -f 8baa38408847
```

---

### 4. (Optional) Update HOPRd Node Folder Structure

Starting with HOPRd v3.0.0, we’ve introduced unified paths for the database, identity, and configuration files to improve consistency and maintainability.

Your existing paths will still work, but starting with version 3.0.0, we recommend updating to these new standards for long-term compatibility.

### Path Changes Overview

| Old Path | New Path | Description |
|----------|----------|-------------|
| `-v $HOME/.hoprd-db-dufour:/app/hoprd-db` | `-v $HOME/hoprd/:/app/data` | Mount path for the database directory |
| `--identity /app/hoprd-db/.hopr-id-dufour` | `--identity /app/conf/hopr.id` | Path to the identity file |
| `--configurationFilePath '/app/hoprd-db/hoprd-docker.cfg.yaml'` | `--configurationFilePath '/app/conf/hoprd.cfg.yaml'` | Path to the configuration file |

---

1. **Rename the Existing Node Folder**

    If your current folder is named `.hoprd-db-dufour`, rename it to `hoprd`:
    ```
    mv .hoprd-db-dufour hoprd
    ```

    *Tip: If running multiple nodes, use names like `hoprd-2`, `hoprd-3`, etc.*

2. **Move db into a New Data Folder**

    Navigate into the `hoprd` folder, create a `data` directory, and move the `db` folder into it:
    ```
    mkdir data && mv db data
    ```

3. **Organize Identity and Config Files**

    Inside the `hoprd` folder, create a `conf` directory and move the identity and configuration files:
    ```
    mkdir conf && mv .hopr-id-dufour conf/hopr.id && mv hoprd-docker.cfg.yaml conf
    ```

4. **Update Your Configuration File**

    Ensure your configuration file is up to date by applying the [latest configuration file](manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

The update process occurs when you stop and restart the `hoprd` services, ensuring the latest version is applied.

---

### 1. Stop hoprd Services

Navigate to the `compose` folder and stop the `hoprd` services by running:
```
COMPOSE_PROFILES=hoprd docker compose down
```

---

### 2. (Optional) Update HOPRd Node Folder Structure

Starting with HOPRd v3.0.0, unified paths have been introduced for the database, identity, and configuration files across all platforms.  
Your existing paths still work, but it's strongly recommended to adopt the new structure for long-term compatibility.

### Path Changes Overview

| Old Path                          | New Path                    | Description                                |
|----------------------------------|-----------------------------|--------------------------------------------|
| `/compose/hoprd_data/hoprd/`     | `/compose/hoprd/data`       | Mount path for the database directory      |
| `/compose/hoprd_data/hopr.id`    | `/compose/hoprd/conf/hopr.id` | Path to the identity file (now in `conf`)  |
| `/compose/hoprd_data/hoprd.cfg.yaml` | `/compose/hoprd/conf/hoprd.cfg.yaml` | Path to the configuration file (now in `conf`) |

---

1. **Rename the Existing Node and Database Folders**

    From the `compose` directory, run:
    ```
    mv hoprd_data hoprd && mv hoprd/hoprd hoprd/data
    ```

2. **Organize Identity and Config Files**

    Still inside the `compose` folder, create a `conf` directory and move the identity and config files:

    ```
    mkdir hoprd/conf && mv hoprd/hopr.id hoprd/conf/hopr.id && mv hoprd/hoprd.cfg.yaml hoprd/conf/hoprd.cfg.yaml
    ```

---

### 3. Update Your Configuration File

Inside the `compose` folder, locate the config file at:
```
/hoprd/conf/hoprd.cfg.yaml
```

Then edit the file:

- Find the `strategy.strategies` section.
- Under the `!AutoRedeeming` strategy, replace the existing 18-decimal value for `minimum_redeem_ticket_value` with:
```
minimum_redeem_ticket_value = '2.5 wxHOPR'
```

---

### 4. Start hoprd Services

To apply the latest version, restart the `hoprd` services:
```
COMPOSE_PROFILES=hoprd docker compose up -d
```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

### 1. Back Up Your Identity File

Follow the instructions [here](./backup-restore-update#backup-your-node-identity) to back up your identity file.

---

### 2. Open the Dappstore

Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).

---

### 3. Find and Select the HOPR Package

Search for the HOPR package, access its details, and click `UPDATE`.

---

### 4. Submit the Update

During the update process, all data fields should be pre-filled.  
Click `Submit` to complete the HOPRd node update process.

---

### 5. Apply the Latest Configuration File

Ensure your configuration file is current by applying the [latest configuration file](manage-node-strategies.md#create-and-apply-configuration-file-to-your-node).
 
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

### 1. List Running Docker Containers

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

---

### 2. Remove the Admin UI Container

Replace `<Your_Container_ID>` with your actual container ID:

```bash
docker rm -f <Your_Container_ID>
```

Example:

```bash
docker rm -f 0a74437b27f8
```

---

### 3. Reinstall the Latest Admin UI

Retrieve and run the [latest Admin UI installation command](./node-management-admin-ui.md#installing-hopr-admin-ui) in your terminal.

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

### 1. Navigate to Your Compose Directory

Locate and open the `compose` folder (assuming you haven't renamed it).

---

### 2. Stop the Admin UI Services

Use the following command:

```bash
COMPOSE_PROFILES=admin-ui docker compose down
```

---

### 3. Restart the Admin UI Services

To restart and apply the update:

```bash
COMPOSE_PROFILES=admin-ui docker compose up -d
```

</TabItem>
</Tabs>