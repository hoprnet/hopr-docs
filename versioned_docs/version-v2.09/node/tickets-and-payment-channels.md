---
id: tickets-and-payment-channels
title: Tickets & Payment Channels
---

## Payment channels & path selection

A direct message is not mixed or private. To make your message private, you must send it through other nodes.

To use another node on the network to relay data, you have to pay them for their service in HOPR tokens. This is where payment channels come in.

### Payment channels

Payment channels are funded edges between two nodes. They are a link between two nodes with some HOPR tokens staked in them to pay the nodes that relay data for the sender.

![payment channel](/img/node/payment-channel-hopr-white.png)

**_Note:_** Channels are unidirectional; opening this channel does not mean a channel from Betty to your node exists.

![Channel direction](/img/node/channel-direction-hopr-white.png)

Only one channel can exist in a single direction between two nodes. You can have both a channel from Betty → Chāo & Chāo → Betty but not more than one channel from Betty → Chāo.

Once you have opened a channel to Betty, trying to open another one will fail.

### Send a 1-HOP message

Now that you have an open channel with Betty, you can use them as an intermediary node to relay your message.

In this example, we’re using Betty’s node to relay a message back to ourselves. This works because the last HOP to the receiver doesn’t require funding. So is possible without an open payment channel.

This is also why 0-HOP/direct messages are possible without open payment channels.

![1-HOP message](/img/node/1-hop-hopr-white.png)

This is a manually selected 1-HOP path. If you try and replicate this with Chāo, it should fail as you have no open channels with Chāo.

### Maximum HOP length

You can use more than one node as an intermediary, with a maximum of three. The HOPR network will only select 3-HOP paths when you use automatic pathing; all longer paths will not be considered and will also fail in manual path selection.

Longer paths require more information to be stored in packet headers, which makes them distinguishable from standard relays. This difference in packet header is a metadata leak that HOPR tries to avoid.

0-HOP, 1-HOP and 2-HOP paths use padded headers to stay consistent with this requirement but are not as mixed or as private as a 3-HOP path. But for the purpose of this walkthrough they are fine.

### Send a 2-HOP message

For a 2-HOP to work, every node in the path must have a channel open with the next node in the path, excluding the last channel to the receiver.

So a 2-HOP message to yourself through Betty and Chāo: me → Betty → Chāo → me would require channels to be open from me → Betty & Betty → Chāo (me → Betty → Chāo). The final channel from Chāo → me is not required as the last HOP of a relay is not incentivised. We assume that the reciever has an inherant desire to receive messages.

![2-hop-success](/img/node/2-hop-success-hopr-white.png)

If it fails to send, it is likely, that Betty does not have a channel open to Chāo (Betty → Chāo) since you should have a channel open to Betty (me → Betty) with sufficient funds staked.

![2-hop-fail](/img/node/2-hop-fail-hopr-white.png)

### Path directionality

Even if the message succeeds, you should note that you won’t be able to make this 2-HOP message in the other direction as you don’t have an open channel with Chāo. And Chāo may not have an open channel with Betty.

![Reverse route](/img/node/reverse-directionality-hopr-white.png)

Here the first route is viable, whereas the second route will fail.

### Path with consecutively repeating nodes

You can not have consecutively repeating nodes. For example, me → Betty → Betty → Zoë.

![Consecutively repeating node](/img/node/consecutively-repeating-hopr-white.png)

This is also why the first node specified on a path cannot be yourself, as you are also the sending node.

### Automatic pathing

So far, we have used manually selected paths by entering the whole path into the command. Instead of this, we can instead let HOPR find a path for the relay.

Automatic pathing will only look for 3-HOP paths from you to the receiver. If none exist or you don’t have sufficient funds staked in the first channel of the relay, it will fail.

**_Note:_** Automatic pathing will discard any repeating nodes even if they are non-consecutive. With manual path selection, you can repeat nodes non-consecutively: me → Betty → Chāo → Betty → me

But this will also throw a warning as it is less than ideal for most relays.

The easiest way to increase your pathing options is to switch your strategy from passive to promiscuous.

## Tickets

Although you spend HOPR tokens to relay data, you are actually paid in tickets. Some tickets contain a range of HOPR tokens, but most are useless. The point of this is that over a sizeable amount of tickets, the payment for your services will converge to the amount you would have received.

But with the added benefit of:

- massively reduced on-chain transactions (letting you keep more of the payment)
- And a decoupling of interactions on the HOPR network from on-chain data (increasing privacy)

### Ticket redemption

Tickets are redeemed automatically, so the tickets which contain value will be converted to HOPR tokens and added to the balance of the node used for that relay. The rest are discarded with no trace left on the blockchain.

If a channel exists in both directions between consecutive nodes on the relay, the ticket is redeemed into the following nodes channel instead of its balance.

![tickets-channels](/img/node/tickets-channels-hopr-white.png)

In the above example, you, as the sender, will create two tickets of value 0.02 HOPR to pay for the entire relay. Since no channel exists from Betty -> me, the tickets are redeemed into Betty's node. Betty now generates a ticket of value 0.01 HOPR to pay for the remaining relay, and since a channel does exist from Chāo -> Betty, the ticket is redeemed into this channel instead of Chāo's balance.

Chāo then sends the message to Zoë and does not generate a ticket for the last HOP of the relay.

By redeeming tickets into channels, nodes are keeping healthy connections funded. In the long run, this means your node will be more active on the network earning more HOPR!

When channels are closed, all staked tokens are added to your balance and from there can be withdrawn to an external wallet.