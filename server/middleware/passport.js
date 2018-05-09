const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
const db = require('../../database/models/index.js');

Promise.promisifyAll(bcrypt);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
  db.fetchUser(username)
    .then((user) => {
      if (user) {
        return bcrypt.compareAsync(password, user.password)
          .then((result) => {
            if (result) {
              done(null, user);
            } else {
              done(null, false, { message: 'Password Incorrect' });
            }
          })
          .catch((err) => {
            throw err;
          });
      } else {
        done(null, false, { message: 'Username does not exist' });
      }
    });
}));

module.exports = passport;
