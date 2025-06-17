---
id: node-operations
title: Stop and Start Your Node
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Stop your HOPR node

Please select a platform to stop your HOPR node:

<Tabs queryString="stop_node">
<TabItem value="docker" label="Docker">

To stop your current HOPR node, we will perform the HOPR Docker container removal procedure.

(**1**) Connect to your machine and execute the command `docker ps`. This will provide you with a list of Docker containers you are currently running. Among them, locate the container with the label "**europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable**" and note the "**container ID**".

(**2**) Remove the container using the following command: `docker rm -f <Your_Container_ID>`. Replace "**\<Your_Container_ID\>**" with your container ID.

Example: 

```md
docker rm -f 4951b2990936
```

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

(**1**) Go to your "**compose**" folder.

(**2**) Use the profiles feature to stop only the "**hoprd**" profile associated with the hopr node. Run the following command: `COMPOSE_PROFILES=hoprd docker compose down`

</TabItem>
<TabItem value="dappnode" label="Dappnode">

(**1**) Connect to your Dappnode dashboard.

(**2**) Go to "**Packages**", click [HOPR package](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), click on "**Pause**" icon to stop HOPR package.

</TabItem>
</Tabs>

---

## Start your HOPR node

Please select platform to start your HOPR node:

<Tabs queryString="start_node">
<TabItem value="docker" label="Docker">

(**1**) Ensure that you have removed the old HOPR Docker container. You can find more details [here](node-operations.md#stop-your-hopr-node).

**(2)** Ensure that your Docker command is properly configured. You can find the default Docker configuration details [here](node-docker.md#configure-hoprd-command). 

If you're using a configuration file to manage your node strategies, refer to this [page](./manage-node-strategies.md#create-and-apply-configuration-file-to-your-node) and select "**Docker**," then review **Step 6** for specific instructions.

(**3**) Run your configured HOPR command by pasting it into the terminal.

</TabItem>
<TabItem value="docker-compose" label="Docker Compose">

(**1**) Go to your "**compose**" folder.

(**2**) Use the profiles feature to start only the "**hoprd**" profile associated with the hopr node. Run the following command: `COMPOSE_PROFILES=hoprd docker compose up -d`

</TabItem>
<TabItem value="dappnode" label="Dappnode">

(**1**) Connect to your Dappnode dashboard.

(**2**) Start your HOPR node based on your current needs:

- To resume an existing HOPR package, navigate to "**Packages**", select the [HOPR package](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), and click the "**Play**" icon to activate it.

- To set up a new HOPR package, please refer to this [guide](node-dappnode.md#install-the-hopr-package).
</TabItem>
</Tabs>