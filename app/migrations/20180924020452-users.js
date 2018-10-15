'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Businesses', 'business_form', {type:Sequelize.INTEGER})
    queryInterface.addColumn('Businesses','industry_id',{type:Sequelize.INTEGER});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
