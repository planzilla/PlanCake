var User = require('./User.js');
var Event = require('./Event.js');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var EventUser = sequelize.define('EventUser', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  EventUser.associate = function(models) {
    // associations can be defined here
    EventUser.belongsTo(models.Event, {
      foreignKey: 'eventId'
    });
    EventUser.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return EventUser;
};
