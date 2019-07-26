import UserService from '../../../services/UserService';
import JoiValidatorHelper from '../../../helpers/JoiValidatorHelper';
import {
passwordResetRequestValidator,
passwordResetConfirmValidator,
userCreateValidator,
userLoginValidator,
passwordChangeSchema
} from '../../../helpers/userValidations/userSchemas';
import _ from 'lodash';

class UserValidator {

    static async createUserValidator(req,res,next) {
        const response = await JoiValidatorHelper.validateRequest(req, res, next, userCreateValidator);
         if (response && response.statusCode === 400) {
            return response;
         }
         const { body } = req;
         const attemptedUsername = await UserService.findUserByUsername(body.username);
         const attemptedEmail = await UserService.findUserByEmail(body.email);

         if (attemptedUsername) {
         res.status(400).send({
                 success: false,
                 message: 'username already taken'
             });
         }

         if (attemptedEmail) {
            return res.status(400).send({
                 success: false,
                 message: 'email already taken'
             });
         }

    }

    static async userLoginValidator(req, res, next) {
        const response = await JoiValidatorHelper.validateRequest(req, res, next, userLoginValidator);
        return response;
    }

    static async validatePasswordResetRequest(req,res,next) {
        const { body : { email } } = req;
        const { error } = passwordResetRequestValidator(req.body);

        if (error) return res.status(400).send({
            success: false,
            message: error.details[0].message
        });

        const user = await UserService.findUserByEmail(email)

        if(!user) return res.status(404).send({
            success:false,
            message:'A user with that email wasnot found'
        });
        req.user = _.pick(user, ['username', 'email', 'id','isAdmin']);
        next()
    }

    static async validatePasswordResetConfirmation(req, res, next) {
        const response = await JoiValidatorHelper.validateRequest(req, res, next, passwordResetConfirmValidator);
        return response;
    }

    static async validateChangePassword(req,res, next) {
        const response = await JoiValidatorHelper.validateRequest(req, res, next, passwordChangeSchema);
        return response;
    }
}
export default UserValidator;
