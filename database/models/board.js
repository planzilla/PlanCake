'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    EventId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Board.associate = function(models) {
    // associations can be defined here
    // TODO: Might need to change this later
    Board.belongsTo(models.Event, {
      through: 'EventBoard',
      foreignKey: 'EventId'
    });
  };
  return Board;
};