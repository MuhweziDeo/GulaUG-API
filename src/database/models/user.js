
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
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
