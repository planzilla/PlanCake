var User = require('./User.js');
var Event = require('./Event.js');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var EventUser = sequelize.define('EventUser', {
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  EventUser.associate = function(models) {
    // associations can be defined here
    EventUser.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
    EventUser.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return EventUser;
};
