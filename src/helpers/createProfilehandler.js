const profileService = require('../services/profileService');

module.exports = function(id) {
    
return profileService.createUserProfile(id);

}