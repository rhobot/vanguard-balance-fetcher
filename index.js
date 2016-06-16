import Request from 'request';
import {LOGIN_PAGE_URL, LOGIN_FORM_URL, DASHBOARD_URL} from './config/links';

const request = Request.defaults({jar: true});

function getLoginPage() {
  return new Promise((resolve, reject) => {
    request(LOGIN_PAGE_URL, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve();
  });
}

function authenticate(userName, password) {
  return new Promise((resolve, reject) => {
    request.post(LOGIN_FORM_URL, {
      form: {
        USERNAME: userName,
        PASSWORD: password
      }
    }, function login(err, res, body) {
      if (err) {
        reject(err);
        return;
      }

      if (res.statusCode !== 302) {
        reject({message: 'account cannot be found'});
        return;
      }

      resolve();
    });
  });
}

function getDashboardPage() {
  return new Promise((resolve, reject) => {
    request(DASHBOARD_URL, function fetchDashboardPage(err, res, body) {
      if (err) {
        reject(err);
        return;
      }

      resolve(body);
    });
  });
}

export default async function fetchVanguardBalance(userName, password, accountId, cb) {
  if (!cb) {
    return;
  }

  // Validate params.
  if (!userName || !password || !accountId) {
    cb({message: 'userName, password, and accountId are required'});
    return;
  }

  let html;

  try {
    await getLoginPage();
    await authenticate(userName, password);
    html = await getDashboardPage();
  } catch (err) {
    cb(err);
    return;
  }

  // TODO Parse the HTML into balance.
  const result = html;

  cb(null, result);
}
