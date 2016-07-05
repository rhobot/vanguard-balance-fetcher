import {create as createPhantom} from 'phantom';

import {openLoginHomePage, authenticate} from './lib/login';
import answerSecurityQuestion from './lib/security-question';
import continueNoticePage from './lib/notice-page';
import {goToDashboard, getBalance} from './lib/dashboard';

export default async function fetchVanguardBalance(userName, password, securityQuestionAnswers, cb) {
  if (!cb || !userName || !password) {
    cb({message: 'userName, password, and the callback are required'});
    return;
  }

  let phantom;

  try {
    phantom = await createPhantom();
    const page = await openLoginHomePage(phantom);
    await authenticate(page, userName, password);
    await answerSecurityQuestion(securityQuestionAnswers, page);
    await continueNoticePage(page);
    await goToDashboard(page);
    const balance = await getBalance(page);

    cb(null, balance);
  } catch (err) {
    cb(err.message);
  } finally {
    phantom.exit();
  }
}
