'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.User, {
      through: 'EventUser',
      foreignKey: 'EventId'
    });
    Event.hasMany(models.Board, {
      foreignKey: 'EventId'
    });
    Event.hasMany(models.Invite, {
      foreignKey: 'EventId'
    });
    Event.hasMany(models.Todo, {
      foreignKey: 'EventId'
    });
    Event.hasOne(models.Itinerary, {
      foreignKey: 'EventId'
    });
  };
  return Event;
};