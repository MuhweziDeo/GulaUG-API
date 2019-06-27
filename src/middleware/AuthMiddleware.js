import jwt from 'jsonwebtoken';

class AuthMiddleware {

    static async validateAdmin(req, res, next) {
        const { user: { isAdmin } } = req;
        if(!isAdmin) {
            return res.status(401).send({
                success: false,
                message: 'You dont have required privileges',
                help: 'Please contact admin',
                code: 401
            })
        }
        return next();
    }

   static async validateToken(req, res, next) {
        const { headers : { authorization } } = req;
       if (!authorization) return res.status(401).send({
           success:false,
           message:'Missing Authorization header',
           action:'Please pass in Authorization header'
       });

        try {
            req.user = await jwt.verify(authorization,process.env.SECRET);
            return  next();
        } catch (error) {
            res.status(500).send({
                error,
                success:false,
                message: "Token Couldn't Be Decoded"
            })
        }};
}

export default AuthMiddleware;
