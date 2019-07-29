import { 
    productSchema, 
    updateproductSchema, 
    specificationSchemaValidate  
} from '../../helpers/schemas/productSchema';
import JoiValidatorHelper from '../../helpers/JoiValidatorHelper';
import ProductService from '../../services/ProductService';
import SpecificationService from '../../services/SpecificationService';
import CategoryService from "../../services/CategoryService";

export default class ProductValidator {

    static async validateProductRequest(req, res, next) {
        const response = await JoiValidatorHelper.validateRequest(
            req, 
            res , 
            next , 
            productSchema);
        return response;
    }

    static async validateUpdateProduct(req, res, next) {
        if (Object.keys(req.body).length === 0) {
           return res.status(400).send({
               message: 'Empty body is not allowed',
               success: false
           });
        }
        const response = await JoiValidatorHelper.validateRequest(
            req, 
            res , 
            next , 
            updateproductSchema);
        return response;
    }

    static async validateProductExistence(req, res, next) {
        const { params: { productUUid } } = req;
        const product = await ProductService.findProductByUuid(productUUid);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product doesnt exist'
            })
        }
        req.product = product;
        return next();

    }

    static async validateSpecificationsAddition(req, res, next) {
        const response = await JoiValidatorHelper.validateRequest(
            req, 
            res , 
            next , 
            specificationSchemaValidate);
        return response;
    }

    static async validateSpecificationExistence(req, res , next) {
        const { params: { id, productUUid } } = req;
        const specification = await SpecificationService.findSpecification(productUUid, id)
        if (!specification) {
            return res.status(404).send({
                message: 'Specification doesnt exist',
                success: false
            });
        }
        req.specification = specification;
        return next()
    }

    static async validateSubCategoryCategoryExistence(req, res, next) {
        const { body: { subCategoryId, categoryId} } = req;

        if (!subCategoryId && !categoryId) return next();

        if (subCategoryId && !categoryId) {
            return res.status(400).send({
                success: false,
                message: 'Cannot update subcategory without category'
            });
        }

        if(categoryId && !subCategoryId) {
            return res.status(400).send({
                success: false,
                message: 'Cannot update category without subcategory'
            });
        }

        const categorySubcategoryExistence = await CategoryService.findCategoryAndSubcategory(
            subCategoryId, categoryId);

        if (!categorySubcategoryExistence) return res.status(404).send({
            message: 'Category or Subcategory doesnt exist',
            success: false
        });
        return next();
    }

}