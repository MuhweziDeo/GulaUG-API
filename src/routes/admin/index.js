import { Router } from 'express';
import AdminController from "./AdminController";
import AuthMiddleware from '../../middleware/AuthMiddleware';
import AdminValidator from '../../middleware/validationMiddleware/user/AdminValidator';

const adminRouter = Router();

adminRouter.use(
    '/users',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin
);

adminRouter.get(
    '/users',
    AdminController.viewAllUsers
);

adminRouter.put(
    '/user/activation',
    AdminController.activateDeactivateUser
);

adminRouter.post(
    '/add',
    AdminValidator.validateRequestBody,
    AdminController.addAdminUser
);
adminRouter.put(
    '/verify/:token/confirm',
    AdminValidator.validateAdminConfirmation,
    AdminController.verifyAdminUser

);

export default  adminRouter;
