import Joi from 'joi';


export const specificationSchema = {
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(3),
};
export const specificationSchemaValidate = (data) => {
    
    return Joi.validate(data, specificationSchema, {abortEarly: false});
};
export const productSchema = (data) => {
    const schema = Joi.object().keys ({
        name: Joi.string().required().min(3),
        description: Joi.string().required().min(3),
        price: Joi.number().required(),
        image1:Joi.string().required(),
        image2:Joi.string(),
        image3:Joi.string(),
        image4:Joi.string(),
        image5:Joi.string(),
        specifications: Joi.array().items(
            Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required().min(3) }))
            .has(specificationSchema)
            .required(),
        subCategoryId: Joi.number().required(),
        categoryId: Joi.number().required()
    });

    return Joi.validate(data, schema, {abortEarly: false});
};

export const updateproductSchema = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3),
        description: Joi.string().min(3),
        price: Joi.number(),
        image1:Joi.string(),
        image2:Joi.string(),
        image3:Joi.string(),
        image4:Joi.string(),
        image5:Joi.string(),
        subCategoryId: Joi.number(),
        categoryId: Joi.number()

    });

    return Joi.validate(data, schema, {abortEarly: false});
};


