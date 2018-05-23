'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    UserId: DataTypes.INTEGER,
    PinId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
    Like.belongsTo(models.Pin, {
      foreignKey: 'PinId'
    });
  };
  return Like;
};