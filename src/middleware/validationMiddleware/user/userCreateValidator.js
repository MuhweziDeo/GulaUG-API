const { userCreateValidator } = require('../../../helpers/userValidations/userValidator');
const UserService = require('../../../services/userService');

module.exports = async function  (req, res, next){
    const { body } = req
    const { error } = userCreateValidator(body);
    
    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    });
    const attemptedUsername = await UserService.findUserByUsername(body.username);
    const attemptedEmail = await UserService.findUserByEmail(body.email);

    if (attemptedUsername) {
    res.status(400).send({
            success: false,
            message: 'username already taken'
        });
    }


    if (attemptedEmail) {
       return res.status(400).send({
            success: false,
            message: 'email already taken'
        });
    }


    next();
}
