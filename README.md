## Work in progress

# vanguard-balance-fetcher
A simple JS library for fetching the balance in a [Vanguard](https://investor.vanguard.com) account

# (expected) usage

```js
import {fetchBalance} from 'vanguard-balance-fetcher';

fetchBalance('username', 'password', 'account-number', (err, balance) => {
  if (err) {
    // TODO Handle error
    return;
  }
  
  console.log(balance);
});
```

Example of `balance`:
```js
{
  VABCD: {
    balance: 1000.00
  },
  VZXYP: {
    balance: 952.12
  },
  ...
}
```

# License

[WTFPL](http://www.wtfpl.net)
