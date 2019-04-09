
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    city:DataTypes.STRING,
    country:DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey:'username' })
  };
  return Profile;
};