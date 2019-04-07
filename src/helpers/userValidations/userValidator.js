const Joi = require('joi');

const userCreateValidator = (data) => {
    const schema = {
        username:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    }

    return Joi.validate(data,schema)
}

const userLoginValidator = data => {
    const schema = {
        email:Joi.string().required().email(),
        password:Joi.string().required()
    }
    return Joi.validate(data,schema)
}

const passwordResetRequestValidator = data => {
    const schema = {
        email:Joi.string().required().email()
    }
    return Joi.validate(data,schema)
}

const passwordResetConfirmValidator = data => {
    const schema = {
        password:Joi.string().required(),
        confirmPassword:Joi.string().required()
    }
    return Joi.validate(data,schema)
}
module.exports = {
    userCreateValidator,
    userLoginValidator,
    passwordResetRequestValidator,
    passwordResetConfirmValidator
}