import {create as createPhantom} from 'phantom';
import {setTimeout} from 'timers';
import {LOGIN_PAGE_URL} from './config/links';

export default async function fetchVanguardBalance(userName, password, accountId, cb) {
  if (!cb) {
    return;
  }

  // Validate params.
  if (!userName || !password || !accountId) {
    cb({message: 'userName, password, and accountId are required'});
    return;
  }

  let phantom;

  try {
    // Go to login page.
    phantom = await createPhantom();
    const loginHomePage = await phantom.createPage();
    await loginHomePage.open(LOGIN_PAGE_URL);

    // Authenticate.
    await loginHomePage.evaluate((userNameInput, passwordInput) => {
      document.getElementById('USER').value = userNameInput;
      document.getElementById('PASSWORD').value = passwordInput;
      document.getElementById('login').click();
    }, userName, password);

    // TODO Remove setTimeout hack
    setTimeout(() => {
      loginHomePage.render('page.png');
      loginHomePage.close();
      cb(null, {result: 'not implemented yet'});
      phantom.exit();
    }, 5000);

    // TODO Handle Security question page.

    // TODO Get the balance.
  } catch (err) {
    cb(err);
    phantom.exit();
  }
}
