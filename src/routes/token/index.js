import { Router } from 'express';
import TokenValidator from '../../middleware/validationMiddleware/TokenValidator';
import TokenController from './TokenController';


const tokenRouter = Router();

tokenRouter.post(
    '/blacklist',
    TokenValidator.verifyToken,
    TokenController.blackListToken
)

tokenRouter.put(
    '/refresh',
    TokenValidator.verifyToken,
    TokenController.tokenRefresh

)

export default tokenRouter;