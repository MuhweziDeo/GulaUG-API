const profileService = require('../services/profileService');

module.exports = function(username) {
    
return profileService.createUserProfile(username);

}