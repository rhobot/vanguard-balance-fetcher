import {DASHBOARD_URL} from '../config/links';
import delay from '../utils/delay';

function getAccountBalance(accountTableSelector) {
  const NON_DIGITS_AND_DOT_REGEX = /[^0-9\.]+/g;
  const accountTables = Array.prototype.slice.call(document.querySelectorAll(accountTableSelector));

  if (!accountTables.length) {
    return null;
  }

  const accountSummaryTable = accountTables[0];
  const amountsTable = accountTables[accountTables.length - 1];
  const tableRows = Array.prototype.slice.call(amountsTable.querySelectorAll('tr[index]'));
  const amountsRows = tableRows.splice(2, tableRows.length - 3);

  const result = {};
  const accountId = accountSummaryTable.querySelector('tr > td:nth-child(2)').innerText.split('*')[0];
  result[accountId] = {};

  amountsRows.forEach(amountRow => {
    const tds = amountRow.querySelectorAll('td');
    const symbol = tds[0].innerHTML;
    const amountString = tds[7].querySelector('div').innerText;
    const amount = Number(amountString.replace(NON_DIGITS_AND_DOT_REGEX, ''));

    result[accountId][symbol] = amount;
  });

  return result;
}

async function goToDashboard(page) {
  await page.open(DASHBOARD_URL);
  await delay();
}

async function getBalance(page) {
  const balance = {};
  let accountIndex = 0;

  while (true) {
    const accountBalance = await page.evaluate(getAccountBalance, `table[id^="BHForm2:accountID:${accountIndex}"]`);

    if (!accountBalance) {
      break;
    }

    Object.assign(balance, accountBalance);
    accountIndex += 1;
  }

  return balance;
}

export {
  goToDashboard,
  getBalance
};
