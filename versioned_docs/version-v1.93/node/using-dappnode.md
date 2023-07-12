---
id: using-dappnode
title: Using Dappnode
---

To set up your DAppNode, follow the instructions that came with the box. Then, just install the HOPR client, and you can start using your node right away!

## Installing the HOPR Client: 1.93.5 (Monte Rosa)

While connected to your Dappnode's network or via a VPN:

(**1**) Open the DAppStore using the sidebar to the left.

![DappStore](/img/node/DappStore-NR-1.png)

(**2**) Search for the "HOPR" ins the Dappstore using the search bar. You should see the latest version of the HOPR client in the listed dApps. Click `Get`. This should take you to a new interface.

![Install Dappnode](/img/node/Dappnode-install.png)

(**3**) Click `install`; this will open the setup wizard. 

**If you don't have an old node you want to restore** simply click `submit` at the bottom of the page.

**If you do have an old node you would like to restore** In the final text field under `custom identity file` enter the path `/app/hoprd-db`. Then click `Browse` next to this text field and locate the identity file of the node you wish to restore. Once selected, click `submit` at the bottom of the page.

**Note:** You can only use your identity file here if you have downloaded a zip file containing the DB folder and your identity file; you can either locate the file or [restore your node after the HOPR package is installed.](./using-dappnode.md#restoring-an-old-node) 

![Dappnode Setup](/img/node/Dappnode-setup.png)

(**5**) Now accept the disclaimer, and your HOPR package should start installing immediately. We recommend you enable auto-updates when prompted. 

![Accept dsclaimer](/img/node/Dappnode-accept-disclaimer.png)

That's all! Once installed, you should now be able to find the HOPR client in your 'Packages'.

![MyDapps](/img/node/Dappnode-2.png)

Simply open the client, and you should be greeted with an interface similar to the one below.

![Dappnode UI](/img/node/Dappnode-UI.png)

Here you can click the UI hyperlink to proceed to the HOPRd graphical interface. 

Your **security token** is set to `!5qxc9Lp1BE7IFQ-nrtttU`. You will need this to access your node.

If you are in the process of registering your node on the network registry, please complete the process [here](./network-registry-tutorial.md) before continuing.

Otherwise, the installation process is complete! You can proceed to our [hoprd tutorial](using-hopr-admin).

### Restoring an old node 

:::caution Warning
**Important:** You should download the latest version of HOPR before trying to restore your node.
:::

If you have previously installed a node and have the [identity Backup folder downloaded](./using-dappnode.md#backup-identity-file-backup-folder), you can use it to restore your old node.

**If you are restoring an Avado node**, you will have downloaded just the identity file rather than the whole DB. As such will need to follow [these instructions instead.](./using-dappnode.md#restoring-an-avado-node-on-dappnode) 

**If you are restoring a node backed up on Dappnode**, simply follow the instructions below.

(**1**) Find HOPR in your packages and navigate to the backup section.

![dappnode restore](/img/node/dappnode-backup.png)

(**2**) Simply click `Restore` and open your [zipped backup file](./using-dappnode.md#backup-identity-file-backup-folder) when prompted.

### Restoring An Avado Node On Dappnode

You will need to use the file manager to restore an Avado identity file on DappnodeOS. 

(**1**) Make sure you can view hidden files.

**For Windows:** Go to your File Manager app, and under `View -> Show`, make sure `hidden files` is ticked on. 

![Hiden Files](/img/node/Hidden_files_windows.png)

**For Mac:** With the Finder app open, simultaneously press the key combination: `Command + Shift + . ( Dot)`. You will need to do this during Step 2 on Mac. 
 
(**1**) Find HOPR in your packages and navigate to the `File Manager` tab. 

![File Manager](/img/node/Dappnode-file-manager.png)

(**2**) In the text field under `Upload file` enter the path `/app/hoprd-db`.

![Dappnode file upload path](/img/node/Dappnode-entered-path.png)

(**3**) Then click the `Browse` button next to the `Choose file` field. And select your downloaded identity file.

(**4**) Finally, press the `Upload` button and wait for the upload to complete. 

All done, you should now have restored your old node!

### Backup Identity File (Backup Folder)

Find HOPR in your packages and navigate to the backup section. From there, all you have to do is click `Download backup`. This will download a `.zip` file containing your identity file. For DAppNode, you should use this zipped file to [restore your node](using-dappnode#restoring-an-old-node) if needed.

![dappnode backup](/img/node/dappnode-backup.png)

#### How to view your DAppNode identity file:

You will not be able to use the identity file alone to [restore your old node](using-dappnode#restoring-an-old-node) on DAppNode and should use the entire zipped backup file. The instructions below are simply to view your identity file.

(**1**) Extract the zipped file downloaded to see the DB folder and identity file.

(**2**) Once extracted, open the folder: `db`.

![dappnode db folder](/img/node/Dappnode-DB-folder.png)

(**3**) You will see the file `identity` if hidden files are visible.

### Backup Identity File Without DB

(**1**) Find HOPR in your packages and navigate to the `File Manager` tab. 

![File Manager](/img/node/Dappnode-file-manager.png)

(**2**) In the text field under `Download file` enter the path `/app/hoprd-db/.hopr-identity`.

![Download ID File](/img/node/Dappnode-downlaod-ID.png)

(**3**) Finally, press the `Download` button next to the bottom text field. Once the file downloads, store it somewhere safe for future use. 

## Default ports

- 3000 on TCP : Admin UI port (speaks HTTP protocol)
- 3001 on TCP: REST API port (speaks HTTP)
- 8080 on TCP: Healthcheck service - is used to see that the node is up & running (speaks HTTP)
- 9091 on TCP: main P2P port used for HOPR protocol
- 9091 on UDP: used for STUN requests by other non-public nodes reaching out to you to see what their IP address is

## Collecting Logs

If your node crashes, you will want to collect the logs and pass them on to our ambassadors on telegram or create an issue on GitHub.

To collect the logs:

(**1**) Find HOPR in your packages and navigate to the backup section.

![Dappnode Logs](/img/node/Dappnode-logs.png)

(**2**) From there, all you have to do is click 'Download all'.

Using the downlaoded file either:

- Send it to an ambassador on our [telegram](https://t.me/hoprnet) for assistance.
- Or, create an issue using our bug template on [GitHub.](https://github.com/hoprnet/hoprnet/issues)

## Using a Custom RPC Endpoint

You can set your own RPC endpoint for HOPR to use. Ideally, you would install an Nethermind xDai client on your DAppNode and use its local provider. A local provider helps increase decentralisation and is generally good practice, but you can also use any RPC provider of your choice as long as they are on gnosis chain.

**Note:** Only RPC providers on Gnosis chain will work with HOPR

### Finding your local endpoint

If you have already installed an Nethermind xDai client, you can find its RPC endpoint on the package's info page.

![ETH client settings](/img/node/RPC-endpoint-Dappnode.png)

The image above shows the RPC endpoint for the Nethermind xDai client (querying API in the image): `http://nethermind-xdai.dappnode:8545`. Your endpoint will be different depending on the client you have installed. Otherwise, you can use any non-local RPC provider such as [ankr.](https://www.ankr.com/)

### Changing your RPC endpoint

To change your RPC endpoint:

(**1**) Find HOPR in your packages and navigate to the 'Config' section.

![RPC Prpvider Dappnode](/img/node/HOPR-provider-Dappnode.png)

(**2**) Paste your custom RPC endpoint in the text field under `RPC Provider URL`.

(**3**) Click 'Update' and wait for your node to restart.

All done! Your DAppNode node will now use your specified RPC endpoint.
