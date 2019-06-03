const { googleFacebookValidator } = require('../../../helpers/userValidations/userValidator');

module.exports= async function (req,res,next) {
    const { body } = req;
    const { error } = googleFacebookValidator(body);

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    });
    
    next();

}
