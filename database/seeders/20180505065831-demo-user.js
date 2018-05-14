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
          password: '$2a$10$Y9L7AUUcGONJHheJc1R6behNdKvTmT4RlFDQLjuHLkP2p9p1LPUm2' //cey
        },
        {
          firstName: 'Will',
          lastName: 'Ha',
          email: 'wvha@wvha.com',
          username: 'wvha',
          password: '$2a$10$8hQgfy2E9m1iYVnb6LCs.ONMf/TvE3UfuMnuPy.TRcGTctVhZQ9YC' //wvha
        },
        {
          firstName: 'Brandon',
          lastName: 'Villiados',
          email: 'bv@bv.com',
          username: 'bv',
          password: '$2a$10$Bp0HUPh2iDk3m0316cgmtOX3DH/1zHxs/7vaCFdw1ABZZCOOWvQ2u' //bv
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
