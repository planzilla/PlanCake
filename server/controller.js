const db = require('../database/models/index.js');
const passport = require('./middleware/passport.js');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const { transporter, template } = require('./email.js');

const post = {};
const get = {};
const patch = {};

// THIS IS AN EXAMPLE OF QUERY STRING
// get.user = (req, res) => {
//   db.sequelize.query(`select * from "Users"`, { type: db.sequelize.QueryTypes.SELECT})
//   .then(users => console.log(users))
//   .catch(err => console.log('error'))
// }

/* -------- GET REQUESTS --------- */
get.allItineraries = (req, res) => {
  let query = req.query.eventIdStr.split(',').map(EventId => ({ EventId: EventId }))
  return db.fetchAllItineraries(query)
    .then((data) => {
      let currentDate = new Date();
      let itineraries = {};
      let eventIdArr = req.query.eventIdStr.split(',').map(EventId => EventId);
      eventIdArr.forEach(item => {
        itineraries[item] = [];
      })
      data.forEach(item => {
        if (itineraries[item.dataValues.EventId].length < 6 && item.dataValues.date > currentDate) {
          itineraries[item.dataValues.EventId].push(item.dataValues);
        }
      })
      res.json(itineraries);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

get.chatMessages = (req, res) => {
 db.sendChatHist(req.query.boardId)
  .then((result) => {
    result = result.reduce((acc, { dataValues: { text: t, User: { username: u } }}) => {
      acc.push({ text: t, username: u })
      return acc;
    }, [])
    res.json(result)
  })
  .catch(err => {
    console.error(err);
  })
}

get.groupTodo = (req, res) => {
  return db.groupTodo(req.query.EventId)
    .then((data) => {
      let todoArr = data.map(item => ({
        text: item.dataValues.text,
        completed: item.dataValues.completed,
        deadline: item.dataValues.deadline,
        name: `${item.dataValues.User.firstName.slice(0,1).toUpperCase()}${item.dataValues.User.firstName.slice(1).toLowerCase()} ${item.dataValues.User.lastName.slice(0,1).toUpperCase()}.`
      }));
      res.json(todoArr)
    })
    .catch(err => {console.log(err)})
}

get.invitesByEmail = (req, res) => {
  return db.fetchInvitesByEmail(req.user.email)
    .then(data => {
      data.forEach((invite) => invite.dataValues.UserId 
        ? null 
        : db.updateUserId(req.user.id, invite.id))

      let eventsQueryArr = data.map(item => ({id: item.dataValues.EventId}))
      
      return db.fetchEventsByEventId(eventsQueryArr)
    })
    .then(data => {
      let EventsArr = data.map(item => item.dataValues)
      res.json(EventsArr);
    })
    .catch(err => {console.log(err)})
}

get.invitesByUserId = (req, res) => {
  return db.fetchInvitesByUserId (req.user.id)
    .then(data => {
      let eventsQueryArr = data.map(item => ({id: item.dataValues.EventId}))
      return db.fetchEventsByEventId(eventsQueryArr)
    })
    .then(data => {
      let EventsArr = data.map(item => item.dataValues)
      res.json(EventsArr);
    })
    .catch(err => { console.log(err) })
}

get.itinerary = (req, res) => {
  return db.fetchItinerary(req.query.EventId)
    .then(data => {
      let itineraryArr = data.map(item => item.dataValues);
      res.json(itineraryArr);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })
}

get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

get.pins = (req, res) => {
  return db.findPins(req.query.boardId)
    .then((data) => {
      res.json(data);
    })
}

get.topicBoard = (req, res) => {
  return db.Board.findAll({
    where: req.query
  })
    .then(data => {
      let boardArr = data.map(item => item.dataValues)
      res.json(boardArr);
    })
    .catch(error => {
      console.log(error);
      res.status(500);
      res.end();
    })
}

get.userEvents = (req, res) => {
  return db.EventUser.findAll({
    where: {
      UserId: req.user.id
    },
    include: [
      {
        model: db.Event,
        required: true,
      }
    ],
  })
    .then(data => {
      let eventArr = data.map(item => item.dataValues.Event.dataValues);
      res.json(eventArr);
    })
    .catch(error => {
      console.log('error:', error);
      res.status(500);
      res.end();
    });
}

get.todos = (req, res) => {
  return db.Todo.findAll({
    where: {
      UserId: req.user.Id
    },    
    order: [
      ['deadline', 'ASC'],
      ['text', 'ASC']
    ],
  })
    .then(data => {
      let todoArr = data.map(item => item.dataValues);
      res.json(todoArr);
    })
    .catch(error => {
      console.log(error);
      res.status(500);
      res.end();
    })
}

get.eventAttendees = (req, res) => {
  return db.fetchEventAttendees(req.query.EventId)
    .then(data => {
      let attendeesObj= data.map(item => ({
        name: `${item.User.dataValues.firstName.slice(0,1).toUpperCase()}${item.User.dataValues.firstName.slice(1).toLowerCase()} ${item.User.dataValues.lastName.slice(0,1).toUpperCase()}.`,
        userId: `${item.User.dataValues.id}`
      }));
      res.json(attendeesObj);
    })
}

/* -------- PATCH REQUESTS --------- */
patch.acceptInvite = (req, res) => {
  return db.updateJoinEventStatusAccept(req.user.id, req.query.EventId)
    .then(() => {
      res.end();
    })
    .catch(err => { 
      console.log(err);
      res.end();
    })
}

patch.ignoreInvite = (req, res) => {
  return db.updateJoinEventStatusIgnore(req.user.id, req.query.EventId)
    .then(() => {
      res.end();
    })
    .catch(err => { 
      console.log(err);
      res.end();
    })
}

patch.todos = (req, res) => {
  return db.updateTodos(req.body.id, req.body.completed)
    .then(() => {
      res.end();
    })
    .catch(err => { console.log(err) })
}

/* -------- POST REQUESTS --------- */

post.addPlan = (req, res) => {
  const query = req.body;

  return db.addPlan(query)
    .then(() => {
      return db.fetchItinerary(req.body.EventId)
    })
    .then((data) => {
      console.log(typeof data);
      let itineraryArr = data.map(item => item.dataValues)
      res.json(itineraryArr);
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      res.end();
    })

}

patch.patchLikes = (req, res) => {
  const { BoardId, PinId, liked } = req.body;
  return db.patchPin(PinId, liked)
  .then(() => {
    return db.findPins(BoardId)
  })
  .then((pins) => {
    let pinsArr = pins.map(item => item.dataValues)
    res.json(pinsArr);
  })
  .catch((err) => {
    console.error(err);
  });
}

post.addTopicBoard = (req, res) => {
  const query = {
    EventId: req.body.eventId,
    title: req.body.addTopicTitle
  }

  return db.Board.create(query)
    .then(() => res.end())
    .catch((err) => {
      console.log(err);
      res.status(err.status);
      res.end();
    })
}

post.addUserToEvent = (req, res) => {
  return db.addUserToEvent(req.body, req.user)
    .then(() => {
      res.end();
    })
    .catch(err => {console.log(err)});
}

post.createEvent = (req, res) => {
  return db.addEvent(req.body.createEventTitle, req.body.createEventLocation)
    .then((({ dataValues }) => {
      return db.addUserToEvent(dataValues, req.user)
        .then((data) => {
          res.json(dataValues);
        })
        .catch((err) => {
          console.log(err);
          res.status(err.status);
          res.end();
        })
    }))
    .catch((err) => { console.log(err) })
}

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

post.sendEmailInvites = (req, res) => {
  let emails = req.body.validatedEmails;
  let validator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  for (var i = 0; i < emails.length; i++) {
    let email = emails[i].trim();
    if (!validator.test(email)) {
      res.status(422);
      res.end();
    }
  }

  emails.forEach((email) => {
    var userData;
    return db.fetchUserByEmail(email)
      .then(res => {
        userData = res ? res.dataValues : null;
        return transporter.sendMail(template(email))
      })
      .then(() => {
        return db.addInvite(email, userData, req.body.event.EventId, true, res)
      })
      .catch(err => {
        console.log(err);
        return db.addInvite(email, userData, req.body.event, false, res);
      })
  })

  res.end();
};

post.signup = (req, res) => {
  return db.saveUser(req.body)
    .then(() => {
      res.status(200);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.send(err.status);
      res.end();
    })
};

post.todos = (req, res) => {
  return db.addTodo(req.body)
    .then(() => {
      res.status(200);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.send(err.status);
      res.end();
    })
};

module.exports.get = get;
module.exports.post = post;
module.exports.patch = patch;
