---
id: hidden-page
title: Additional Information
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

## Find Your Public IP Address

### For Linux or macOS

(**1**) Open the terminal

(**2**) Copy, paste and execute the following command: 

```bash
curl ifconfig.me
```

(**3**) Note your public IP address from the output

<!-- INSERT SCREENSHOT -->

### For VPS Users

- VPS users should be able to find their IP address from their provider. It will also be your VPS IP, so it should be easy to find.

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

That's it! A new session is running in the background even when you close your terminal. To navigate between sessions, you should familiarise yourself with other [Tmux commands](https://linuxize.com/post/getting-started-with-tmux/). The three main ones you will need are:

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
