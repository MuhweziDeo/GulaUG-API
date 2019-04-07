const { User } = require('../database/models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

}

module.exports = UserService;