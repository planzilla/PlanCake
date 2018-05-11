'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventUsers',
    [
      {
        EventId: '1',
        UserId: '1'
      },
      {
        EventId: '1',
        UserId: '2'
      },
      {
        EventId: '1',
        UserId: '3'
      },
      {
        EventId: '2',
        UserId: '1'
      },
      {
        EventId: '3',
        UserId: '2'
      },
      {
        EventId: '3',
        UserId: '3'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventUsers', null, {});
  }
};
