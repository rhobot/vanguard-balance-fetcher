import {create as createPhantom} from 'phantom';
import {setTimeout} from 'timers';
import {openLoginHomePage, authenticate} from './lib/login';

const DEFAULT_TIMEOUT = 5000;

export default async function fetchVanguardBalance(userName, password, securityQuestionAnswerMap, cb) {
  if (!cb) {
    return;
  }

  // Validate params.
  if (!userName || !password) {
    cb({message: 'userName and password are required'});
    return;
  }

  let phantom;

  try {
    phantom = await createPhantom();
    const loginHomePage = await openLoginHomePage(phantom);
    await authenticate(loginHomePage, userName, password);

    setTimeout(async () => {
      // Handle Security question page.
      const isSecurityQuestionPage = await loginHomePage.evaluate(() => {
        const h1 = document.getElementsByTagName('h1')[0];
        const title = h1 && h1.innerHTML && h1.innerHTML.toLowerCase();
        return title === 'answer your security question';
      });

      console.log('isSecurityQuestionPage = ', isSecurityQuestionPage);

      // loginHomePage.render('page.png');
      // loginHomePage.close();

      cb(null, {result: 'not implemented yet'});

      phantom.exit();
    }, DEFAULT_TIMEOUT);

    // TODO Get the balance.
  } catch (err) {
    cb(err);
    phantom.exit();
  }
}
