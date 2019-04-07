const express = require('express');
const userCreateValidator = require('../../middleware/validationMiddleware/userCreateValidator');
const userLoginValidator = require('../../middleware/validationMiddleware/userloginValidator');
const UserController = require('./userController');

router = express.Router()

router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

router.post('/login',userLoginValidator, UserController.loginUser);

module.exports = router;
