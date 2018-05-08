'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventUsers',
    [
      {
        eventId: '1',
        userId: '1'
      },
      {
        eventId: '1',
        userId: '2'
      },
      {
        eventId: '1',
        userId: '3'
      },
      {
        eventId: '2',
        userId: '1'
      },
      {
        eventId: '3',
        userId: '2'
      },
      {
        eventId: '3',
        userId: '3'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('EventUsers', null, {});

  }
};
