---
id: port-forwarding
title: Port Forwarding
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## When do you need to set up port forwarding?

- If you're running a HOPRd node on your local machine or Dappnode, you're likely behind NAT (Network Address Translation), which is commonly used in home and office networks to allow multiple devices to share a single public IP address; this setup hides the internal IP addresses from the external network. To make your node reachable by external peers, you'll need to expose a specific port to the public; otherwise, your node won't be able to connect to other nodes.

- If you plan to use **[GnosisVPN PoC](https://gnosisvpn.com)**, you will need to **expose the UDP port** on your HOPRd node to enable external access. Additionally, ensure your **REST API port** is accessible so you can interact with your node from outside your local network.

## When you don't need to set up port forwarding?

- If you're running a HOPRd node on a VPS, you don't need to set up port forwarding.
- We strongly recommend **not** forwarding your REST API port (**default port is 3001**) unless you're using a "**Secret token**" for secure connections. If you're using a VPS, ensure that port **3001** is not exposed to the public for security reasons.

## How to configure port forwarding

### 1. Find the internal IP address

Determine the internal IP address of your machine running HOPRd. Please select your operating system or device:

<Tabs>
<TabItem value="linux_port_forwarding" label="Linux">

(**1**) Open your terminal window.

(**2**) Run the following command:

```md
hostname -I | cut -d' ' -f1
```

(**3**) The output should show your node's internal IP address.

Example:

```md
192.168.5.68
``` 
</TabItem>
<TabItem value="macOS_port_forwarding" label="macOS">

(**1**) Open your terminal window.

(**2**) Run the following command:

```md
ifconfig | grep -Fv 127.0.0.1 | grep -m 1 "inet " | awk '{print $2}'
```

(**3**) The output should show your node's internal IP address.

Example:

```md
192.168.5.68
```
</TabItem>
<TabItem value="dappnode_port_forwarding" label="Dappnode">

(**1**) Connect to your Dappnode dashboard

(**2**) On the top right corner, click on the rounded pixeled circle (4th from the right) and note the internal IP address.

![Dappnode internal IP address](/img/node/dappnode-internal-ip.png)

Example:

```md
192.168.5.68
```
</TabItem>
</Tabs>

### 2. Find your routers gateway IP address

To access your router's admin interface, you will need to find your router's default gateway IP address. Please select your operating system:

<Tabs>

<TabItem value="linux_router_gateway" label="Linux">

(**1**) Open your terminal window.

(**2**) Execute the command: 

```md
ip route show default | awk '/default/ {print $3}'
```

The output will display your router's gateway IP address. Commonly, the gateway IP addresses are **192.168.1.1** or **192.168.0.1**.

(**3**) Enter the router's gateway IP address into your browser. This will load the login screen for your router, and it should usually display the model of your router.

</TabItem>
<TabItem value="mac_router_gateway" label="macOS">

(**1**) Open your terminal window.

(**2**) Execute the command: 

```md
route -n get default | grep 'gateway' | awk '{print $2}'
```

It will print out your router's gateway IP address. Commonly, the gateway IP addresses of your router are **192.168.1.1** or **192.168.0.1**

(**3**) Enter the router's gateway IP address into the browser. This will load the login screen to your router, and usually, it should show the model of your router.

</TabItem>
<TabItem value="windows_router_gateway" label="Windows">

(**1**) Open your command prompt window.

(**2**) Execute the command: 

```md
ipconfig | findstr /i "default gateway"
```

It will print out your router's gateway IP address. Commonly, the gateway IP addresses of your router are **192.168.1.1** or **192.168.0.1**

(**3**) Enter the router's gateway IP address into the browser. This will load the login screen to your router, and usually, it should show the model of your router.

</TabItem>
</Tabs> 

### 3. Set up port forwarding on your router

(**1**) Access your router's admin interface by entering [your gateway IP address](./port-forwarding.md#2-find-your-routers-gateway-ip-address) into your browser.

(**2**) Each router brand will have its own method for setting up port forwarding, but it should usually be straightforward. Here is a list of instructions for the most popular router brands:

- [TP-Link Router](https://www.tp-link.com/us/support/faq/134/)

- [Netgear Router](https://kb.netgear.com/24290/How-do-I-add-a-custom-port-forwarding-service-on-my-NETGEAR-router)

- [Linksys Router](https://www.linksys.com/dk/support-article/?articleNum=138535)

- [Asus Router](https://www.asus.com/support/FAQ/1037906/)

(**3**) Set up port forwarding using the following settings:

- **Internal Ip address**: The [internal IP address](./port-forwarding.md#1-find-the-internal-ip-address) of your machine running the HOPRd node.

- **Protocol**: You will need to set up port forwarding for both **TCP** and **UDP**.

- **Internal and external port**: Use **9091** for both the internal and external ports. If you are running multiple nodes on the same machine, you will need to assign different ports for each node.

Example of how port forwarding settings looks:

![Portforwarding rule](/img/node/asus-port-forwarding.png)