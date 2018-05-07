'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    eventId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    links: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    // associations can be defined here
    Board.belongsTo(models.Event, {
      through: 'EventBoard',
      foreignKey: 'eventId'
    });
  };
  return Board;
};