'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(models.User, {
      through: 'EventUser',
      foreignKey: 'EventId'
    });
  };
  return Event;
};