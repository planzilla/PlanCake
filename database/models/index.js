'use strict';

const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../database.json')[env];
var db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      operatorAliases: config.operatorAliases,
      "pool": {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false
    }
  );
// }

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Promise.promisifyAll(bcrypt);

/*----------- db functions --------- */

db.addEvent = (title, location) => {
  const query = {
    title: title,
    location: location
  }

  return db.Event.create(query);
}

db.addInvite = (email, userData, eventId, emailStatus) => {
  const query = {
    email: email,
    UserId: userData ? userData.id : null,
    EventId: eventId,
    emailStatus: emailStatus,
  }
  
  return db.Invite.create(query)
    .catch(err => {console.log(err)})
}

db.addUserToEvent = (event, user) => {
  const query = {
    EventId: event.id,
    UserId: user.id
  }

  return db.EventUser.create(query);
}

db.fetchEventsByEventId = (eventIdArr) => db.Event.findAll({
  where: {
    $or : eventIdArr
  },
  order: [
    ['createdAt', 'DESC'],
  ],
})

db.fetchInvitesByEmail = (email) => db.Invite.findAll({ 
  where: {
    email: email,
    joinEventStatus: null
  } 
});

db.fetchInvitesByUserId = (UserId) => db.Invite.findAll({where: {
  UserId: UserId,
  joinEventStatus: null
}})

db.fetchUser = (username) =>  db.User.findOne({ where: {username: username}});

db.fetchUserByEmail = (email) => db.User.findOne({ where: { email: email } });

db.saveUser = (obj) => {
  return db.fetchUser(obj.username)
  
  .then((user) => {
    
    if (user === null) {
      const saltRounds = 10;
      return bcrypt.genSaltAsync(saltRounds)
      
      .then ((salt) => {
        return bcrypt.hashAsync(obj.password, salt, null)
        
        .then ((hash) => {
          obj.password = hash;
          return db.User.create({
            firstName: obj.firstName,
            lastName: obj.lastName,
            username: obj.username,
            password: obj.password,
            username: obj.username,
            email: obj.email
          }, (err) => {
            console.log(err);
          });
        })

        .catch((err) => 
          console.log(err)
        )
    }) 
    
    } else {
      return false;
    }
  })
};

db.updateUserId = (UserId, InviteId) => {
  return db.Invite.update(
   {UserId: UserId},
   {where: {id: InviteId}}
  );
}

db.updateJoinEventStatusAccept = (UserId, EventId) => {
  return db.Invite.update(
    {joinEventStatus: true}, 
    {where: {
      UserId: UserId,
      EventId: EventId
    }}
  )
}

db.updateJoinEventStatusIgnore = (UserId, EventId) => {
  return db.Invite.update(
    {joinEventStatus: false}, 
    {where: {
      UserId: UserId,
      EventId: EventId
    }}
  )
}

db.addChat = (UserId, BoardId, message) => {
  return db.Chat.create({
    text: message,
    UserId: UserId,
    BoardId: BoardId
  }, (err) => {
    console.log(err);
  });
}

db.sendChatHist = (BoardId) => {
  return db.Chat.findAll({
    where: { BoardId: BoardId },
    include: [{
      model: db.User,
      require: true
    }]
  })
}

// sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
