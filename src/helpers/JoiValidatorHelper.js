
class JoiValidatorHelper {

    static async validateRequest(req,res, next, Validator) {
        const { body } = req;
        const { error } = Validator(body);
        let errors = [];
        if (error) {
            error.details.forEach(e => {
                errors.push(e.message)
            });
            return res.status(400).send({
                success: false,
                errors
        });
        }
       return next();


    }

}

export default JoiValidatorHelper;
