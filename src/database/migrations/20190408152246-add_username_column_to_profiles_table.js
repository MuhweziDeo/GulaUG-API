'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.addColumn('Profiles', 'username',
   {
     type: Sequelize.STRING,
     references:{
       model:'Users',
       key:'username'
     },
     onUpdate: 'CASCADE',
     onDelete: 'SET NULL',
   })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn(
     'Profiles', 'username'
   )
  }
};
