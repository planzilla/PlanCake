'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    groupTodo: DataTypes.BOOLEAN,
    text: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    AssignerId: DataTypes.INTEGER,
    deadline: DataTypes.DATE
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'UserId'
    });
    Todo.belongsTo(models.Event, {
      foreignKey: 'EventId'
    });
  };
  return Todo;
};