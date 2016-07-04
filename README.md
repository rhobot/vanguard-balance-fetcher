## Work in progress

# vanguard-balance-fetcher
A simple JS library for fetching the balance in a [Vanguard](https://investor.vanguard.com) account

# usage

```js
import fetchBalance from 'vanguard-balance-fetcher';

fetchBalance('username', 'password', securityQuestionAnswers, (err, balance) => {
  if (err) {
    // TODO Handle error
    return;
  }

  console.log(balance);
});
```

## Format of `securityQuestionAnswers` param

```js
const securityQuestionAnswers = [
  {
    question: 'What is the first name of your boy or girlfriend?',
    answer: 'Katy'
  },
  {
    question: 'What is the last name of your first boss?',
    answer: 'Kim'
  },
  ...
];
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

# Caveats

* Due to the nature of what the library does, the function may not be working as intend
whenever the website changes. Please file an issue or create a pull request for the fix if the library doesn't work.

# License

[WTFPL](http://www.wtfpl.net)
