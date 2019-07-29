
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    city:DataTypes.STRING,
    country:DataTypes.STRING,
    image:DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey:'username',
      targetKey:'username' })
  };
  return Profile;
};
