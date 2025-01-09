---
id: backup-restore-update
title: Backup, Restore and Update Your Node
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Backup your node identity

Please select a platform to backup your node identity:

<Tabs>
<TabItem value="docker_backup" label="Docker">

For Docker, the identity file is automatically created and stored on your machine.

(**1**) Find the identity file "**.hopr-id-dufour**" at this path "**/\<computer username>/.hoprd-db-dufour/**".

(**2**) Write down the database password, which is set by this setting in the HOPRd docker command "**--password**". 

**Note:** Your database password is set to `open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0` by default, unless you changed it during the initial node setup.

(**3**) Store the backed-up file somewhere safe, along with your database password, in case you ever need to restore your node.

</TabItem>
<TabItem value="docker_compose_backup" label="Docker Compose">

For Docker compose, the identity file is automatically created and stored on your machine.

(**1**) Locate the identity file "**hopr.id**" at the following path: **"/\<computer username>/compose/hoprd_data/"**.

(**2**) In the "**compose**" folder, open the secrets environment file "**.env-secrets**" and note down the database password stored under the "**HOPRD_PASSWORD**" variable.

(**3**) Safely store the backed-up "**hopr.id**" file along with your database password in case you need to restore your node in the future.
</TabItem>
<TabItem value="dappnode_backup" label="Dappnode">

(**1**) Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

(**2**) Under the "**Download file**" section, enter `/app/hoprd-db/.hopr-identity` and click "**Download**".

(**3**) Go to the [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config). Under "**Identity file password**", click the "**eye**" icon to unhide the database password and write it down.

**Note:** Your database password is set to `"open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0"` (including the double quotes) by default, unless you changed it during the initial node setup.

(**4**) Store the backed up file somewhere safe, along with your database password, in case you ever need to restore your node.

(**5**) To ensure you backed up the correct file, unarchive the "**hopr-identity.tar**" file to verify the presence of the "**.hopr-identity**"  file. Make sure you have enabled the feature to view hidden files on your machine.

</TabItem>

</Tabs>
---

## Restore your node identity

Please select platform to restore your node identity:

<Tabs>
<TabItem value="docker_restore" label="Docker">

(**1**) Before restoring your node identity, ensure that you have [backed up your HOPR node identity](./backup-restore-update.md#backup-your-node-identity). Confirm that you have the HOPR identity file: "**.hopr-identity**" and make sure you also have the database password.

(**2**) Copy the "**.hopr-identity**" file into the "**.hoprd-db-dufour**" folder.

(**3**) Update the "**--password**" tag in the Docker command to match the database password used for your previous node.

(**4**) Configure the Docker command with the required information, just as you did initially when setting up a new node. For more details, see [here](node-docker.md#2-configure-hoprd-command).

</TabItem>
<TabItem value="docker_compose_restore" label="Docker Compose">

(**1**) Before restoring your node identity, ensure that you have [backed up of your HOPR node identity](./backup-restore-update#backup-your-node-identity). Verify that you have the "**hopr.id**" file and your database password.

(**2**) Navigate to the "**compose**" folder and stop the "**hoprd**" services by running the following command:

```md
COMPOSE_PROFILES=hoprd docker compose down
```

(**3**) Copy the "**hopr.id**" file into the "**hoprd_data**" folder within the "**compose**" directory.

(**4**) Return to the main "**compose**" folder and restart the "**hoprd**" services by running the following command:

```md
COMPOSE_PROFILES=hoprd docker compose up -d
```
</TabItem>
<TabItem value="dappnode_restore" label="Dappnode">

(**1**) Make sure you can view hidden files.

**For Windows:** Open the File Manager app, and under "**View -> Show**", ensure that **hidden files** is checked. 

![Hiden Files](/img/node/Hidden_files_windows.png)

**For Mac:** With the Finder app open, simultaneously press the key combination: **Command + Shift + . (Dot)**. You will need to do this whenever you upload the identity file.

(**2**) Before restoring your node identity, ensure that you have [backed up your HOPR node identity](./backup-restore-update#backup-your-node-identity). Retrieve the "**.hopr-identity**" file from the archived "**hopr-identity.tar**" and ensure that you have the database password.

(**3**) Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the "**Pause**" icon to stop HOPR package.

(**4**) Go to the [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager). Under the "**Upload file**" section fill in required information:

- In the **Choose file** field, click "**Browse**", ensure that hidden files are enabled, and select the "**.hopr-identity**" file.
- In the **Defaults to $WORKDIR/** field, enter the database folder location: `/app/hoprd-db/`.

Click the "**Upload**" button to upload HOPR identity file.

(**5**) Go to the [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info) and click the "**Play**" or "**Restart**" icon to start the HOPR package.
 
</TabItem>
</Tabs>
---

## Update your node

Please select platform to update your node identity:

<Tabs>
<TabItem value="docker_update" label="Docker">

(**1**) Back up your identity file. Follow the instructions in this [guide](./backup-restore-update#backup-your-node-identity).

(**2**) Enter the following command `docker ps` into your terminal.

This will provide you with a list of Docker containers you are currently running. Among them, locate the one with the label "**europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable**" and note the "**container ID**".

![Docker ps](/img/node/docker-ps-node-update.png)

In the image above, the container ID is: "**4951b2990936**". In your system, the Docker container ID will be different.

(**3**) Kill the container using the following command: `docker kill <Your_Container_ID>`. Replace "**\<Your_Container_ID\>**" with your container ID.

Example: 

```md
docker kill 4951b2990936
```

(**4**) **Optional step:** If you have implemented [custom strategies](manage-node-strategies.md) on your node, you might need to make the following changes:

- Locate the configuration file "**hoprd-docker.cfg.yaml**" inside the "**.hoprd-db-dufour**" folder.  
- Find "**network_options.quality_bad_threshold**" and ensure it is set to a value of `0.1`.
- Find "**network_options.quality_offline_threshold**" and ensure it is set to a value of `0.0`.

**Note:** If these settings are not present in your configuration file, there is no need to add them.

(**5**) Run the [latest configured command](node-docker.md#2-configure-hoprd-command) to update your node.

</TabItem>
<TabItem value="docker_compose_update" label="Docker Compose">

The update process occurs when you stop and restart the "**hoprd**" services, ensuring the latest version is applied:

(**1**) Navigate to the "**compose**" folder and stop the "**hoprd**" services by running the following command:

```md
COMPOSE_PROFILES=hoprd docker compose down
```

(**2**) **Optional step:** If you have implemented [custom strategies](manage-node-strategies.md) on your node, you might need to make the following changes:

- Locate the configuration file "**hoprd.cfg.yaml**" in the "**hoprd_data**" folder inside the "**compose**" directory. 
- Find "**network_options.quality_bad_threshold**" and ensure it is set to a value of `0.1`.
- Find "**network_options.quality_offline_threshold**" and ensure it is set to a value of `0.0`.

**Note:** If these settings are not present in your configuration file, there is no need to add them.

(**3**) To start the "**hoprd**" services again and apply the latest version, run this command:

```md
COMPOSE_PROFILES=hoprd docker compose up -d
```
</TabItem>
<TabItem value="dappnode_update" label="Dappnode">

(**1**) Backup your identity file. Please follow the instructions [here](./backup-restore-update#backup-your-node-identity).

(**2**) **Optional step:** If you have implemented [custom strategies](manage-node-strategies.md) on your node, you might need to make the following changes.

In the HOPR package, navigate to "**File Manager**". Under the "**Download File**" section, enter `/app/hoprd.cfg.yaml` and click "**Download**". Make edits to the configuration file you just downloaded:

- Find "**network_options.quality_bad_threshold**" and ensure it is set to a value of `0.1`.
- Find "**network_options.quality_offline_threshold**" and ensure it is set to a value of `0.0`.

**Note:** If these settings are not present in your configuration file, there is no need to add them.

(**3**) Go to the [Dappnode dappstore](http://my.dappnode/installer/dnp).

(**4**) Search for the HOPR package, access the package details, and click "**UPDATE**".

(**5**) During the update process, all data should be pre-filled. Click "**Submit**" to complete the HOPRd node update process.

</TabItem>
</Tabs>

---

## Update your HOPR Admin UI

**Note:** For Dappnode users, the HOPR Admin UI cannot be updated separately, as it is bundled with the HOPR package.

Please select platform to update your HOPR Admin UI:

<Tabs>
<TabItem value="docker_admin_UI" label="Docker">

(**1**) Enter the following command `docker ps` into your terminal.

This will provide you with a list of Docker containers you are currently running. Among them, locate the one with the label "**europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:stable**" and note the "**container ID**".

![Docker ps](/img/node/docker-ps-admin-ui-update.png)

In the image above, the container ID is: "**0a74437b27f8**". In your system, the Docker container ID will be different.

(**2**) Kill the container using the following command: `docker kill <Your_Container_ID>`. Replace "**\<Your_Container_ID\>**" with your container ID.

Example: 

```md
docker kill 0a74437b27f8
```

(**3**) Retrieve the [latest installation command for the HOPR Admin UI](./node-management-admin-ui.md#installing-hopr-admin-ui) and execute it in your terminal.

</TabItem>
<TabItem value="docker_compose_admin_UI" label="Docker Compose">

(**1**) Locate and navigate to the "**compose**" folder (assuming you haven't renamed it).

(**2**) To restart the process, first stop the "**admin-ui**" services. You can do this by running the following command:

```md
COMPOSE_PROFILES=admin-ui docker compose down
```

(**3**) To start the "**admin-ui**" services again, use this command:

```md
COMPOSE_PROFILES=admin-ui docker compose up -d
``` 
</TabItem>
</Tabs>