export default function fetchVanguardBalance(userName, password, accountId, cb) {
  if (!cb) {
    return;
  }

  if (!userName || !password || !accountId) {
    cb({message: 'userName, password, and accountId are required'});
    return;
  }

  // TODO Authenticate

  // TODO Fetch HTML in the balance page.

  // TODO handle errors and pass it to callback.

  const balance = {};
  cb(null, balance);
}
