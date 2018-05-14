'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Boards',
    [
      {
        EventId: '1',
        title: 'Lodging'
      },
      {
        EventId: '1',
        title: 'Flights'
      },
      {
        EventId: '1',
        title: 'Nightlife'
      },
      {
        EventId: '2',
        title: 'Hikes'
      },
      {
        EventId: '2',
        title: 'Activities'
      },
      {
        EventId: '3',
        title: 'Dates'
      },
      {
        EventId: '3',
        title: 'Cars'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Boards', null, {});
  }
};
