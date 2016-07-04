import delay from '../utils/delay';

const CONTINUE_BUTTON_ID = 'continueInput';

async function checkIsNoticePage(page) {
  const isNoticePage = await page.evaluate(continueButtonId => {
    const hasContinueButton = !!document.getElementById(continueButtonId);
    return hasContinueButton;
  }, CONTINUE_BUTTON_ID);

  return isNoticePage;
}

// Click 'continue' button in Notice page like 'Holiday closing'.
async function continueNoticePage(page) {
  const isNoticePage = await checkIsNoticePage(page);

  if (!isNoticePage) {
    return;
  }

  page.evaluate(continueButtonId => {
    const continueButton = document.getElementById(continueButtonId);
    continueButton.click();
  }, CONTINUE_BUTTON_ID);

  await delay();
}

export default continueNoticePage;
