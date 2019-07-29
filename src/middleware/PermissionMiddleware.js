export default class PermissionHelper {

    static checkIfIsProductOwner(req, res, next) {
            const { user: { id }, product: { userId } } = req;
            if (id === userId) {
                return next();
            }
            return res.status(403).send({
                success: false,
                message: 'Permission Denied'
            });
    }
}