'use strict';
module.exports = (sequelize, DataTypes) => {
  var Chat = sequelize.define('Chat', {
    text: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    BoardId: DataTypes.INTEGER
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.Board, {
      foreignKey: 'BoardId'
    });
    Chat.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Chat;
};