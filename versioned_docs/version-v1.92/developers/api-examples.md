---
id: api-examples
title: API Example Use
---

## API Example Use

Here are some examples of how to use HOPR APIs with your terminal, Python or JS. HOPR is code agnostic so any language would work, you could even use API platforms like [Postman](https://web.postman.co/) to interact with your HOPR node. 

### accountWithdraw

<Tabs>
<TabItem value="Terminal" label="Terminal">

```
curl -X POST http://YOUR_API_URL:3001/api/v2/account/withdraw \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_API_KEY" \
  -d '{"amount": "1000000000000000000", "currency": "HOPR", "recipient": "YOUR_WALLET_ADDRESS"}'
```

</TabItem>
<TabItem value="Python" label="Python">

```
import requests
import json

api_url = "https://YOUR_API_URL/api/v2/account/withdraw"

payload = json.dumps({
    "amount": "1000000000000000000",
    "currency": "HOPR",
    "recipient": "YOUR_WALLET_ADDRESS"
})

headers = {
  'x-auth-token': YOUR_API_KEY,
  'Content-Type': 'application/json'
}

response = requests.request("POST", api_url, headers=headers, data=payload)
```

</TabItem>
<TabItem value="JS" label="JavaScript">

```
const API_URL = 'http://YOUR_API_URL:3001/api/v2/account/withdraw';

const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': 'YOUR_API_KEY',
};

const payload = {
    amount: '1000000000000000000',
    currency: 'HOPR',
    recipient: 'YOUR_WALLET_ADDRESS',
};
```

</TabItem>
</Tabs>