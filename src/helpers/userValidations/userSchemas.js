const Joi = require('joi');

const userCreateValidator = (data) => {
    const schema = {
        username:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().required()
    };

    return Joi.validate(data,schema,);
};

const adminCreateValidator = (data) => {
    const schema = {
        email:Joi.string().required().email(),
    };

    return Joi.validate(data,schema)
};

const adminConfrimationValidator = (data) => {
    const schema = {
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
        confirmPassword: Joi.string().required()
    };
    return Joi.validate(data,schema, {abortEarly:false});
};

const userLoginValidator = data => {
    const schema = Joi.object().keys({
        email:Joi.string().required().email(),
        password:Joi.string().required()
    });
    return Joi.validate(data,schema, {abortEarly: false})
};

const passwordResetRequestValidator = data => {
    const schema = {
        email:Joi.string().required().email()
    };
    return Joi.validate(data,schema)
};

const passwordResetConfirmValidator = data => {
    const schema = {
        password:Joi.string().required(),
        confirmPassword:Joi.string().required()
    };
    return Joi.validate(data,schema)
};
const updateProfileValidator = data => {
    const schema = {
        firstName:Joi.string(),
        lastName:Joi.string(),
        country:Joi.string(),
        city:Joi.string(),
        image: Joi.string()

    };
    return Joi.validate(data,schema)
};
const googleFacebookValidator = data => {
    const schema = {
        access_token: Joi.string().required()
    };
    return Joi.validate(data,schema)
};

const twitterTokenValidator = data => {
    const schema = {
        oauth_token: Joi.string().required(),
        oauth_token_secret: Joi.string().required(),
    };
    return Joi.validate(data,schema)
};

const passwordChangeSchema = data => {
    const schema = {
        newPassword: Joi.string().trim().required().min(5),
        passwordConfirmation: Joi.string().trim().required().min(5),
        oldPassword: Joi.string().trim().required().min(5)
    };
    return Joi.validate(data, schema);
};
module.exports = {
    userCreateValidator,
    userLoginValidator,
    passwordResetRequestValidator,
    passwordResetConfirmValidator,
    updateProfileValidator,
    googleFacebookValidator,
    twitterTokenValidator,
    adminCreateValidator,
    adminConfrimationValidator,
    passwordChangeSchema
};