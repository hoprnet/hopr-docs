---
id: port-forwarding
title: Port forwarding
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## When do you need to setup port forwarding?

If you're running a HOPRd node on your local machine or Dappnode, you're likely behind NAT (Network Address Translation), which is commonly used in home and office networks to allow multiple devices to share a single public IP address; this setup hides the internal IP addresses from the external network. To make your node reachable by external peers, you'll need to expose a specific port to the public; otherwise, your node won't be able to connect to other nodes.

## When you don't need to setup port forwarding?

- If you're running a HOPRd node on a VPS, there's no need to set up port forwarding.
- We strongly recommend **not** port forwarding your REST API port (**default port is 3001**) unless you're using a "**Secret token**" for secure connections. If you're using a VPS, make sure the **3001** port is not exposed to the public for security reasons.

## How to configure port forwarding?

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

To access your router admin, you will need to find your router's default gateway IP address. Please select operating system:

<Tabs>

<TabItem value="linux_router_gateway" label="Linux">

(**1**) Open your terminal window.

(**2**) Execute the command: 

```md
ip route show default | awk '/default/ {print $3}'
```

It will print out your router's gateway IP address. Commonly, the gateway IP addresses of your router are **192.168.1.1** or **192.168.0.1**

(**3**) Enter the router's gateway IP address into the browser. This will load the login screen to your router, and usually, it should show the model of your router.

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

### 3. Setting up port forwarding on your router

(**1**) Please access your router's admin interface by entering [your gateway IP address](./port-forwarding.md#2-find-your-routers-gateway-ip-address) into your browser.

(**2**) Each router brand will have its own method of setting up port forwarding, but it usually should not be very difficult. Here is a list of instructions for the most popular router brands:

- [TP-Link Router](https://www.tp-link.com/us/support/faq/134/)

- [Netgear Router](https://kb.netgear.com/24290/How-do-I-add-a-custom-port-forwarding-service-on-my-NETGEAR-router)

- [Linksys Router](https://www.linksys.com/dk/support-article/?articleNum=138535)

- [Asus Router](https://www.asus.com/support/FAQ/1037906/)

(**3**) Then setup port forwarding using the following settings:

- **Internal Ip address**: [Internal IP address](./port-forwarding.md#1-find-the-internal-ip-address) of your machine which is running HOPRd node.

- **Protocol**: You will need to setup port forwarding for both **TCP** & **UDP**.

- **Internal & external port**: Use **9091** for both the internal and external ports. If you are running multiple nodes on the same machine, you will need to assign different ports for each node.

Example of how port forwarding settings looks like:
![Portforwarding rule](/img/node/asus-port-forwarding.png)