---
id: starting-local-cluster
title: HOPR Cluster Development Setup
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The best way to learn and develop the HOPR protocol is by interacting with a HOPR node connected inside the HOPR network.
A series of HOPR nodes fully interconnected with each other is called a HOPR cluster.

You can run a HOPR cluster locally for development. This will let you replicate core functionality such as ticket redemption and packet relaying.

## Requirements

:::info INFO

MacOS M1 users will need to follow an extra set of instructions from [NVM](https://github.com/nvm-sh/nvm#macos-troubleshooting) to allow them to use Node.js 16.

Node.js should be compiled under x64 architecute.

:::

You can run a HOPR cluster locally or use [Playground](https://playground.hoprnet.org/) without any installations. A local setup has only been tested for Linux and macOS, if you are using Windows it is recommended to either use Playground or a VM.

## Use the latest release

Due to the rapid development done on the project, you might be better off using a stable
release. The latest stable release known at the time of writing is [`Bratislava`](https://github.com/hoprnet/hoprnet/archive/refs/heads/release/bratislava.zip).

## Which setup should I use?

- [Playground](./starting-local-cluster.md#playground) is the preferred setup for most dApp developers. You can launch a fully interconnected cluster without installation or funding and test with the generated endpoints and API Keys.

- [Local setup:](./starting-local-cluster.md#local-setup) is a setup used by our core developers. It requires installing Rust and quite a few dependencies and is generally a much longer setup but still relatively simple if you are on Linux or macOS. This comes with the advantage of not having to launch a new cluster every 20 minutes, as Playground clusters only last 20 minutes at a time.

- [Docker setup](./starting-local-cluster.md#docker-setup) is a new local setup which is faster and easier to use than the original. 

**Note:** Playground uses HTTPS/WSS, and the local setup uses HTTP/WS.

Your ideal setup will depend on your personal preferences and what operating system you are using, as Windows is not well supported/tested with our local setup.

## Local Setup

Running a local setup will give you a similar setup to the one the HOPR team works with on a daily basis. After all dependencies are installed,
this configuration will allow you to develop HOPR apps offline.

1. **Download the latest version of the repository**: Download a local version of our [GitHub repository monorepo](https://github.com/hoprnet/hoprnet/tree/release/bratislava)
   with the latest release (`bratislava` at the time of writing) and unzip it in your local folder. For the next tasks, we will assume you are within that folder.

```bash
wget https://github.com/hoprnet/hoprnet/archive/refs/heads/release/bratislava.zip
unzip bratislava.zip
cd hoprnet-release-bratislava
```

2. **Install the dependencies of the project and build it**:

In order to install and build the required packages and project modules, make sure you have installed:

- `nodejs@16` (we suggest installing it via [nvm](https://github.com/nvm-sh/nvm), i.e., `nvm install lts/gallium`), and `yarn` (included in `nodejs@16` by running `corepack enable`)
- [Rust toolchain](https://www.rust-lang.org/tools/install) (at least 1.60)

Ideally you will also have basic development toolsets[^1] set up on your computer. If you have installed the above, run the following command. Please bear in mind that this process will take at least 5-10 minutes depending on your computer.

```bash
make deps build
```

3. **Run the one-line setup script**:

Before running the script make sure you have:

- Both `curl` and `jq` installed
- A version of `bash` running that is `5.x` or higher, which for most macOS devices will require an upgrade. The easiest way to do this is via `brew bash`

Run the following script:

```bash
./scripts/setup-local-cluster.sh -i topologies/full_interconnected_cluster.sh
```

Please wait while this script creates
the local blockchain network and deploys the project contracts. On average, the process can take between 2-6 minutes, depending on your computer.

If you are planning to run [MyneChat](http://app.myne.chat/)
alongside your cluster, then make sure to pass the `-m` flag with your MyneChat instance URL, i.e.:

```bash
./scripts/setup-local-cluster.sh -m "http://app.myne.chat" -i topologies/full_interconnected_cluster.sh
```

As the script runs, a set of accounts with their respective HTTP REST API, HOPR Admin, and WebSocket interfaces will be displayed
on your screen. As soon as the script finishes starting up the local cluster, it will suggest that you `source` the `local-cluster.env` file.
This should be done in each terminal you'll be communicating with the local cluster nodes as it will set up all the environment variables
necessary for the following pages.

Alternatively, you can copy and paste these URLs and `export` them to your terminal:

```bash
export apiToken=^^LOCAL-testing-123^^
export HOPR_NODE_1_HTTP_URL=http://127.0.0.1:13301 HOPR_NODE_1_WS_URL=ws://127.0.0.1:13301/api/v2/messages/websocket
export HOPR_NODE_2_HTTP_URL=http://127.0.0.1:13302 HOPR_NODE_2_WS_URL=ws://127.0.0.1:13302/api/v2/messages/websocket
export HOPR_NODE_3_HTTP_URL=http://127.0.0.1:13303 HOPR_NODE_3_WS_URL=ws://127.0.0.1:13303/api/v2/messages/websocket
export HOPR_NODE_4_HTTP_URL=http://127.0.0.1:13304 HOPR_NODE_4_WS_URL=ws://127.0.0.1:13304/api/v2/messages/websocket
export HOPR_NODE_5_HTTP_URL=http://127.0.0.1:13305 HOPR_NODE_5_WS_URL=ws://127.0.0.1:13305/api/v2/messages/websocket
```

## Docker Setup 

The Docker setup will give you a similar setup to what the HOPR devs use on a daily basis. 

1. **Make sure you have Docker installed**:

Before doing anything else, you need to install **Docker** on your machine.

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

2. **Start up the cluster**:

With Docker installed, you can create a fully interconnected cluster of nodes with the single command:

```
docker run -ti -p 13301-13305:13301-13305 gcr.io/hoprassociation/hopr-pluto:2.0.2
```

As the script runs, a set of accounts with their respective HTTP REST API, HOPR Admin, and WebSocket interfaces will be displayed
on your screen. As soon as the script finishes starting up the local cluster, it will suggest that you `source` the `local-cluster.env` file.
This should be done in each terminal you'll be communicating with the local cluster nodes as it will set up all the environment variables
necessary for the following pages.

Alternatively, you can copy and paste these URLs and `export` them to your terminal:

```bash
export apiToken=^^LOCAL-testing-123^^
export HOPR_NODE_1_HTTP_URL=http://127.0.0.1:13301 HOPR_NODE_1_WS_URL=ws://127.0.0.1:13301/api/v2/messages/websocket
export HOPR_NODE_2_HTTP_URL=http://127.0.0.1:13302 HOPR_NODE_2_WS_URL=ws://127.0.0.1:13302/api/v2/messages/websocket
export HOPR_NODE_3_HTTP_URL=http://127.0.0.1:13303 HOPR_NODE_3_WS_URL=ws://127.0.0.1:13303/api/v2/messages/websocket
export HOPR_NODE_4_HTTP_URL=http://127.0.0.1:13304 HOPR_NODE_4_WS_URL=ws://127.0.0.1:13304/api/v2/messages/websocket
export HOPR_NODE_5_HTTP_URL=http://127.0.0.1:13305 HOPR_NODE_5_WS_URL=ws://127.0.0.1:13305/api/v2/messages/websocket
```

3. **Setup HOPR-Admin**:

You will have to seperately launch HOPR-Admin. You can do this using the following command:

```
docker run -d --name hopr_admin -p 3000:3000 gcr.io/hoprassociation/hopr-admin
```

## Playground

Instead of setting up a cluster locally, you can launch a cluster without any installations at [playground.hoprnet.org](https://playground.hoprnet.org/)

Clusters launched through Playground are fully interconnected and prefunded similar to the described local setup.
But will only run for 20 minutes at a time before closing. This is a good alternative for testing and devloping dApps. Simply use the nodes API URL and key when connecting to a node.

![Playground Cluster](/img/developer/playground-testing-node.png)

Here the API URL of the node is `https://zero_olive_mekong_ananke.playground.hoprnet.org:3001`, and the API Key is `4a0cc9838A08F2DE#F00cd59`.

So we would export:

```bash
export apiToken=4a0cc9838A08F2DE#F00cd59
export HOPR_NODE_1_HTTP_URL=https://zero_olive_mekong_ananke.playground.hoprnet.org:3001 HOPR_NODE_1_WS_URL=wss://zero_olive_mekong_ananke.playground.hoprnet.org:3001/api/v2/messages/websocket
```

**Note:** Playground uses HTTPS and WSS, but I used the variable names `HOPR_NODE_1_HTTP_URL` & `HOPR_NODE_1_WS_URL` for consistency with other written examples. The actual endpoints are HTTPS/WSS.

[^1]: If you have installed and built another `node.js` application from your computer in the past, you likely will not need to do anything else. However, in the case your are only starting to develop in `node.js`, there's a high chance you might need to install a few extra tools. For instance, in `Linux`-based OS, you will likely also need to install `build-essentials` (e.g. in Ubuntu do `apt-get install build-essentials`), whereas in `macOS` you need Xcode developer tools, installable via `xcode-select --install`.
