import test from 'tape';
import vanguardBalanceFetcher from '../index';

test('This should fail', t => {
  vanguardBalanceFetcher('', '', '', (err, body) => {
    console.log(err, body);

    t.fail('Write tests');
    t.end();
  });
});
