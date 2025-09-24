---
id: node-operations
title: Managing Node Service
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

This section explains how to start, stop, and restart your HOPRd node, as well as where to find important files such as the database, log files, identity key, and configuration.

---

Select the platform where your HOPRd node is running to view the relevant service management instructions and file paths:
<NoCounter>
<Tabs queryString="node_service">
<TabItem value="docker" label="Docker">

After installing the HOPRd node using Docker, the following directories and files are created:

| **Purpose**         | **Path**         | **Description**                                                    |
| ------------------- | ---------------- | ------------------------------------------------------------------ |
| Identity file  | `$HOME/.hoprd-db-dufour/.hopr-id-dufour` | Stores the node’s identity. |
| Data directory | `$HOME/.hoprd-db-dufour/` | Contains the node’s database (`db` folder) and runtime data such as the `tbr` file. |

When using Docker, your HOPRd node runs inside a container in the background.

### Start the HOPRd node

1. Ensure that you have removed the old HOPR Docker container. You can find more details [here](node-operations.md).

2. Ensure that your Docker command is properly configured. You can find the default Docker configuration details [here](node-docker.md#configure-hoprd-command). 

    If you're using a configuration file to manage your node strategies, refer to this [page](./manage-node-strategies.md#create-and-apply-configuration-file-to-your-node) and select **Docker**," then review **Step 6** for specific instructions.

3. Run your configured HOPR command by pasting it into the terminal.

---

### Stop the HOPRd node

To stop your current HOPR node, we will perform the HOPR Docker container removal procedure.

1. Connect to your machine and execute the command `docker ps`. This will provide you with a list of Docker containers you are currently running. Among them, locate the container with the label **europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:stable** and note the **container ID**.

2. Remove the container using the following command: `docker rm -f <Your_Container_ID>`. Replace `<Your_Container_ID>` with your container ID.

    Example: 

    ```md
    docker rm -f 4951b2990936
    ```

</TabItem>
<TabItem value="docker_compose" label="Docker Compose">

Using the installation method with Docker Compose, here is a list of folders and files that are downloaded and prepared in advance:

| **Purpose**               | **Path**                            | **Description**                                                                                |
| ------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Configuration & Identity  | `$HOME/compose/hoprd/conf/`         | Contains pre-downloaded configuration file `hoprd.cfg.yaml` and identity file `hopr.id`.       |
| Secrets File              | `$HOME/compose/.env-secrets.sample` | Contains sensitive values like the identity DB password, REST API token, and metrics push key. |
| Environment Configuration | `$HOME/compose/.env.sample`         | Defines general node settings, such as ports and the HOPRd release version.                    |
| Data Directory            | `$HOME/compose/hoprd/data/`         | Placeholder directory to store the node’s database and runtime data at runtime.                |

When using Docker Compose, your HOPRd node runs in a managed container environment in the background.

### Start the HOPRd node

1. Go to your **compose** folder.

2. Use the profiles feature to start only the **hoprd** profile associated with the hopr node. 

    Run the following command: 
    
    ```
    COMPOSE_PROFILES=hoprd docker compose up -d
    ```

---

### Stop the HOPRd node

1. Go to your **compose** folder.

2. Use the profiles feature to stop only the **hoprd** profile associated with the hopr node. 

    Run the following command: 
    
    ```
    COMPOSE_PROFILES=hoprd docker compose down
    ```

</TabItem>
<TabItem value="dappnode" label="Dappnode">

After installing the HOPRd package via DAppNode, the following directories and files are created inside the container:

| **Purpose**         | **Path**         | **Description**                                                    |
| ------------------- | ---------------- | ------------------------------------------------------------------ |
| Configuration files | `/app/hoprd/conf` | Contains configuration files like `hoprd.cfg.yaml` and `hopr.id`. |
| Data directory      | `/app/hoprd/data` | Stores the node’s database and runtime data.                       |

The HOPRd package operates within a managed containerized environment, managed by DAppNode using Docker Compose to ensure reliable and autonomous background execution.

### Start the HOPRd node

1. Connect to your Dappnode dashboard.

2. Start your HOPR node based on your current needs:

    - To resume an existing HOPR package, navigate to **Packages**, select the [HOPR package](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), and click the **Play** icon to activate it.
    - To set up a new HOPR package, please refer to this [guide](node-dappnode.md#install-the-hopr-package).

---

### Stop the HOPRd node

1. Connect to your Dappnode dashboard.

2. Go to **Packages**, click [HOPR package](http://my.dappnode/packages/my/hopr.public.dappnode.eth/info), click on **Pause** icon to stop HOPR package.

</TabItem>
<TabItem value="linux" label="Linux">

After installing the HOPRd package, the following directories and files are created:

| **Purpose**         | **Path**         | **Description**                                                    |
| ------------------- | ---------------- | ------------------------------------------------------------------ |
| Configuration files | `/etc/hoprd`     | Contains configuration files like `hoprd.cfg.yaml` and `hoprd.env`. |
| Data directory      | `/var/lib/hoprd` | Stores the node’s database and runtime data.                        |
| Log files           | `/var/log/hoprd` | Runtime logs generated by the node.                                 |

The HOPRd package sets up a `systemd` service named `hoprd`, which you can manage using `systemctl`.

---

### Start the HOPRd node

1. Open **Terminal** application

2. Run the following command to start HOPRd node: 

   ```
   sudo systemctl start hoprd
   ```
---

### Stop the HOPRd node

1. Open **Terminal** application

2. Run the following command to stop HOPRd node: 

   ```
   sudo systemctl stop hoprd
   ```
---

### Restart the HOPRd node

1. Open **Terminal** application

2. Run the following command to restart HOPRd node: 

   ```
   sudo systemctl restart hoprd
   ```

---

### Check the HOPRd node status

   Displays the current status, including whether it's active and recent log output.

   1. Open **Terminal** application

   2. Run the following command to check HOPRd node status: 

      ```
      sudo systemctl status hoprd
      ```

</TabItem>
<TabItem value="macos" label="macOS">

After installing the HOPRd package, the following directories and files are created:

| **Purpose**         | **Path**                      | **Description**                             |
| ------------------- | ----------------------------- | ------------------------------------------- |
| Configuration files | `$(brew --prefix)/etc/hoprd`     | Contains `hoprd.cfg.yaml` and `hoprd.env`.   |
| Data directory      | `$(brew --prefix)/var/lib/hoprd` | Stores the node’s runtime data and database. |
| Log files           | `$(brew --prefix)/var/log/hoprd` | Logs generated by the node.                  |

During installation via Homebrew on macOS, HOPRd is registered as a background service using macOS's `launchd` system through the brew services interface.  

---

### Start the HOPRd node

1. Open **Terminal** application

2. Run the following command to start HOPRd node: 

   ```
   brew services start hoprd
   ```
---

### Stop the HOPRd node

1. Open **Terminal** application

2. Run the following command to stop HOPRd node: 

   ```
   brew services stop hoprd
   ```
---

### Restart the HOPRd node

1. Open **Terminal** application

2. Run the following command to restart HOPRd node: 

   ```
   brew services restart hoprd
   ```

---

### Check the HOPRd node status

   Displays the current status, including whether it's active and recent log output.

   1. Open **Terminal** application

   2. Run the following command to check HOPRd node status: 

      ```
      brew services status hoprd
      ```

</TabItem>
</Tabs>

</NoCounter>