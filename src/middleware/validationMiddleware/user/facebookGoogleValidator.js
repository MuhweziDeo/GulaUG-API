import { googleFacebookValidator } from '../../../helpers/userValidations/userValidator';

export default async function (req,res,next) {
    const { body } = req;
    const { error } = googleFacebookValidator(body);

    if (error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    });

    next();

}