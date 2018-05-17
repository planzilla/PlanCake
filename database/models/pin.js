'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pin = sequelize.define('Pin', {
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    BoardId: DataTypes.INTEGER,
    voteCount: DataTypes.INTEGER
  }, {});
  Pin.associate = function(models) {
    Pin.belongsTo(models.Board, {
      foreignKey: 'BoardId' 
    });
    Pin.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
    Pin.hasMany(models.Chat, {
      foreignKey: 'PinId'
    });
  };
  return Pin;
};
