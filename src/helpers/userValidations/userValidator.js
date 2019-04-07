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

module.exports = {
    userCreateValidator,
    userLoginValidator
}