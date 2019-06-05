const { userLoginValidator } = require('../../../helpers/userValidations/userValidator');

module.exports = async function (req, res, next) {
    const { body } = req;
    const { error } = userLoginValidator(body);

    if(error) return res.status(400).send({
        success:false,
        error:error.details[0].message,
        message:'Invalid payload'
    });

    next();

}