const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const UserService = require('../../services/userService');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

passport.use('facebook-token',new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
  }, async(accessToken, refreshToken, profile, done) => {
      try {
        const {displayName,_json:{ first_name, last_name, middle_name, email }, photos} = profile;
        const userEmail =  email ? email : `${displayName.split(" ").join("")}@facebook.com`
        const user = await UserService.findUserByEmail(userEmail);

        if(!user){
            const newUser = await UserService.registerSocialUser({
                  username: first_name ? first_name+uuidv1() : middle_name+uuidv1() || last_name+uuidv1() ,
                   email: userEmail },
                  { firstName: first_name, lastName:last_name, image: photos[0].value } );

            return done(null, _.pick(newUser,['id','username','email','isAdmin']));
          }
          return done(null,_.pick(user,['id','username','email','isAdmin']));

      } catch (error) {
          throw new Error(error)
      }
  }
));

module.exports = passport;
