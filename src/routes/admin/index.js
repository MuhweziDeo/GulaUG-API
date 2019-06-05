import { Router } from 'express';
import AdminController from "./AdminController";
import AuthMiddleware from '../../middleware/AuthMiddleware';

const adminRouter = Router();

adminRouter.use(
    '/users',
    AuthMiddleware.validateToken,
    AuthMiddleware.validateAdmin
)

adminRouter.get(
    '/users',
    AdminController.viewAllUsers
);

adminRouter.put(
    '/user/activation',
    AdminController.activateDeactivateUser
)

export default  adminRouter;
