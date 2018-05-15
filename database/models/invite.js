'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invite = sequelize.define('Invite', {
    email: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    seen: DataTypes.BOOLEAN
  }, {});
  Invite.associate = function(models) {
    // associations can be defined here
    Invite.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
    Invite.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
  };
  return Invite;
};