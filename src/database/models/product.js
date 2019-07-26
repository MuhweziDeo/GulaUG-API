'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    image1:DataTypes.STRING,
    image2:DataTypes.STRING,
    image3:DataTypes.STRING,
    image4:DataTypes.STRING,
    image5:DataTypes.STRING,
    productUuid: DataTypes.UUID,
    categoryId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: 'userId', as: 'Seller'
    });
    
    Product.hasMany(models.Specification, {
      foreignKey: 'productUuid', sourceKey: "productUuid"
    });

    Product.hasOne(models.Category, { sourceKey: "categoryId",
     foreignKey: 'id' });

    Product.hasOne(models.SubCategory, { sourceKey: "subCategoryId",
    foreignKey: 'id' })
    
  };
  return Product;
};
