const db = require('../database/models/index.js');
const passport = require('./middleware/passport.js');
const Promise = require('bluebird');

const post = {};
const get = {};
const patch = {};

post.signup = (req, res) => {
  db.saveUser(req.body)
  .then(() =>  {
    res.status(302);
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

// Retrieve all events of user after login
get.userEvents = (req, res) => {
  console.log('get.userEvents', req.user.id);
  return db.EventUser.findAll({
    where: {
      UserId: req.user.id
    },
    include: [
     {model: db.Event,
      required: true,}
    ],
  })
  .then(data => {
    let eventArr = data.map((item) => {return item.dataValues.Event.dataValues});
    console.log(eventArr);
    res.json(eventArr);
  })
  .catch(error => {
    console.log('error:', error);
    res.status(500);
    res.end();
  });
}

// THIS IS AN EXAMPLE OF QUERY STRING
// get.user = (req, res) => {
//   db.sequelize.query(`select * from "Users"`, { type: db.sequelize.QueryTypes.SELECT})
//   .then(users => console.log(users))
//   .catch(err => console.log('error'))
// }
post.createEvent = (req, res) => {
  const query = {
    title: req.body.createEventTitle,
    location: req.body.createEventLocation
  }

  return db.Event.create(query)
    .then((({ dataValues }) => {
      return post.addUserToEvent(dataValues, req.user)
        .then((data) => {
          res.json(data);
        })
        .catch((err)=> {
          console.log(err);
          res.status(err.status);
        })
    }))
    .catch((err) => {console.log(err)})
}

post.addUserToEvent = (event, user, res) => {
  const query = {
    EventId: event.id,
    UserId: user.id
  }

  return db.EventUser.create(query);
}

get.user = (req, res) => {
  if (req.user) {
    db.fetchUser(req.user.username).then(user => res.json(user));
  }
}

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;
