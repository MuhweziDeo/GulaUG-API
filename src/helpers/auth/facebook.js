const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
import  UserService  from  '../../services/UserService';
import UserHelper from '../UserHelper';
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

passport.use('facebook-token',new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
  }, async(accessToken, refreshToken, profile, done) => {
      try {
        const {displayName,_json:{ first_name, last_name, middle_name, email }, photos} = profile;
        const userEmail =  email ? email : `${displayName.split(" ").join("")}@facebook.com`
        const user = await UserHelper.createSocialUser(userEmail, first_name, middle_name || last_name, photos[0].value);
        await UserHelper.updateProfileImage(user.username, photos[0].value);
        return done(null,_.pick(user,['id','username','email','isAdmin', 'active']));

      } catch (error) {
          return error;
      }
  }
));

export default passport;
