import {create as createPhantom} from 'phantom';
import {setTimeout} from 'timers';
import {openLoginHomePage, authenticate} from './lib/login';
import {checkIsSecurityQuestionPage, getSecurityAnswer, answerSecurityQuestion} from './lib/security-question';

const DEFAULT_TIMEOUT = 4000;

function nextStep(cb, page, phantom) {
  console.log('next step');
  page.render('page.png');

  // TODO Handle notice message (such as holiday closing)
  // continueInput

  page.close();
  phantom.exit();

  cb(null, {result: 'not implemented yet'});
}

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

    setTimeout(async () => {
      const isSecurityQuestionPage = await checkIsSecurityQuestionPage(page);

      if (isSecurityQuestionPage) {
        if (!securityQuestionAnswers) {
          cb({message: 'Security Questions param required'});
          return;
        }

        const securityAnswer = await getSecurityAnswer(page, securityQuestionAnswers);

        if (!securityAnswer) {
          cb({message: 'Could not find the answer of the security question.'});
          return;
        }

        await answerSecurityQuestion(page, securityAnswer);

        setTimeout(() => nextStep(cb, page, phantom), DEFAULT_TIMEOUT);
      } else {
        nextStep(cb, page, phantom);
      }
    }, DEFAULT_TIMEOUT);

    // TODO Get the balance.
  } catch (err) {
    cb(err);
    phantom.exit();
  }
}
