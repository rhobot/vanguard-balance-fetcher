import delay from '../utils/delay';

async function checkIsSecurityQuestionPage(page) {
  const isSecurityQuesitonPage = await page.evaluate(() => {
    const h1 = document.getElementsByTagName('h1')[0];
    const title = h1 && h1.innerHTML && h1.innerHTML.toLowerCase();
    return title === 'answer your security question';
  });

  return isSecurityQuesitonPage;
}

function answerQuestion(page, securityAnswer) {
  page.evaluate(answer => {
    document.getElementById('LoginForm:ANSWER').value = answer;
    document.getElementById('LoginForm:DEVICE:0').click();
    document.getElementById('LoginForm:ContinueInput').click();
  }, securityAnswer);
}

async function getSecurityAnswer(page, securityQuestionAnswers) {
  const securityQuestionTableString = await page.evaluate(() => {
    return document.getElementById('LoginForm:summaryTable').innerHTML;
  });

  const securityQuestionAnswer = securityQuestionAnswers.find(({question, answer}) => {
    return securityQuestionTableString.includes(question);
  });

  return securityQuestionAnswer && securityQuestionAnswer.answer;
}

async function answerSecurityQuestion(securityQuestionAnswers, page) {
  const isSecurityQuestionPage = await checkIsSecurityQuestionPage(page);

  if (!isSecurityQuestionPage) {
    return;
  }

  if (!securityQuestionAnswers) {
    throw new Error('Security Questions param required');
  }

  const securityAnswer = await getSecurityAnswer(page, securityQuestionAnswers);

  if (!securityAnswer) {
    throw new Error('Could not find the answer of the security question.');
  }

  answerQuestion(page, securityAnswer);
  await delay();
}

export default answerSecurityQuestion;
