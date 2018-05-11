'use strict';
module.exports = (sequelize, DataTypes) => {
  var Link = sequelize.define('Link', {
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
    voteCount: DataTypes.INTEGER
  }, {});
  Link.associate = function(models) {
    // associations can be defined here
    // TODO: Might need to change this later
    Link.belongsTo(models.Board, {
      foreignKey: 'links' 
    });
    Link.belongsTo(models.User), {
      foreignKey: 'UserId'
    }
  };
  return Link;
};
