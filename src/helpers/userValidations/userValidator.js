const Joi = require('joi');

const userCreateValidator = (data) => {
    const schema = {
        username:Joi.string().trim().required().min(3),
        email:Joi.string().trim().required().email(),
        password:Joi.string().trim().required().min(5)
    }

    return Joi.validate(data,schema)
}

const userLoginValidator = data => {
    const schema = {
        email:Joi.string().trim().required().email(),
        password:Joi.string().trim().required()
    }
    return Joi.validate(data,schema)
}

const passwordResetRequestValidator = data => {
    const schema = {
        email:Joi.string().trim().required().email()
    }
    return Joi.validate(data,schema)
}

const passwordResetConfirmValidator = data => {
    const schema = {
        password:Joi.string().trim().required().min(5),
        confirmPassword:Joi.string().trim().required().min(5)
    }
    return Joi.validate(data,schema)
}
const updateProfileValidator = data => {
    const schema = {
        firstName:Joi.string().trim().min(3),
        lastName:Joi.string().trim().min(3),
        country:Joi.string().trim().min(3),
        city:Joi.string().trim().min(3),

    }
    return Joi.validate(data,schema)
}
const googleFacebookValidator = data => {
    const schema = {
        access_token: Joi.string().required()
    }
    return Joi.validate(data,schema)
}

const twitterTokenValidator = data => {
    const schema = {
        oauth_token: Joi.string().required(),
        oauth_token_secret: Joi.string().required(),
    }
    return Joi.validate(data,schema)
}
module.exports = {
    userCreateValidator,
    userLoginValidator,
    passwordResetRequestValidator,
    passwordResetConfirmValidator,
    updateProfileValidator,
    googleFacebookValidator,
    twitterTokenValidator
}
