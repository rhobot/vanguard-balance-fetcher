import {LOGIN_PAGE_URL} from '../config/links';

export async function openLoginHomePage(phantom) {
  const loginHomePage = await phantom.createPage();
  await loginHomePage.open(LOGIN_PAGE_URL);

  return loginHomePage;
}

export async function authenticate(loginHomePage, userName, password) {
  await loginHomePage.evaluate((userNameInput, passwordInput) => {
    document.getElementById('USER').value = userNameInput;
    document.getElementById('PASSWORD').value = passwordInput;
    document.getElementById('login').click();
  }, userName, password);
}
