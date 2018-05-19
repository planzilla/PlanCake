'use strict';
module.exports = (sequelize, DataTypes) => {
  var Itinerary = sequelize.define('Itinerary', {
    EventId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    address: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {});
  Itinerary.associate = function(models) {
    // associations can be defined here
    Itinerary.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
  };
  return Itinerary;
};