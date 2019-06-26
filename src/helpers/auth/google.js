const _ = require('lodash');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passport = require('passport');
import UserHelper from '../UserHelper';

passport.use('google-token', new GooglePlusTokenStrategy({
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
    const {_json:{ image: { url }, name:{ familyName, givenName }, emails } } = profile;
    const user = await UserHelper.createSocialUser(emails[0].value, familyName, givenName, url);
    await UserHelper.updateProfileImage(user.username, url);
    return done(null,_.pick(user,['id','username','email','isAdmin', 'active']));

    } catch (error) {
       return error;
    }
   
}));

export default passport;
