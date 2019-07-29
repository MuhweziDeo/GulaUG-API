import { Router } from 'express';
import ProductController from "./ProductController";
import AuthMiddleware from '../../middleware/AuthMiddleware';
import ProductValidator from '../../middleware/validationMiddleware/ProductValidator';
import PermissionHelper from '../../middleware/PermissionMiddleware';

const productRouter = Router();

productRouter.get(
    '',
    ProductController.getAllProducts
);

productRouter.post(
    '',
    AuthMiddleware.validateToken,
    ProductValidator.validateProductRequest,
    ProductValidator.validateSubCategoryCategoryExistence,
    ProductController.createProduct
);

productRouter.get(
    '/:productUUid',
    ProductValidator.validateProductExistence,
    ProductController.getProduct
);

productRouter.put(
    '/:productUUid',
    AuthMiddleware.validateToken,
    ProductValidator.validateProductExistence,
    ProductValidator.validateUpdateProduct,
    PermissionHelper.checkIfIsProductOwner,
    ProductValidator.validateSubCategoryCategoryExistence,
    ProductController.updateProduct
);

productRouter.delete(
    '/:productUUid',
    AuthMiddleware.validateToken,
    ProductValidator.validateProductExistence,
    PermissionHelper.checkIfIsProductOwner,
    ProductController.deleteProduct
);


export default productRouter;
