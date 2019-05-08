const { Profile, User } = require('../database/models');
const _ = require('lodash');

class ProfileService {

static async createUserProfile(username) {
    const userProfile = await Profile.create({
        username
    });
    return userProfile;
}

static async getProfile(username) {
    const user = await User.findOne({ where: { username } } )
   
    const profile = await Profile.findOne({ where :{ username } })
    
    if(!profile) return {message:'No Matching Profile found'};
    return {
       profile:_.pick(profile,['id','lastName','firstName','city','country','image']),
       user:_.pick(user,['username','email','id'])
    }
}

static async updateProfile(username, updateObj) {
    const profileUpdate = await Profile.update({ ...updateObj },
        { returning: true, where: { username } });
    return profileUpdate[1][0];
}
static async getProfiles () {
    const profiles = await Profile.findAll();
    
    return profiles
}
}

module.exports = ProfileService
