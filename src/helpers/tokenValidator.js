import Joi from  'joi';

const tokenSchema = token => {
    const schema = {
        token: Joi.string().required().min(50)
    }
    return Joi.validate(token,schema)
}

export default tokenSchema;