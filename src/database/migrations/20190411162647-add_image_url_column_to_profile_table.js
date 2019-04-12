'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Profiles','image',{
    type:Sequelize.STRING
  }),

  down: (queryInterface) => queryInterface.removeColumn('Profiles','image')
};
