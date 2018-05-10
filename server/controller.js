const db = require('../database/models/index.js');
const passport = require('./middleware/passport.js');
const Promise = require('bluebird');

const post = {};
const get = {};
const patch = {};

post.signup = (req, res) => {
  db.saveUser(req.body)
  .then(() => {
    res.status(200);
    res.end();
  });
};

post.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      res.status(422).send(info);
    } else {
      user.password = undefined;
      user.salt = undefined;
      req.login(user, (error) => {
        if (error) {
          console.log('error logging in', error);
          res.status(400).send(error);
        } else {
          res.json(user.dataValues);
        }
      });
    }
  })(req, res, next);
};

get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;
