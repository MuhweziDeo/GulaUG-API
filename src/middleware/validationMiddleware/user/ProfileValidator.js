class ProfileValidator {

    static async profileUpdateValidator(req, res, next) {
        const { user:{ username }} = req;

        if(username !== req.params.username) {
            return res.status(403).send({
                success:false,
                message:'Permission Denied'
            });
        }
        next();


    }
}

export default ProfileValidator;
