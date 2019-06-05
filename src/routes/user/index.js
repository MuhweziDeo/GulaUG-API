import express from 'express';
import userCreateValidator from '../../middleware/validationMiddleware/user/userCreateValidator';
import userLoginValidator from '../../middleware/validationMiddleware/user/userloginValidator';
import UserController from './userController';
import passwordResetRequestValidator from '../../middleware/validationMiddleware/user/passwordRequestValidator';
import passwordResetConfirmValidator from '../../middleware/validationMiddleware/user/passwordResetConfirm';
import googleFacebookTokenValidator from '../../middleware/validationMiddleware/user/facebookGoogleValidator';
import twitterTokenValidator from '../../middleware/validationMiddleware/user/twitterTokenValidator';
import AuthMiddleware from '../../middleware/AuthMiddleware';
import profileUpdateValidator from '../../middleware/validationMiddleware/user/profileUpdateValidator';
import { multerUploads } from '../../middleware/multer';
import googlePassport from '../../helpers/auth/google';
import facebookPassport from '../../helpers/auth/facebook';
import twitterPassport from '../../helpers/auth/twitter';

const router = express.Router()

router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login',userLoginValidator, UserController.loginUser);

router.get('/user', AuthMiddleware.validateToken, UserController.getLoggedInUser);

router.post('/password-reset',passwordResetRequestValidator, UserController.requestPasswordReset);

router.put('/password-reset/:token/confirm', passwordResetConfirmValidator, UserController.passwordResetConfirm);

router.get('/profile/:username', UserController.getProfile);

router.get('/profiles', UserController.getProfiles);

router.put('/profile/:username',AuthMiddleware.validateToken, multerUploads, profileUpdateValidator, UserController.updateProfile)

router.post('/google',googleFacebookTokenValidator,googlePassport.authenticate('google-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/facebook',googleFacebookTokenValidator,facebookPassport.authenticate('facebook-token',{session: false }),UserController.socialAuthenticationHandler);

router.post('/twitter',twitterTokenValidator, twitterPassport.authenticate('twitter-token',{session: false }),UserController.socialAuthenticationHandler);

export default router;
