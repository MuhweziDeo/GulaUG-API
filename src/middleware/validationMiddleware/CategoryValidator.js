import Joi from 'joi';
import CategoryService from "../../services/CategoryService";


class CategoryValidator {

    static async validateCreateCategory(req, res, next) {
        const schema = {
            name: Joi.string().required().min(3)
        };

        const { error } = Joi.validate(req.body, schema);

        if(error) {
           return  res.status(400).send({
                success: false,
                message: error.details[0].message
            })
        }
        next();
    }

    static async validateUpdateCategory(req, res, next) {
        if(!req.body.name) {
            return res.status(400).send({
                message: 'Please provide name  value to update',
                success: false
            });
        }
        const schema = {
            name: Joi.string().min(3)
        };
        const { error } = Joi.validate(req.body, schema);

        if(error) {
            return  res.status(400).send({
                success: false,
                message: error.details[0].message
            })
        }
        next();
    }

    static async validateCategoryExistence(req, res, next) {
        const { params: { id } } = req;
        const result = await CategoryService.findCategoryById(id);
        if (!result) {
            return res.status(404).send({
                message: 'Category not found',
                success: false
            });
        }
        next();

    }
    static async validateSubCategoryExistence(req, res, next) {
        const { params: { subCategoryId } } = req;
        const result = await CategoryService.findSubCategoryById(subCategoryId);
        if (!result) {
            return res.status(404).send({
                message: 'SubCategory not found',
                success: false
            });
        }
        next();

    }
}

export  default CategoryValidator;
