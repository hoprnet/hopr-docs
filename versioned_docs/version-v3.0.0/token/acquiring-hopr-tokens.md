---
id: acquiring-hopr-tokens
title: Acquiring HOPR Tokens
group: h-no-count
---

## Overview

When the HOPR token was initially launched, it was deployed on the Ethereum blockchain. However, due to rising gas prices on Ethereum, the HOPR team sought more cost-effective alternatives for utilizing the HOPR token within their protocol. As a result, the [Gnosis Chain](https://www.gnosis.io), known for its lower transaction costs, emerged as a favorable option for the HOPR protocol.

## HOPR tokens on different chains

![HOPR token on Gnosis & mainnet](/img/token/HOPR-Gnosis-mainnet-tokens.png)

| Token Symbol | Blockchain | Smart Contract Address | Description |
|--------------|------------|------------------------|-------------|
| **HOPR**     | Ethereum Mainnet | [0xf5581dfefd8fb0e4aec526be659cfab1f8c781da](https://etherscan.io/token/0xf5581dfefd8fb0e4aec526be659cfab1f8c781da) | The initial token, traded on the Ethereum Mainnet. |
| **xHOPR**    | Gnosis Chain | [0xD057604A14982FE8D88c5fC25Aac3267eA142a08](https://gnosisscan.io/token/0xD057604A14982FE8D88c5fC25Aac3267eA142a08) | Traded on Gnosis Chain; facilitates lower transaction costs. It can be [wrapped to wxHOPR](token-wrapping.md).|
| **wxHOPR**   | Gnosis Chain | [0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1](https://gnosisscan.io/token/0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1) | Used to operate HOPR nodes. It can be [unwrapped to xHOPR](token-wrapping.md). |

## Acquiring HOPR tokens

### On the Ethereum mainnet (HOPR)

| Exchange   | Exchange Type | Trading Pair |
|------------|---------------|--------------|
| Uniswap v3 | DEX           | [DAI/HOPR](https://app.uniswap.org/swap?inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f&outputCurrency=0xf5581dfefd8fb0e4aec526be659cfab1f8c781da) |
| Coinbase   | CEX           | [USD/HOPR](https://www.coinbase.com/en-gb/advanced-trade/spot/HOPR-USD) |
| AscendEX   | CEX           | [USDT/HOPR](https://ascendex.com/en/cashtrade-spottrading/usdt/hopr) |

### On the Gnosis chain (xHOPR)

| Exchange   | Exchange Type | Trading Pair |
|------------|---------------|--------------|
| CowSwap    | DEX           | [WXDAI/HOPR](https://swap.cow.fi/#/100/swap/WXDAI/HOPR) |
| Swapr      | DEX           | [WXDAI/HOPR](https://swapr.eth.limo/#/swap/pro?chainId=100&inputCurrency=0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d&outputCurrency=0xD057604A14982FE8D88c5fC25Aac3267eA142a08) |
| AscendEX   | CEX           | [USDT/HOPR](https://ascendex.com/en/cashtrade-spottrading/usdt/hopr) |

For a broader list of exchanges that support HOPR trading, consider visiting [CoinGecko](https://www.coingecko.com/en/coins/hopr) and [CoinMarketCap](https://coinmarketcap.com/currencies/hopr/).

## Operating HOPR nodes

List of required tokens for operating a HOPR node.

| Token Required | Description |
|----------------|-------------|
| **xDai (native)** | Essential for on-chain fee payments during activities such as redeeming tickets, and managing payment channels. For information on acquiring xDai tokens, you can refer to the [xDai token information on the Gnosis Chain website](https://docs.gnosischain.com/about/tokens/xdai).|
| **wxHOPR (hopr)** | Required for initial stake to operate nodes, and for opening outgoing channels to relay data across the network. |