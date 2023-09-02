---
id: using-tmux
title: Using Tmux
---

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