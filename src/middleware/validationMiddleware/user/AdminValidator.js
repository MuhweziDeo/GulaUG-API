import { adminCreateValidator, adminConfrimationValidator} from '../../../helpers/userValidations/userValidator';
import UserService from '../../../services/userService';

class AdminValidator {

    static async validateRequestBody(req,res, next) {
        const { error } = adminCreateValidator(req.body);
        if (error) return res.status(400).send({
            success: false,
            message: error.details[0].message
        });
        const user = await UserService.findUserByEmail(req.body.email);
        
        if(user) return res.status(400).send({
            success: false,
            message: 'A user with email already exists'
        });
        return next();

    }
    static async validateAdminConfirmation(req, res, next) {
        const { error } = adminConfrimationValidator(req.body);
        if (error) return res.status(400).send({
            success: false,
            message: error.details[0].message
        });
        const user = await UserService.findUserByUsername(req.body.username);
        
        if (user) return res.status(400).send({
            success: false,
            message: 'A user with username already exists'
        });
        return next();
        
    }
}

export default AdminValidator;