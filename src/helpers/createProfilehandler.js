const profileService = require('../services/ProfileService');

module.exports = (username) => {
    
return profileService.createUserProfile(username);

};