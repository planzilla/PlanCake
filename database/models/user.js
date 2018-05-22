'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Event, {
      through: 'EventUser',
      foreignKey: 'UserId'
    });
    User.hasMany(models.Pin, {
      foreignKey: 'UserId'
    });
    User.hasMany(models.Invite, {
      foreignKey: 'UserId'
    });
    User.hasMany(models.Chat, {
      foreignKey: 'UserId'
    });
    User.hasMany(models.Todo, {
      foreignKey: 'UserId'
    });
  };
  return User;
};