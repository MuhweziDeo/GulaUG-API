import UserService from '../services/UserService';
import AdminService from '../services/AdminService';
import createProfileHandler from './createProfilehandler';
require('dotenv').config;

class StartupHelper {
    static async createSuperAdmin() {
        if(!process.env.SUPER_ADMIN_EMAIL) {
            throw new Error('SuperAdmin Email missing in enviroment');
            
        }
        const user = await UserService.findUserByEmail(process.env.SUPER_ADMIN_EMAIL);
        if (!user) {
            const { username } = await AdminService.createAdminAccount(process.env.SUPER_ADMIN_EMAIL);
            await createProfileHandler(username);
            return;
        }
        return 'Super admin already exists';
        
    }
}

export default StartupHelper;