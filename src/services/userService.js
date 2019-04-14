const { User, Profile } = require('../database/models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv1 = require('uuid');

class UserService{
    static async findUserByEmail(email) {
        try {

        const user = await User.findOne({ where : { email } });
        return user;

        } catch (error) {
          console.log(error)  
          throw new Error('couldnt get user');
        }
        
    }

    static async findUserByUsername(username){
        try {

        const user = await User.findOne({ where : { username } });
        return user;

        } catch (error) {
           console.log(error); 
           throw new Error('couldnt get user');
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
        throw new Error('couldnt create user');
        }
    }

    
    static async verifyPassword(email,password){
        try {
      
        const user = await UserService.findUserByEmail(email)
        
        const verifyPassword = await bcrypt.compare(password,user.password);
     
        return verifyPassword;

        } catch (error) {
            console.log(error);
            throw new Error('couldnt verify password');
        }
    }

    static async updatePassword(email,password) {
        try {
      
            const user = await UserService.findUserByEmail(email)
            
            const hashPassword = await bcrypt.hash(password,saltRounds);

            const updateUser = await user.update({
                password:hashPassword
            })

            console.log(updateUser)

            return updateUser;
         
           
    
            } catch (error) {
                console.log(error);
                throw new Error('couldnt update password');
            }
    }

    static async registerSocialUser(userData,ProfileData) {
        const newUser = await User.create( { ...userData, email_verified: true,
            verified_on: new Date(), password: uuidv1() } );
        console.log(newUser);
        await Profile.create( {
            username: newUser.username,
            ...ProfileData } );

    return newUser;
    }

  static async verifyUser(email){
    const verfied = await User.update({ email_verified: true, verified_on: new Date() },
        { returning: true, where: { email } });
        
    return verfied[1][0].dataValues;
    
  }  

}

module.exports = UserService;