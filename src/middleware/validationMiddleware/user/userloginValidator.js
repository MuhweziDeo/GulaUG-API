import { userLoginValidator } from '../../../helpers/userValidations/userValidator';

const userLoginValidatorMiddlware = async  (req, res, next) => {
    let { body } = req;
    const { error } = userLoginValidator(body);

    if(error) return res.status(400).send({
        success:false,
        error:error.details[0].message,
        message:'Invalid payload'
    });

    next();

}

export default userLoginValidatorMiddlware;
