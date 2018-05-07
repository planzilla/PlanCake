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
    Link.belongsTo(models.Board, {
      foreignKey: 'links'
    });
    Link.belongsTo(models.User), {
      foreignKey: 'userId'
    }
  };
  return Link;
};
