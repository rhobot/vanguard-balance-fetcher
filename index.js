import Request from 'request';
import async from 'async';
import {LOGIN_PAGE_URL, LOGIN_FORM_URL, DASHBOARD_URL} from './config/links';

const request = Request.defaults({jar: true});

export default function fetchVanguardBalance(userName, password, accountId, cb) {
  if (!cb) {
    return;
  }

  // TODO Validate params.
  if (!userName || !password || !accountId) {
    cb({message: 'userName, password, and accountId are required'});
    return;
  }

  async.series([
    function getLoginPage(done) {
      request(LOGIN_PAGE_URL, function fetchLoginPage(err, res, body) {
        if (err) {
          done(err);
          return;
        }
      });

      done(null);
    },

    function authenticate(done) {
      request.post(LOGIN_FORM_URL, {
        form: {
          USERNAME: userName,
          PASSWORD: password
        }
      }, function login(err, res, body) {
        if (err) {
          done(err);
          return;
        }

        if (res.statusCode !== 302) {
          done({message: 'account cannot be found'});
          return;
        }

        done(null);
      });
    },

    function getDashboardPage(done) {
      request(DASHBOARD_URL, function fetchDashboardPage(err, res, body) {
        if (err) {
          done(err);
          return;
        }

        done(null, body);
      });
    }

    // TODO Fetch HTML in the balance page.
  ], function onError(err, results) {
    if (err) {
      cb(err);
      return;
    }

    cb(null, results);
  });
}
