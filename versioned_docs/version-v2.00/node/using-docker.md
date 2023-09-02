---
id: using-docker
title: Using Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info INFO
The instructions below are for Linux and macOS. If you are using Windows, please use a VPS.
:::

## Step 1: Install Docker

Before doing anything else, you need to install **Docker Desktop** on your machine.

<Tabs>
<TabItem value="Linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="mac" label="macOS">

1. Visit [Docker](https://www.docker.com/get-started) and download Docker Desktop to your computer.
2. Follow the wizard steps to ensure Docker is installed.
3. Ensure the installation was successful by running `docker ps` in your terminal.

</TabItem>
</Tabs>

All our docker images can be found in [our Google Cloud Container Registry](https://console.cloud.google.com/gcr/images/hoprassociation/global/hoprd). Each image is prefixed with `gcr.io/hoprassociation/hoprd`.


## Step 2: Configure Command

The default command provided below will look similar to the one provided during the onboarding process. Whether you are onboarding a new node or trying to re-run an old one, the default command needs to be configured before you can use it to run a node.

Default command:

```bash
docker run --pull always --restart on-failure -m 2g --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db -p 9091:9091/tcp -p 9091:9091/udp -p 8080:8080 -p 3001:3001 -e DEBUG="hopr*" europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:latest --network dufour --init --api --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --apiHost "0.0.0.0" --apiToken 'YOUR_SECURITY_TOKEN' --healthCheck --healthCheckHost "0.0.0.0" --announce --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <Module_ADDRESS> --host <YOUR_PUBLIC_IP>:9091
```

### Adjust the API Token

(**1**) Create a **Security Token** (password) which satisfies the following requirements:

:::danger Requirements

Security token should contain:

- at least eight symbols
- a lowercase letter
- uppercase letter
- a number
- a special symbol (don't use `%` or whitespace)

This ensures the node cannot be accessed by a malicious user residing in the same network.

:::

(**2**) Replace the `apiToken` within your docker command with your own security token. 

For example: replace `--apiToken 'YOUR_SECURITY_TOKEN'` with `--apiToken 'My#S3cur1ty#Token'`. 

### Adjust Safe & Module Addresses (Not For Onboarding)

For node runners onboarding, these will be provided by default within the command given to you, so you can skip this step and go to [step 3](./using-docker.md#step-3-adjust-public-ip-address).

For people looking to restart an old node, you will need to find your Safe and Module address and manually add it to the docker command. 

(**1**) Head over to the [Staking Hub Dashboard](https://hub.hoprnet.org/staking/dashboard), and you should find your Safe and Module address at the top of the staking section.

<!-- INSERT SCREENSHOT -->

(**2**) replace the `safeAddress` and `moduleAddress` within your docker command with your own security token. 

For example: replace `--safeAddress <SAFE_WALLET_ADDRESS>` with `--safeAddress 0xEe8D810feAb42313Cc6E2F9DC2D9E2e55d2eb6f9` and replace `--moduleAddress <Module_ADDRESS>` with `--moduleAddress 0x0cE0dD1532e58C09bd60bb2a50fad9BB03c541B2`

### Adjust Public IP Address

You will need to edit your public IP address within the Docker command:

(**1**) Find your public IP address. If you do not know it, you can follow the instructions [here](./using-docker.md#find-your-ip-address).

(**2**) Replace the `host` within your docker command with your own security token. 

For example: replace `--host <YOUR_PUBLIC_IP>:9091` with `--host 8.8.8.8:9091`. 

Make sure not to remove the port `:9091` at the end. 

**Note:** Dynamic IPs will not work for this, as once your IP address changes, your node will no longer be reachable.

## Step 3: Start Your Node

Once you have [configured your docker command](using-docker.md#configure-command) correctly, you can start your node by using the now adjusted docker command.

(**1**) Open your terminal.

(**2**) Check that Docker is installed by running the following command:

```bash
docker --help
```

If you see an output of available docker commands, Docker is installed. If the docker command is not found, please make sure you have [correctly installed Docker](./using-docker.md#install-docker).

(**3**) With Docker installed, paste your adjusted docker command into the terminal and execute it. This command should look similar to the default command below but with the correct Safe Address, Module Address, Public IP and Security Token for you:

```bash
docker run --pull always --restart on-failure -m 2g --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db -p 9091:9091/tcp -p 9091:9091/udp -p 8080:8080 -p 3001:3001 -e DEBUG="hopr*" europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:latest --network dufour --init --api --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --apiHost "0.0.0.0" --apiToken 'YOUR_SECURITY_TOKEN' --healthCheck --healthCheckHost "0.0.0.0" --announce --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <Module_ADDRESS> --host <YOUR_PUBLIC_IP>:9091
```

(**4**) After running the command, wait for a little bit, and from the output, locate your `Node Information`.

<!-- INSERT SCREENSHOT -->

(**5**) Copy your `Node address`, and close your node using the command `CTRL + C` or `Command + C`.

**Note:** Do not close the node if it has already been approved. Only close it if you have not yet joined the waitlist and are onboarding this node for the first time.

(**6**) Go back to the [Staking Hub](https://hub.hoprnet.org) to register to the waitlist or if you have been approved to join the network, to complete your onboarding.

## Restart Your Node

:::info

Only do this if you have been approved to join the network. If you are still on the waitlist, please wait until you have been approved to join the network. 

:::info

### For VPS users 

(**1**) Please make sure you have installed [Tmux](./using-docker.md#install-tmux-optional)

(**2**) Open your terminal

(**3**) Paste and execute your configured docker command. If you do not have it saved, you can configure the default command by following the instructions [here].

(**4**) Make sure to note your Node address either from the output from the terminal or your application to the [waitlist](https://cryptpad.fr/sheet/#/2/sheet/view/NYbRDH+C993dfHwEL1RyyKNtxG5pRoOaxtI4hbRVUBw/).

(**5**) Return to the [Staking Hub](https://hub.hoprnet.org) with your Node address noted to finish onboarding.

### For Linux/macOS  

(**1**) Open your terminal

(**2**) Paste and execute your configured docker command. If you do not have it saved, you can configure the default command by following the instructions [here].

(**3**) Make sure to note your Node address either from the output from the terminal or your application to the [waitlist](https://cryptpad.fr/sheet/#/2/sheet/view/NYbRDH+C993dfHwEL1RyyKNtxG5pRoOaxtI4hbRVUBw/).

(**4**) Return to the [Staking Hub](https://hub.hoprnet.org) with your Node address noted in order to finish 

## Find Your IP Address

### For Linux or macOS

(**1**) Open the terminal

(**2**) Copy, paste and execute the following command: 

```bash
--host 8.8.8.8:9091
```

(**3**) Note your public IP address from the output

<!-- INSERT SCREENSHOT -->

### For VPS Users

- VPS users should be able to find their IP address from their provider. It will also be your VPS IP, so it should be easy to find.

## Default ports

- 3000 on TCP : Admin UI port (speaks HTTP protocol)
- 3001 on TCP: REST API port (speaks HTTP)
- 8080 on TCP: Healthcheck service - is used to see that the node is up & running (speaks HTTP)
- 9091 on TCP: main P2P port used for HOPR protocol
- 9091 on UDP: used for STUN requests by other non-public nodes reaching out to you to see what their IP address is

In general, you will only want to change these port numbers if you intend to run multiple nodes simultaneously. Otherwise, use the Docker command with the default mapping.

**Note:** For the initial Monte Rosa release, you will only be allowed to register a single node at a time.

## Collecting Logs

If your node crashes, you will want to collect the logs and pass them on to our ambassadors on [telegram](https://t.me/hoprnet) or create an issue on GitHub.

To collect the logs:

(**1**) In your terminal, enter the command:

```bash
docker container ls --all
```

This will create a list of all your docker containers similar to the one below:

![Container ID logs](/img/node/container-ID-logs.png)

(**2**) Look through the list and find the `container ID` of the most recently exited container. The example above would be `5955dbd23bb2` as the most recent container is still running.

(**3**) Replace the container ID in the command below with yours from step 2:

```bash
docker logs -t <CONTAINER_ID>
```

This should output your logs, copy them and either:

- Save them in a .txt file and send them to an ambassador on our [telegram](https://t.me/hoprnet) for assistance.
- Or, create an issue using our bug template on [GitHub.](https://github.com/hoprnet/hoprnet/issues)

