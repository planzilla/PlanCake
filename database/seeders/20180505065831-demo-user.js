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
          password: 'cey'
        },
        {
          firstName: 'Will',
          lastName: 'Ha',
          email: 'wvha@wvha.com',
          username: 'wvha',
          password: 'wvha'
        },
        {
          firstName: 'Brandon',
          lastName: 'Villiados',
          email: 'bv@bv.com',
          username: 'bv',
          password: 'bv'
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  }
};
