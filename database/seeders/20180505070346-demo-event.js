'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events',
    [
      {
        title: 'Week 12',
        location: 'San Francisco',
        createdAt: '2018-05-05T06:52:26.282Z'
      },
      {
        title: 'Paradiso',
        location: 'Seattle',
        createdAt: '2018-05-06T06:52:26.282Z'
      },
      {
        title: 'Disneyland',
        location: 'Anaheim',
        createdAt: '2018-05-07T06:52:26.282Z'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
