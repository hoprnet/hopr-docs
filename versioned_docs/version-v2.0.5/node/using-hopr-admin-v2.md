---
id: using-hopr-admin-v2
title: Using HOPR Admin
---

The HOPR Admin provides a graphical interface you can use to interact with your node as well as diagnose any potential issues. HOPR Admin is provided with the Dappnode HOPR package by default, so no seperate action is needed, but for Docker users you will need to run an extra command to install HOPR Admin before you can access it.

## Installing HOPR Admin UI (For Docker Users Only)

If you have installed HOPR through the Dappnode setup, you do not need to install HOPR Admin seperately and can skip to [accessing HOPR Admin](./using-hopr-admin-v2.md#accessing-hopr-admin).

(**1**) Ideally you would run the following Docker command within a tmux session, so it can run in the backround uninterupted. You can set up tmux using the instructions [here](./hidden-page.md#using-tmux).

(**2**) Open your terminal and paste the following Docker command to start HOPR Admin:

```bash
docker run -d --restart always -p 3000:80 --pull=always europe-west3-docker.pkg.dev/hoprassociation/docker-images/hopr-admin:latest
```

That's all! You should have HOPR Admin started by now and can [access it through your browser](./using-hopr-admin-v2.md#accessing-hopr-admin).


## Accessing HOPR Admin

### For Dappnode Users

HOPR Admin already comes with the HOPR package on Dappnode so you can access it through `Packages`.

(**1**) Go to `Packages` and click on `HOPR`.

![Dappnode package UI](/img/node/dappnode-package-UI.png)

(**2**) Once inside, click on `UI` to open the HOPR Admin.

(**3**) Then connect your node as suggested [here](./using-hopr-admin-v2.md#connecting-your-node).

### For Docker Users

Assuming you used the default port numbers, you should be able to access the HOPR Admin at [http://localhost:3000](http://localhost:3000) (replace `localhost` with your `server IP address` if you are using a VPS, for example `http://142.93.5.175:3000`).

This is assuming you stuck to the default port numbers when setting up your node.

## Connecting Your Node

To use HOPR Admin UI, you first need to connect to your HOPR node.

![Node Admin Initial Screen](/img/node/node-admin-initial-screen.png)

(**1**) On the top right corner of the initial HOPR Admin screen, click on `CONNECT TO NODE`.

![Node Admin Connect Node](/img/node/node-admin-connect-node.png)

(**2**) Under "Node credentials:" do the following:

- Under the `Local name` field, give this node a nickname. This is optional but may be useful if you are running multiple nodes.
- Under the `API endpoint` field, by default api endpoint should be set to `http://localhost:3001`, but you may need to replace `localhost` with your server IP address if you used a VPS and change the port if you adjusted the mapping on installation. For dappnode users this should be set to `http://node.hopr.public.dappnode:3001` by default.
- Under the `API token` field, if you are using Docker, enter the [custom security token you created](./using-docker.md#21-adjust-the-api-token). If you are using dappnode, by default it is set to: `!5qxc9Lp1BE7IFQ-nrtttU`.

**Note:** If you want to save your node credentials to login easier in the future, tick `Save API token locally (unsafe)` and click `Save`.

By clicking on the button `Connect to the node` you should connect to your node. If your connection was unsuccessful please refer to the [Troubleshooting Issues section](./using-hopr-admin-v2.md#troubleshooting-issues).

## Using HOPR Admin

### INFO

After you have [connected your node](./using-hopr-admin-v2.md#connecting-your-node), you will be redirected to the node info section of the HOPR Admin. This is a great page to get all the high-level information about your node and its performance.

#### Network

Under `Network`, it shows your node's eligibility to participate in the HOPR network along with your node's connectivity status.

**Eligibility** - True or false, tells you whether or not you are registered on the Network.

**Connectivity Status** - Unknown, Red, Orange, Yellow or Green. Depending on the health of your connection to the network.

- `unknown`: Initial value when the node is started. It means the connectivity could not be assessed.
- `Red`: No connection to any nodes at all.
- `Orange`: Low-quality ({'<='} 0.5) connection to at least one public node.
- `Yellow`: High-quality connection to at least one public node.
- `Green`: High-quality connection to at least one public node and at least one non-public node.

The `connection`, in this case, means a node's ability to complete a ping/pong regardless of whether they are sending or receiving the ping.

And connection quality is measured from 0 to 1 based on the ratio of successful pings to the total number of pings. E.g. a node that responds to half of all pings it receives from node A will have a connection quality of 0.5 to node A.

Low-quality connection: {'<='} 0.5
High-quality connection: > 0.5

#### Balances

There are 2 token types:

- `native` tokens: This will show the native tokens used to pay gas fees, currently xDAI. For example, opening and closing payment channels would require on-chain transactions paid for in xDAI.
- `hopr` tokens: These HOPR tokens fund payment channels/pay nodes to relay data.

#### Addresses

All the relevant addresses for operating your node.

- **Node PeerID** - what other nodes on the network will use to interact with your node—an address for them to ping or send data.
- **Node Address** - Your node's Ethereum address used to store native tokens.
- **hoprToken** - The wxHOPR token smart contract.
- **hoprChannels** - The HOPR channels smart contract, used for payment channel related on-chain activity, such as the openning an closing of payment channels, redeeming tickets etc.

#### Software

Your node's current HOPRd version and the environment it is running on.

#### Channels

Shows the number of opened incoming & outgoing channels to and from this node.

#### Nodes on the network

- **Announced** - The number of total announced nodes on the HOPR network which are visible to the your node.
- **Connected** - The number of visible nodes which have a connection to your node.

#### Aliases

The number of aliases you have assigned.

### TICKETS

Ticket statistics displays information about your redeemed and unredeemed tickets. Tickets are earned by relaying data and can be redeemed for HOPR tokens.

### METRICS

- **Total ping time** - Displays the total time a single ping takes to complete (seconds).
- **Start-up time** - Displays the start-up time for your node (seconds).
- **Time to reach high-level connection** - Displays the time it takes your node to reach a GREEN connection status (seconds).
- **Received message latencies** - Displays the latencies of received messages (seconds).
- **Peers by quality** - Displays your visible peers categorized by their connection quality.

### CONFIGURATION

- **Include Reciepient** - If you want the receiver of your messafe to know who sent it, ensure that you’ve set it to true. Because by default all messages are anonymous. Setting this to true will attach your PeeerID to your message.
- **Strategy** - By default, your node runs in passive mode, this means that your node will not attempt to open or close any channels automatically. When you set your strategy to promiscuous mode, your node will attempt to open channels to a randomly selected group of nodes which you have a healthy connection to. At the same time, your node will also attempt to close channels that are running low on balance or are unhealthy.

### PEERS

This will show a list of nodes that are visible to your node. Next to each peerID, there are buttons allowing you to interact with the nodes directly through the interface:

- **Ping node** - To send the selected node a ping and measure the latency.
- **Add new alias** - iTo assign a nickname/alias to the node.
- **Open outgoing channel** - To create a payment channel from your node to the selected node.
- **send message** - To send a message to the selected node either directly or via a randomized route. You can choose the number of intermediaries or `hops` (maximum 3).

If you haven't found a node on the list and you want to ping it, you'll find the **Ping Node** button at the top. This button allows you to ping any node, even if it's not on your node list.

You also have the ability to export the entire list of peers to a CSV file.

### ALIASES

You can use the alias command to give an address a more memorable name. Also you can import / export a list of all current aliases.

### MESSAGES

You can see a list of received messages and interact with them. Also you can send a message to any recipient on a HOPR network. By clicking on the button **send message**, this will prompt a message form window to open with the following fields:

- **Receiver (Peer Id)** - To send the message, you will need to provide recipient's peerID.
- **Message** - Type the message you would like to send.
- **Send mode** - you can send in 3 modes:

    - **direct message** - this mode will use 0-hops, sending a direct message means it is free of charge, because it is not mixed or private.
    - **automatic path** - When sending a message using the automatic path, it will automatically find 3 nodes through which it will relay the message. This is the most secure mode.
    - **number of hops** - You need to specify the number of hops through which it will relay the message, and it will try to find a route automatically.
    - **path** - you can also specify a specific path of nodes through which you want to relay the message.

### CHANNELS: IN

This will display a list of open payment channels from other nodes to your node. Next to the peerID, you can either ping it or open a channel from your end.

### CHANNELS: OUT

This will display a list of open payment channels from your node to other nodes on the HOPR network. Next to the peerID, you can either ping the selected node or close your payment channel to them.

- **closing channel** - To close a payment channel, you'll need to perform two actions. First, when you click `Close the channel`, it will initiate the closure. After 5 minutes, you'll need to click a second time to finalize the payment channel closure.
- **open outgoing channel** - By specifying the node address (0x...) and HOPR amount, you can open a payment channel to the specified node.
- **open multiple outgoing channels** - You can prepate a csv file to open multiple payment channels in bulk.
- **fund outgoing channel** - By specifying the node address (0x...) and HOPR amount, you can fund an outgoing payment channel with additional wxHOPR.
- **export outgoing channels as a CSV** - You can export the entire list of outgoing payment channels as a CSV file.

## Troubleshooting Issues

Here is a list of the most common known issues and how to resolve them.

### UNAUTHORIZED/Authenticaltion Failed

If you provided incorrect security token, you will receive an error similar to the following:

```bash
ERROR
Unable to connect.
Error fetching: {"status":"UNAUTHORIZED","error":"authentication failed"}
```

### Network Request Failed

If HOPR Admin can't connect to your node, please check if the provided `API endpoint` is correct, or if your node is working. If either is a problem, You will receive an error similar to the following:

```bash
ERROR
Unable to connect.
Unknown error: "Network request failed"
```

### Balance Too Low

When your node has just been created, it will not be funded. You can't connect and unfunded node and should return after having completed the entire onboarding process.

```bash
ERROR
Unable to connect.
Your xDai balance seems to low to operate the node.
Please top up your node.
Address: 0xa6512ad...657730b0313
```
