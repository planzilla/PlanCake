'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Events);
  };
  return Users;
};