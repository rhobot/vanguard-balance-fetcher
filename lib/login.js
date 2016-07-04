import {LOGIN_PAGE_URL} from '../config/links';

export async function openLoginHomePage(phantom) {
  const page = await phantom.createPage();
  await page.open(LOGIN_PAGE_URL);

  return page;
}

export async function authenticate(page, userName, password) {
  await page.evaluate((userNameInput, passwordInput) => {
    document.getElementById('USER').value = userNameInput;
    document.getElementById('PASSWORD').value = passwordInput;
    document.getElementById('login').click();
  }, userName, password);
}
