---
id: using-docker-v2
title: Using Docker V2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. Installing Docker

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

## 2. Configuring docker command

This is a default docker command line, where we will explain several parts on the command which needs adjustments.

```bash
docker run --pull always --restart on-failure -m 2g --log-driver json-file --log-opt max-size=100M --log-opt max-file=5 -ti -v $HOME/.hoprd-db-dufour:/app/hoprd-db -p 9091:9091/tcp -p 9091:9091/udp -p 8080:8080 -p 3001:3001 -e DEBUG="hopr*" europe-west3-docker.pkg.dev/hoprassociation/docker-images/hoprd:latest --network dufour --init --api --identity /app/hoprd-db/.hopr-id-dufour --data /app/hoprd-db --password 'open-sesame-iTwnsPNg0hpagP+o6T0KOwiH9RQ0' --apiHost "0.0.0.0" --apiToken 'YOUR_SECURITY_TOKEN' --healthCheck --healthCheckHost "0.0.0.0" --announce --safeAddress <SAFE_WALLET_ADDRESS> --moduleAddress <Module_ADDRESS> --host <YOUR_PUBLIC_IP>:9091
```

### API Token

`--apiToken 'YOUR_SECURITY_TOKEN'` - YOUR_SECURITY_TOKEN part should be replaced with your personal one, this ensures the node cannot be accessed by a malicious user residing in the same network.

For example: `--apiToken 'My#S3cur1ty#Token'`

:::danger API Token Requirements

Security token should contain:

- at least 8 symbols
- a lowercase letter
- uppercase letter
- a number
- a special symbol (don't use `%` or whitespace)

### Safe & Module Addresses

During initial setup, safe & module addresses will be already provided. But in the future, after you will be eligible to join the HOPR network, you will need to find safe & module addresses again.

Connect to the HOPR Staking Hub and head to the [Staking Hub overview](https://hub.hoprnet.org/staking/dashboard) page, copy safe & module addresses and fill in accordingly to the tags.

`--safeAddress <SAFE_WALLET_ADDRESS>` - Replace `<SAFE_WALLET_ADDRESS>` with Safe wallet address.

For example: `--safeAddress 0xEe8D810feAb42313Cc6E2F9DC2D9E2e55d2eb6f9`

`--moduleAddress <Module_ADDRESS>` - Replace `<Module_ADDRESS>` with Module address.

For example: `--safeAddress 0x162E596903D8524a500700AaDF3A4237124C34B7`

### Public IP

`--host <YOUR_PUBLIC_IP>:9091` - You will need to replace `<YOUR_PUBLIC_IP>` with your home network public IP, or if you are using a VPS, then VPS IP.

For example: `--host 8.8.8.8:9091`

#### How to find public ip?

Linux or mac users, open terminal and execute command: `curl ifconfig.me` it will output your public IP provided to you by your ISP.

## 3. Starting a node

After you adjusted docker command with needed variables, open terminal and make sure that docker is running by executing command: `docker --help`, if it will print out all available commands, this means your docker is running.

Now when you know that the docker is running, please execute hoprd docker command by pasting command to the terminal.

After you executed hoprd command, please wait for a little bit and find in the terminal section "Node information:", copy Node address, shut down the node (CTRL+C or commans + c) and go back to [Staking hub](https://hub.hoprnet.org) for registering on a waitlist.

## 4. Linking your node with Staking Hub

:::info
Proceed this step if you became eligible to join the HOPR network!

:::info
If you are using VPS, you will need to install [Tmux](#using-tmux), which is responsible for running applications in the background. If you are using mac os or any other machine, ignore tmux installation process.

Open terminal screen, paste [hoprd docker command](#2-configuring-docker-command) and start a node. After your node started, please proceed to [HOPR Staking Hub](https://hub.hoprnet.org) to finish onboarding process.

## Using Tmux

If you are using a VPS, it is highly recommended that you use Tmux to run your node in the background. Otherwise, your node will terminate as soon as you exit the terminal.

You can use these basic commands to set up a separate session:

(**1**) First, install Tmux.

```bash
sudo apt install tmux
```

(**2**) Enter `tmux` to open a new session.

```bash
tmux
```

That's it! You now have a new session running in the background even when you close your terminal. To navigate between sessions, you should familiarise yourself with other [Tmux commands](https://linuxize.com/post/getting-started-with-tmux/). The three main ones you will need are:

```bash
tmux ls
```

To output a list of all your open sessions.

```bash
tmux attach-session -t <session ID or name>
```

To navigate to a particular session, the first session you have created will have an id of `0`. Use the list command to view all your current sessions.

```bash
ctrl+b d
```

To exit your current session without closing it. To be clear, you press ctrl and b simultaneously, then press d after letting them go.

Please make sure you are in a newly opened session and haven't exited it before continuing.