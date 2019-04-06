const express = require('express');
const userCreateValidator = require('../../middleware/validationMiddleware/userCreateValidator');
const UserController = require('./userController');

router = express.Router()

router.post('/signup',userCreateValidator, UserController.signUpUser);

router.put('/verify/:token/',UserController.verifyUser);

module.exports = router;
