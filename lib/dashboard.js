import {DASHBOARD_URL} from '../config/links';
import delay from '../utils/delay';

const CONTAINER_CLASS = 'comp-Container';

async function goToDashboard(page) {
  await page.open(DASHBOARD_URL);
  await delay();
}

async function getBalance(page) {
  const balance = await page.evaluate(containerClass => {
    const containerList = document.getElementsByClassName(containerClass);
    const containers = Array.prototype.slice.call(containerList);

    // return containers.map(function parseAccounts(accountContainer) {
    //   const tbody = accountContainer.querySelector('tbody');
    //   const tr = tbody.querySelectorAll('tr')[2];
    //   const tds = tr.getElementsByTagName('td');
    //   const symbolTd = tds[0];
    //   const amountTd = tds[tds.length - 1];
    //
    //   return {
    //     symbol: tbody.innerHTML,
    //     amount: tbody.innerHTML
    //   };
    // });
  }, CONTAINER_CLASS);

  console.log('balance', balance);

  return {result: 'not implemented yet'};
}

export {
  goToDashboard,
  getBalance
};
