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
            console.log(hashedPassword)
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

}
// console.log(UserService.findUserByEmail('esmsasnissssssasashsssssssassssalsassjasaasasaaasssaa@sagamil.com').then(user =>console.log(user)))
module.exports = UserService;