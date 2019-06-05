import { passwordResetRequestValidator } from '../../../helpers/userValidations/userValidator';
import UserService from '../../../services/userService';
import _ from 'lodash';

const passwordResetRequestValidatorMiddlware = async  (req,res,next) => {
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

export default passwordResetRequestValidatorMiddlware;
