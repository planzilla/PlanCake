'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pin = sequelize.define('Pin', {
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    BoardId: DataTypes.INTEGER,
    voteCountLike: DataTypes.INTEGER,
    voteCountDislike: DataTypes.INTEGER
  }, {});
  Pin.associate = function(models) {
    Pin.hasMany(models.Like, {
      foreignKey: 'PinId'
    });
    Pin.belongsTo(models.Board, {
      foreignKey: 'BoardId'
    });
    Pin.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Pin;
};