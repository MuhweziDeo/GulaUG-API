import { updateProfileValidator } from '../../../helpers/userValidations/userValidator';

class ProfileValidator {

    static async profileUpdateValidator(req, res, next) {
        const { body ,user:{ username }} = req;
        
        if(username !== req.params.username) {
            return res.status(403).send({
                success:false,
                message:'Permission Denied'
            });
        }

        if(Object.keys(body).length === 0 ){
            return res.status(400).send({
                success:false,
                message:'Please Provide atleast one value to update'
            })
        }
        const { error } = updateProfileValidator(body)
        if (error) return res.status(400).send({
            success: false,
            message: error.details[0].message
        });

        next();

        
    }
}

export default ProfileValidator;