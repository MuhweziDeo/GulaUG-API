module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
     type: DataTypes.STRING,
     unique: true
    } ,
    email: {
      type: DataTypes.STRING,
      unique: true,
    validate: {
      isEmail : true
    } } ,
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verified_on: DataTypes.DATE,
    password: DataTypes.STRING,
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Product, {
      foreignKey: 'userId'
    });
    User.hasOne(models.Profile, {
      foreignKey: 'username', as: 'Profile', sourceKey: "username"
    })
  };
  return User;
};
