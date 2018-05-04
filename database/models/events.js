'use strict';
module.exports = (sequelize, DataTypes) => {
  var Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    EventId: DataTypes.INT
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
    Events.hasMany(models.Users);
  };
  return Events;
};