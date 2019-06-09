import uuidv1 from 'uuid';
import bcrypt from 'bcrypt';
import { Profile, User } from '../database/models';

class AdminService {

    static async getAllUsers(query) {

        const users = await Profile.findAll({
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                },
                where: query
            }],
        });
        return  users;
    }

    static async createAdminAccount(email) {
        const user = await User.create({
            username: 'SuperAdmin',
            email,
            password: await bcrypt.hash(uuidv1(),10),
            isAdmin: true,
            active: true,
            email_verified: true
        });
        return user;
    }

    static async deactivateOrActivateUser(userId, activateStatus) {
        try {
            const user = await User.update({
                active: activateStatus }, {
                where: { id: userId },
                returning: true,
            });
            return user;
        }catch (e) {
            return e;
        }

    }
}

export default AdminService;
