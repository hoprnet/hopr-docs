---
id: dapps-mytokentracker
title: MyTokenTracker
---

## What does MyTokenTracker do?

MyTokenTracker which is built on the top of the HOPR protocol shows how Ethereum (d)app users can be identified by linking their Ethereum address to their IP address and the dApp they are using, without needing to access any Ethereum blockchain data directly.

## How to use MyTokenTracker?

1. Visit the MyTokenTracker website: [https://mytokentracker.xyz](https://mytokentracker.xyz).

2. Enter an Ethereum address that holds assets and click "**Tracker Search**."

The tool will display all the assets linked to the entered address on the left side of the screen. As these assets load, it also loads specific asset icons, which can reveal your IP address. This information is displayed on the right side of the screen, exposing a metadata leak.

For example, if you use a DEXs like Uniswap, asset logos are being loaded by making request from your computer, making it easy to link your Ethereum address and IP address.

![MyTokenTracker shows data leak](/img/dapps/mytokentracker-leaked-info.png)

3. To prevent your IP address from being exposed, use the HOPR mixnet. Click "**I'm feeling private**" to see how this works. On the right side of the screen, you'll notice that your IP address is no longer visible in the logs.

![MyTokenTracker using HOPR mixnet prevents data leakage](/img/dapps/mytokentracker-no-leak.png)





