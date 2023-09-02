---
id: start-here
title: Start here
---

# Start here

To use the HOPR network, you will need to create a `HOPR Safe` and install a `hoprd` node. There are two methods for installing a `hoprd` node, but before doing so, please read this page to ensure you are familiar with our waitlist policies and any prerequisites for running a node.

## HOPR Safe

:::caution Warning 
It is not possible to run a node without a `HOPR Safe`.
:::

You will need a HOPR Safe to securely store your funds while operating a `hoprd` node. If you have not yet created a `HOPR Safe`, please do so [here](https://hub.hoprnet.org/). 

**Note:** You will need a minimum of 30,000 wxHOPR (10,000 wxHOPR if you have a Network Registry NFT) to run a node on the HOPR network. You can find options to purchase the necessary tokens [here](../staking/how-to-get-hopr.md).

<!-- Add a link to Waitlist FAQ what is NR NFT -->

## Waitlist

The Dufour release is currently permissioned. You will only be able to interact with other nodes once you have been added to the network by the HOPR association. This will likely take 1-2 weeks but may vary depending on your stake and whether or not you have a Network Registry NFT. You can find the full details for this process [here](./waitlist-FAQ.md).

## Hardware requirements

The minimum requirements for running `hoprd` on your device:

- Dual Core CPU ~ 2 GHz
- 4 GB RAM
- at least 3 GB Disk Space

Although it is recommended that you have at least 8 GB of RAM and 10 GB of disk space.

## For VPS/Windows Users

Using a VPS is recommended if you are on Windows, as all the instructions for installing your node are for Linux/macOS users. A VPS, in general, is an ideal setup as you can use Tmux or Screen to run your node constantly in the background without needing your machine to be plugged in or turned on. 

Installing your node through Docker will only run until you close your terminal for both your local machine and a VPS. This is why it is highly recommended you quickly familiarise yourself with [tmux](https://linuxize.com/post/getting-started-with-tmux/) or [screen](https://linuxize.com/post/how-to-use-linux-screen/) before continuing.

If you intend to run your node locally, try and use a setup where your PC or machine can stay plugged in throughout the day. Otherwise, you can use a plug-n-play device such as [Dappnode](https://dappnode.com/collections/frontpage/products/hopr-special-edition), which you can plug in and forget about.

## Avado Support

Avado is no longer supported with the release of Dufour. Any software found on the Avado store is outdated and will not allow you to interact with anyone within the Dufour network. If you have an Avado device, it is strongly recommended you migrate its operating system to DappnodeOS. You can do so using the guide [here](./using-avado.md#transitioning-to-dappnode).

## hoprd installation methods

We support two distribution mechanisms to install `hoprd`:

**[Dappnode](using-dappnode)**

A [Dappnode](https://dappnode.io/) plug-n-play device, another quick setup and installation.

**[Docker](using-docker)**

Using [Docker](https://www.docker.com/), you can run `hoprd` on your device or a VPS.

You will interact with your node through the same Node Admin UI regardless of your installation method. All details for this can be found in the respective installation sections.
