const { Profile, User, Product } = require('../database/models');

export default class ProfileService {

static async createUserProfile(username) {
    const userProfile = await Profile.create({
        username
    });
    return userProfile;
}

static async getProfile(username) {

    const profile = await Profile.findOne({ where :{ username },
        include: [ {
        model: User, attributes: {
            exclude: ['password'] }
        } ]
    });

    if(!profile) return {message:'No Matching Profile found'};

    return profile;
}

static async updateProfile(username, updateObj) {
  try {
    const profileUpdate = await Profile.update({ ...updateObj },
        { returning: true, where: { username } });
    return profileUpdate[1][0];

  } catch (e) {
     return error;
  }

}
static async getProfiles () {
    const profiles = await Profile.findAll({
        include: [{
            model: User,
            attributes: {
                exclude: ['password']
            },
            include: [Product],
            where: {active: true}
        }]
    });

    return profiles
}
}

module.exports = ProfileService;
