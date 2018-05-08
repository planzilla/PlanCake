'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events',
    [
      {
        title: 'Week 12',
        location: 'San Francisco'
      },
      {
        title: 'Paradiso',
        location: 'Seattle'
      },
      {
        title: 'Disneyland',
        location: 'Anaheim'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Events', null, {});
  }
};
