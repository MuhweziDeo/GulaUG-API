'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users','active', {
    type: Sequelize.BOOLEAN,
    default: false
  })
  ,

  down: (queryInterface) => queryInterface.removeColumn('Users', '')};
