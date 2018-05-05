'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          firstName: 'Christina',
          lastName: 'Yuen',
          email: 'cey@cey.com',
          username: 'cey',
          password: 'cey',
          createdAt: '2018-05-05T06:52:26.282Z'
        },
        {
          firstName: 'Will',
          lastName: 'Ha',
          email: 'wvha@wvha.com',
          username: 'wvha',
          password: 'wvha',
          createdAt: '2018-05-06T06:52:26.282Z'
        },
        {
          firstName: 'Brandon',
          lastName: 'Villiados',
          email: 'bv@bv.com',
          username: 'bv',
          password: 'bv',
          createdAt: '2018-05-07T06:52:26.282Z'
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
