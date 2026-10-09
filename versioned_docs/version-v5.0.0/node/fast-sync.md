---
id: fast-sync
title: Fast Sync
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { NoCounter } from '@site/src/components/Counter';

## Fast Sync in HOPRd v5.0.0

Fast Sync is not needed in HOPRd v5.0.0, and its settings no longer exist.

Earlier versions indexed the blockchain locally through an RPC provider, which could take hours, and Fast Sync shortened this by reusing pre-synced log database files. In v5.0.0, your node reads on-chain data from a Blokli indexer instead (the `blokli_url` setting in your [configuration file](./manage-node-configuration.md#blokli_url)), so there is no local log database to sync.

If your configuration file still contains a `chain` section with `keep_logs`, `fast_sync`, `enable_logs_snapshot` or `logs_snapshot_url`, or your setup uses `HOPRD_ENABLE_LOGS_SNAPSHOT` or `--enableLogsSnapshot`, remove them. HOPRd v5.0.0 rejects unknown settings and won't start with them.
