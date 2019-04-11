'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Users','isAdmin', {
    type:Sequelize.BOOLEAN
  })
  ,
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('Users','isAdmin')
};
