import express from 'express';
import ExpressBrute from 'express-brute';

const app = express();

// import bruteforce from './bruteforce';

function bruteforce(namespace, freeRetries, minWait) {

  
  return async function (req, res, next) {
    var store = new ExpressBrute.MemoryStore({ prefix: namespace }); // stores state locally, don't use this in production
    console.log(store)
    let userBruteforce = new ExpressBrute(store, {
      freeRetries: freeRetries,
      minWait: minWait
    });
    console.log(userBruteforce)
    // userBruteforce.prevent;
    next(userBruteforce.getMiddleware({key: namespace}));
  }
}

// global bruteforce
// app.use(bruteforce('global', 100, 5))

// route specific middleware
app.get('/v1/users', bruteforce('users', 5, 1), function (req, res) {
  res.send('Recevied')

})

app.get('/v1/apps', async function (req, res) {
  try {
    // promise-based middleware
    bruteforce('apps', 30, 2)
  } catch (err) {
    res.error(err.code).send(err.message)
  }
})

app.listen('8080')