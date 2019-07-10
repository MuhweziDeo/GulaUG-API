'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users','lastLogin', {
    type: Sequelize.DATE
  })
  ,

  down: (queryInterface) => queryInterface.removeColumn('Users', '')};
