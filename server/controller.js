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

// THIS IS AN EXAMPLE OF QUERY STRING
// get.user = (req, res) => {
//   db.sequelize.query(`select * from "Users"`, { type: db.sequelize.QueryTypes.SELECT})
//   .then(users => console.log(users))
//   .catch(err => console.log('error'))
// }
post.createEvent = (req, res) => {
  console.log('in post createEvent', req.body);

  const query = {
    title: req.body.createEventTitle,
    location: req.body.createEventLocation
  }

  console.log('this is the query', query);

  db.Event.create(query)
    .then((() => {console.log('added')}))
    .catch((err) => {console.log(err)})

}

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;
