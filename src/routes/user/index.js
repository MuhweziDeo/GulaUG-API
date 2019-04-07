const express = require('express');
const userCreateValidator = require('../../middleware/validationMiddleware/user/userCreateValidator');
const userLoginValidator = require('../../middleware/validationMiddleware/user/userloginValidator');
const UserController = require('./userController');
const passwordResetRequestValidator = require('../../middleware/validationMiddleware/user/passwordRequestValidator');
const passwordResetConfirmValidator = require('../../middleware/validationMiddleware/user/passwordResetConfirm');

router = express.Router()

router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login',userLoginValidator, UserController.loginUser);

router.post('/password-reset',passwordResetRequestValidator, UserController.requestPasswordReset);

router.put('/password-reset/:token/confirm', passwordResetConfirmValidator, UserController.passwordResetConfirm);

module.exports = router;
