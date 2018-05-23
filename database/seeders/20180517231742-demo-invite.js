'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Invites',
    [
      {
        email: 'cey@cey.com',
        UserId: null,
        EventId: 3,
        emailStatus: true,
      },
      {
        email: 'wvha@wvha.com',
        UserId: null,
        EventId: 2,
        emailStatus: true,
      },
      {
        email: 'bv@bv.com',
        UserId: null,
        EventId: 2,
        emailStatus: true,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Invites', null, {});
  }
};