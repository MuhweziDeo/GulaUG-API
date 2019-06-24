const profileService = require('../services/ProfileService');

module.exports = function(username) {
    
return profileService.createUserProfile(username);

}