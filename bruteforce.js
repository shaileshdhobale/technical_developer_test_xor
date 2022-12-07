import ExpressBrute from 'express-brute';

let store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production

module.export = function(namespace, freeRetries, minWait) {
  return async function (req, res, next) {
    let userBruteforce = new ExpressBrute(store, {
      freeRetries: freeRetries,
      minWait: minWait
    });
    userBruteforce.prevent;
    next();
  }
}