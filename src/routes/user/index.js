const express = require('express');
const userCreateValidator = require('../../middleware/validationMiddleware/user/userCreateValidator');
const userLoginValidator = require('../../middleware/validationMiddleware/user/userloginValidator');
const UserController = require('./userController');
const passwordResetRequestValidator = require('../../middleware/validationMiddleware/user/passwordRequestValidator');
const passwordResetConfirmValidator = require('../../middleware/validationMiddleware/user/passwordResetConfirm');
const googleFacebookTokenValidator = require('../../middleware/validationMiddleware/user/facebookGoogleValidator'); 
const twitterTokenValidator = require('../../middleware/validationMiddleware/user/twitterTokenValidator');
const tokenAuthentication = require('../../middleware/auth/tokenAuthentication');
const profileUpdateValidator = require('../../middleware/validationMiddleware/user/profileUpdateValidator');
const { multerUploads } = require('../../middleware/multer');
const googlePassport = require('../../helpers/auth/google');
const facebookPassport = require('../../helpers/auth/facebook');
const twitterPassport = require('../../helpers/auth/twitter');

router = express.Router()
router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login',userLoginValidator, UserController.loginUser);

router.post('/password-reset',passwordResetRequestValidator, UserController.requestPasswordReset);

router.put('/password-reset/:token/confirm', passwordResetConfirmValidator, UserController.passwordResetConfirm);

router.get('/profile/:username', UserController.getProfile);

router.get('/profiles', UserController.getProfiles);

router.put('/profile/:username',tokenAuthentication, multerUploads, profileUpdateValidator, UserController.updateProfile)

router.post('/google',googleFacebookTokenValidator,googlePassport.authenticate('google-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/facebook',googleFacebookTokenValidator,facebookPassport.authenticate('facebook-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/twitter',twitterTokenValidator, twitterPassport.authenticate('twitter-token',{session: false }),UserController.socialAuthenticationHandler);

module.exports = router;
