
class JoiValidatorHelper {

    static async validateRequest(req,res, next, Validator) {
        const { body } = req;
        const { error } = Validator(body);
        if (error) return res.status(400).send({
                success: false,
                message: error.details[0].message
        });
       return next();


    }

}

export default JoiValidatorHelper;
