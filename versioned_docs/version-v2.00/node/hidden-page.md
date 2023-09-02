---
id: hidden-page
title: Hidden Page
---

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

