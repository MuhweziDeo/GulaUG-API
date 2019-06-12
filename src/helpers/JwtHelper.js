require('dotenv').config();
import jwt from 'jsonwebtoken';

class JwtHelper {

    static async generateToken(payload, options) {
        const token = await jwt.sign(payload, process.env.SECRET, options);
        return token;
    }

    static async getPayloadData(token) {
        try {
            const payload = await jwt.verify(token, process.env.SECRET);
            return payload 
        } catch (error) {
            return {
                success: false,
                message: 'Couldnot decode token',
                error
            }
        }
        
    }
}

export default JwtHelper;