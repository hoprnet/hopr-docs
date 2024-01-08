---
id: hopr-token-mainnet
title: Hopr Token (Mainnet) Subgraph Entities & Sample Queries
---


- [Account](#account)

## Account

| Field  | Type    | Description                            |
| ------ | ------- | -------------------------------------- |
| id     | Bytes!  | Account address                        |
| amount | BigInt! | Current balance of the account in HOPR |

## Sample Queries

Below are some sample queries you can use to gather information from the HOPR Token (Mainnet) subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

Each entity has a plural version and a singular version. When querying for a single record response (e.g. account), you will need to supply the id for the entity. When querying for a list of responses (e.g. accounts), you may add filters using the 'where' clause.

### Block

Description: This query returns transactions starting from a specific block number.

```graphql
{
  accounts(block: { number_gte: 13000000 }) {
    amount
    id
  }
}
```

### Account Balance

Description: This query returns token balance for an account.

```graphql
{
  accounts(where: { id: "0x0000000000000eb4ec62758aae93400b3e5f7f18" }) {
    amount
    id
  }
}
```
