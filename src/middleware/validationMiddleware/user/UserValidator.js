import UserService from '../../../services/userService';

class UserValidator {

    static async validateUserExistence(req, res , next) {

        const { body: { email } } = req;
        const user = await UserService.findUserByEmail(email);
        req.user = user;
        return next;
    }
}
export default UserValidator;