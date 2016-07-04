## Work in progress

# vanguard-balance-fetcher
A simple JS library for fetching the balance in a [Vanguard](https://investor.vanguard.com) account

# usage

```js
import fetchBalance from 'vanguard-balance-fetcher';

fetchBalance('username', 'password' (err, balance) => {
  if (err) {
    // TODO Handle error
    return;
  }

  console.log(balance);
});
```

## Example of `balance` object:
```js
{
  AccountID1: {
    VABCD: {
      balance: 1000.00
    },
    VZXYP: {
      balance: 952.12
    }
  },
  AccountID2: {
    VXXXX: {
      balance: 1234.00
    }
  },
  ...
}
```

# License

[WTFPL](http://www.wtfpl.net)
