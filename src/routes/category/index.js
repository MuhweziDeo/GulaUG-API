import { Router } from 'express';
import CategoryController from './CategoryController';
import AuthMiddleware from '../../middleware/AuthMiddleware';
import CategoryValidator from "../../middleware/validationMiddleware/CategoryValidator";

const categoryRouter = Router();

categoryRouter.post(
    '/category',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryValidator.validateCreateCategory,
    CategoryController.createCategory
);

categoryRouter.get(
    '/category',
    CategoryController.getAllCategories
);

categoryRouter.patch(
    '/category/:id',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryValidator.validateUpdateCategory,
    CategoryController.updateCategory
);

categoryRouter.delete(
    '/category/:id',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryController.deleteCategory
);

categoryRouter.post(
    '/category/:id/subcategory',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryValidator.validateCategoryExistence,
    CategoryController.createSubcategory
);

categoryRouter.patch(
    '/category/:id/subcategory/:subCategoryId',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryValidator.validateCategoryExistence,
    CategoryValidator.validateSubCategoryExistence,
    CategoryController.updateSubCategory
);

categoryRouter.delete(
    '/category/:id/subcategory/:subCategoryId',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin,
    CategoryValidator.validateCategoryExistence,
    CategoryValidator.validateSubCategoryExistence,
    CategoryController.deleteSubCategory
);


export default categoryRouter;
