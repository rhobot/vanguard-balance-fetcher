import test from 'tape';
import vanguardBalanceFetcher from '../index';
import localConfig from '../config/local.json';

const {username, password, securityQuestionAnswers} = localConfig;

test('This should fail', t => {
  vanguardBalanceFetcher(username, password, securityQuestionAnswers, (err, body) => {
    console.log(err, body);

    t.fail('Write tests');
    t.end();
  });
});
