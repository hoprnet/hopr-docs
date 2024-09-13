---
id: backup-restore-node
title: Backup, restore and update node
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Backup your node identity

Please select platform to backup your node identity:

<Tabs>
<TabItem value="docker_backup" label="Docker">

For Docker the identity file is automatically created and stored on your OS.

(**1**) Find identity file by this path "**/\<computer username>/.hoprd-db-dufour/.hopr-id-dufour**" and copy it.

(**2**) Write down database password which is set to this setting in the HOPRd docker command "**--password**".

(**3**) Store backed up file somewhere safe along with your database password, in case you ever need to restore your node.

**Note:** Your DB password is set to `open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0` by default, unless you changed it, when configuring your command.
</TabItem>
<TabItem value="dappnode_backup" label="Dappnode">

(**1**) Go to [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager).

(**2**) Under the "**Download file**" section, enter `/app/hoprd-db/.hopr-identity` and click "**Download**". 

(**3**) Go to [HOPR package config page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/config). Under "**Identity file password**", click on "**eye**" icon to unhide database password and write it down.

(**4**) Store backed up file somewhere safe along with your database password, in case you ever need to restore your node.

(**5**) To make sure you backed up a correct file, please unarchive the "**hopr-identity.tar**" file to see the "**.hopr-identity**" file (Make sure you enabled feature to see hidden files on your machine).

**Note:** Your DB password is set to `open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0` by default, unless you changed it, when configuring your command.
</TabItem>
</Tabs>
---

## Restore your node identity

Please select platform to restore your node identity:

<Tabs>
<TabItem value="docker_restore" label="Docker">

(**1**) Before restoring your node identity, ensure that you have performed a [backup of your HOPR node identity](backup-restore-node#backup-your-node-identity). Confirm that you possess the HOPR identity file: "**.hopr-identity**", and make sure you also have the database password.

(**2**) Copy the "**.hopr-identity**" file into the "**.hoprd-db-dufour**" folder.

(**3**) Update the "**--password**" tag in the Docker command to match the database password used for your previous node.

(**4**) Configure the Docker command with the required information, just as you did initially when setting up a new node. For more details, see [here](node-docker.md#2-configure-hoprd-command).

</TabItem>
<TabItem value="dappnode_restore" label="Dappnode">

(**1**) Make sure you can view hidden files.

**For Windows:** Go to your File Manager app, and under "**View -> Show**", make sure **hidden files** is ticked on. 

![Hiden Files](/img/node/Hidden_files_windows.png)

**For Mac:** With the Finder app open, simultaneously press the key combination: **Command + Shift + . (Dot)**. You will need to do this whenever you will be uploading identity file.

(**2**) Before restoring your node identity, ensure that you have performed a [backup of your HOPR node identity](backup-restore-node#backup-your-node-identity). Retrieve the "**.hopr-identity**" file from the archived "**hopr-identity.tar**" and make sure you also have the database password.

(**3**) Go to [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), click on "**Pause**" icon to stop HOPR package.

(**4**) Go to [HOPR package file manager page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/file-manager). Under "**Upload file**" section fill in required information:

- Under the **Choose file** field, click on "**Browse**", make sure you have enabled feature to show hidden files and select "**.hopr-identity**" file.
- Under the **Defaults to $WORKDIR/** field, fill in with a database folder location: `/app/hoprd-db/`.

Click on "**Upload**" button, to upload HOPR identity file.

(**5**) Go to [HOPR package info page](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), click on "**Play**" or "**Restart**" icon to start HOPR package.
 
</TabItem>
</Tabs>
---

## Update your node

Please select platform to update your node identity:

<Tabs>
<TabItem value="docker_update" label="Docker">

(**1**) Backup your identity file. Please follow the instructions [here](backup-restore-node#backup-your-node-identity).

(**2**) Enter the following command `docker ps` into your terminal.

This should provide you with a list of Docker containers you are currnetly running. Among them locate the one with the label "**europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable**" and note the "**container ID**".

![Docker ps](/img/node/docker-ps-node-update.png)

In the image above the container ID is: "**4951b2990936**". In your system, the Docker container ID will be different.

(**3**) Kill the container using the following command: `docker kill <Your_Container_ID>`. Replace "**\<Your_Container_ID\>**" with your container ID.

Example: 

```md
docker kill 4951b2990936
```

(**4**) Run the [latest configured command](node-docker.md#2-configure-hoprd-command) to update your node.

</TabItem>
<TabItem value="dappnode_update" label="Dappnode">

(**1**) Backup your identity file. Please follow the instructions [here](backup-restore-node#backup-your-node-identity).

(**2**) Go to [Dappnode dappstore](http://my.dappnode/installer/dnp).

(**3**) Search for HOPR package, access the package details and click on "**UPDATE**".

(**4**) During update process all data should be pre-filled, click on "**Submit**" to complete the HOPRd node updating process.

</TabItem>
</Tabs>