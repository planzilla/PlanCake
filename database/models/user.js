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
    // associations can be defined here
    User.belongsToMany(models.Event, {
      through: 'eventUser',
      foreignKey: 'userId'
    });
    User.hasMany(models.Event, {
      through: 'eventUser',
      foreignKey: 'userId'
    });
  };
  return User;
};