const GooglePlusTokenStrategy = require('passport-google-plus-token');
const passport = require('passport');
const UserService = require('../../services/userService');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

passport.use('google-token', new GooglePlusTokenStrategy({
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    try {
    const {_json:{ image: { url }, name:{ familyName, givenName }, emails } } = profile;
    const user = await UserService.findUserByEmail(emails[0].value);
    if(!user){
    const newUser = await UserService.registerSocialUser({
            username:familyName + givenName + uuidv1(),
            email:emails[0].value,
        },{firstName: familyName, lastName:givenName, image:url,})
        
        return done(null, _.pick(newUser,['id','username','email','isAdmin']));
    }
    return done(null,_.pick(user,['id','username','email','isAdmin']));
    } catch (error) {
        console.log(error);
       throw new Error(error)
    }
   
}));

module.exports = passport
