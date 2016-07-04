export async function checkIsSecurityQuestionPage(page) {
  const isSecurityQuesitonPage = await page.evaluate(() => {
    const h1 = document.getElementsByTagName('h1')[0];
    const title = h1 && h1.innerHTML && h1.innerHTML.toLowerCase();
    return title === 'answer your security question';
  });

  return isSecurityQuesitonPage;
}

export async function getSecurityAnswer(page, securityQuestionAnswers) {
  const securityQuestionTableString = await page.evaluate(() => {
    return document.getElementById('LoginForm:summaryTable').innerHTML;
  });

  const securityQuestionAnswer = securityQuestionAnswers.find(({question, answer}) => {
    return securityQuestionTableString.includes(question);
  });

  return securityQuestionAnswer && securityQuestionAnswer.answer;
}

export async function answerSecurityQuestion(page, securityAnswer) {
  await page.evaluate(answer => {
    document.getElementById('LoginForm:ANSWER').value = answer;
    document.getElementById('LoginForm:DEVICE:0').click();
    document.getElementById('LoginForm:ContinueInput').click();
  }, securityAnswer);
}
