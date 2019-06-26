import uuidv1 from 'uuid/v1';
import ProfileService from  '../services/ProfileService';
import UserService from '../services/UserService';
import _ from 'lodash';

class UserHelper {
    static async updateProfileImage(username, imageURL) {
        const { image } = await ProfileService.getProfile(username);
        if (!image) { await ProfileService.updateProfile(username, { image: imageURL }) };
    }
    
    static async createSocialUser(email, firstName, lastName, image) {
        const user = await UserService.findUserByEmail(email);
        if(!user){
        const newUser = await UserService.registerSocialUser({
                username:firstName + lastName + uuidv1().split('-')[0],
                email
            },{firstName: firstName, lastName:lastName, image:image })
            
            return _.pick(newUser,['id','username','email','isAdmin', 'active']);
        }
        return user;
    }
}

export default UserHelper;