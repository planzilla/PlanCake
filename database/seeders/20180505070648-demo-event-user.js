'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventUsers',
    [
      {
        eventId: '1',
        userId: '1',
        createdAt: '2018-05-05T06:52:26.282Z'
      },
      {
        eventId: '1',
        userId: '2',
        createdAt: '2018-05-06T06:52:26.282Z'
      },
      {
        eventId: '1',
        userId: '3',
        createdAt: '2018-05-07T06:52:26.282Z'
      },
      {
        eventId: '2',
        userId: '1',
        createdAt: '2018-05-05T06:52:26.282Z'
      },
      {
        eventId: '3',
        userId: '2',
        createdAt: '2018-05-06T06:52:26.282Z'
      },
      {
        eventId: '3',
        userId: '3',
        createdAt: '2018-05-07T06:52:26.282Z'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventUsers', null, {});

  }
};
