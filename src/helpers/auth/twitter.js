const TwitterTokenStrategy = require('passport-twitter-token');
const passport = require('passport');
import  UserService from '../../services/UserService';
const uuidv1 = require('uuid/v1');

passport.use('twitter-token',new TwitterTokenStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY ,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET
     
  }, async(token, tokenSecret, profile, done) => {
    try {
    const {_json:{ screen_name, name, profile_image_url },username, emails, 
            photos, name: { familyName, givenName }
        } = profile;  
    
    const user = emails[0].value ? 
        await UserService.findUserByEmail(emails[0].value) :
        await UserService.findUserByEmail(`${screen_name}@twitter.com`);

    if(!user){
        const newUser = await UserService.registerSocialUser({
            email: emails[0].value ? emails[0].value :`${screen_name}@twitter.com`,
            username: username+uuidv1()
        },{image: profile_image_url, lastName: givenName, firstName: familyName})
        return done(null,newUser);
    }
    return done(null,user);

    } catch (error) {
        console.log(error);
    }
   
  }
));

export default passport;