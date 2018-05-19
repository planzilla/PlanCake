'use strict';
module.exports = (sequelize, DataTypes) => {
  var itinerary = sequelize.define('itinerary', {
    EventId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.DATE,
    title: DataTypes.STRING,
    cost: DataTypes.INT,
    address: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  itinerary.associate = function(models) {
    // associations can be defined here
  };
  return itinerary;
};