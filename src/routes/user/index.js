const express = require('express');
const userCreateValidator = require('../../middleware/validationMiddleware/user/userCreateValidator');
const userLoginValidator = require('../../middleware/validationMiddleware/user/userloginValidator');
const UserController = require('./userController');
const passwordResetRequestValidator = require('../../middleware/validationMiddleware/user/passwordRequestValidator');
const passwordResetConfirmValidator = require('../../middleware/validationMiddleware/user/passwordResetConfirm');
const tokenAuthentication = require('../../middleware/auth/tokenAuthentication');
const profileUpdateValidator = require('../../middleware/validationMiddleware/user/profileUpdateValidator');
router = express.Router()

router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login',userLoginValidator, UserController.loginUser);

router.post('/password-reset',passwordResetRequestValidator, UserController.requestPasswordReset);

router.put('/password-reset/:token/confirm', passwordResetConfirmValidator, UserController.passwordResetConfirm);

router.get('/profile/:username', tokenAuthentication, UserController.getProfile);

router.get('/profiles', UserController.getProfiles);

router.put('/profile/:username',tokenAuthentication, profileUpdateValidator, UserController.updateProfile)

module.exports = router;
