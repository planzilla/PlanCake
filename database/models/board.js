'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    EventId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    Board.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
    Board.hasMany(models.Chat, {
      foreignKey: 'BoardId'
    });
  };
  return Board;
};