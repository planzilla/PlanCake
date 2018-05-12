'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    EventId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    // associations can be defined here
    Board.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
  };
  return Board;
};