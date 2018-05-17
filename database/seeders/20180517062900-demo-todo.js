'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos',
    [
      {
        text: 'Book flights',
        completed: true,
        EventId: 1,
        UserId: 1,
        AssignerId: 1,
        deadline: '2018-05-17'
      },
      {
        text: 'Book flights',
        completed: true,
        EventId: 1,
        UserId: 2,
        AssignerId: 1,
        deadline: '2018-05-17'
      },
      {
        text: 'Book flights',
        completed: true,
        EventId: 1,
        UserId: 3,
        AssignerId: 1,
        deadline: '2018-05-17'
      },
      {
        text: 'Pay Ralph for airbnb',
        completed: false,
        EventId: 1,
        UserId: 1,
        AssignerId: 2,
        deadline: '2018-05-15'
      },
      {
        text: 'Pay Ralph for airbnb',
        completed: false,
        EventId: 1,
        UserId: 2,
        AssignerId: 2,
        deadline: '2018-05-15'
      },
      {
        text: 'Pay Ralph for airbnb',
        completed: false,
        EventId: 1,
        UserId: 3,
        AssignerId: 2,
        deadline: '2018-05-15'
      },
      {
        text: 'Buy your ticket!!',
        completed: false,
        EventId: 3,
        UserId: 2,
        AssignerId: 2,
        deadline: '2018-06-02'
      },
      {
        text: 'Buy your ticket!!',
        completed: false,
        EventId: 3,
        UserId: 3,
        AssignerId: 2,
        deadline: '2018-06-02'
      },
      {
        text: 'Buy your ticket!!',
        completed: false,
        EventId: 2,
        UserId: 1,
        AssignerId: 2,
        deadline: '2018-06-02'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
