import uuidv1 from 'uuid';
import bcrypt from 'bcrypt';
const { User, Profile } = require('../database/models');

const saltRounds = 10;

class UserService {
    static async findUserByEmail(email) {
        try {
        const user = await User.findOne({
            where : { email }
        });
        return user;

        } catch (error) {
           return error;
        }

    }

    static async findUserByUsername(username){
        try {

        const user = await User.findOne({ where : { username } });
        return user;

        } catch (error) {
           return error;
        }
    }

    static async createUser(data){
        try {
            const { username , email , password } = data;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password,salt)

            const user = await User.create({
                username,
                email,
                password:hashedPassword
            });
            return user;

        } catch (error) {
         return error;
        }
    }


    static async verifyPassword(email,password){
        try {

        const user = await UserService.findUserByEmail(email)

        const verifyPassword = await bcrypt.compare(password,user.password);

        if(verifyPassword) {
            await user.update({
                lastLogin: new Date()
            })
        }

        return verifyPassword;

        } catch (error) {
             return error;
        }
    }

    static async updatePassword(email,password) {
        try {

            const user = await UserService.findUserByEmail(email)

            const hashPassword = await bcrypt.hash(password,saltRounds);

            const updateUser = await user.update({
                password:hashPassword
            })

            return updateUser;

            } catch (error) {
                 return error;
            }
    }

    static async registerSocialUser(userData,ProfileData) {
        const newUser = await User.create( { ...userData, email_verified: true,
            verified_on: new Date(), password: uuidv1(), active: true } );
        await Profile.create( {
            username: newUser.username,
            ...ProfileData } );

    return newUser;
    }

  static async verifyUser(email) {
        try {
            const verified = await User.update({ email_verified: true,
                active: true, verified_on: new Date() },
                { returning: true, where: { email } });

            return verified[1][0].dataValues;
        }catch (e) {
            return e;
        }
  }


}
export default UserService;

