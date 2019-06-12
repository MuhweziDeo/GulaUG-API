import uuidv1 from 'uuid';
import bcrypt from 'bcrypt';
import { Profile, User } from '../database/models';
import ProfileService from '../services/profileService';

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

    static async createAdminUser(email) {
        try {
            const username = uuidv1();
            const user = await User.create({
                email,
                username,
                password: await bcrypt.hash(uuidv1(),10)
            });
            await ProfileService.createUserProfile(username);
            return user;
        } catch (error) {
            return error;
        }
    }

    static async verifyAdminUser(email, data) {
        try {
            const { password, username } = data;
            const admin = await User.update({
                password: await bcrypt.hash(password, 10),
                username,
                active:true,
                isAdmin: true,
                email_verified:true,
                verified_on: new Date()},{
                    where: {email},
                    returning: true,
                    attributes:['id', 'username','isAdmin','createdAt', 'updatedAt',
                    'email', 'active', 'email_verified']
                });
            return admin;

        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

export default AdminService;
