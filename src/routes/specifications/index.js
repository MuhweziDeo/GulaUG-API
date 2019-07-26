import { Router } from 'express';
import SpecificationController from './SpecificationsController';
import AuthMiddleWare from '../../middleware/AuthMiddleware';
import PermissionMiddleware from '../../middleware/PermissionMiddleware';
import ProductValidator from '../../middleware/validationMiddleware/ProductValidator';

const specificationsRouter = Router();

specificationsRouter.use(
    '/:productUUid',
    AuthMiddleWare.validateToken,
    ProductValidator.validateProductExistence,
    PermissionMiddleware.checkIfIsProductOwner
);

specificationsRouter.post(
    '/:productUUid',
    ProductValidator.validateSpecificationsAddition,
    SpecificationController.addSpecification
);

specificationsRouter.put(
    '/:productUUid/:id',
    ProductValidator.validateSpecificationExistence,
    ProductValidator.validateSpecificationsAddition,
    SpecificationController.updateSpecification
);

specificationsRouter.delete(
    '/:productUUid/:id',
    ProductValidator.validateSpecificationExistence,
    SpecificationController.deleteSpecification
);

export default specificationsRouter;