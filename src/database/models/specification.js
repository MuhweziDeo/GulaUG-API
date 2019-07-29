'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Specification.associate = function(models) {
    // associations can be defined here
    Specification.belongsTo(models.Product, {
      foreignKey: 'productUuid'
    })
  };
  return Specification;
};