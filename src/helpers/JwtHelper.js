require('dotenv').config();
import jwt from 'jsonwebtoken';
const jwtBlacklist = require('jwt-blacklist')(jwt);

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

    static async blackListToken(token) {
        const blackList = await jwtBlacklist.blacklist(token);
        return;

    }
    static async blackListTokenAndReturnNewToken(token) {
        try {
            const payload  = await JwtHelper.getPayloadData(token);
            if (!payload.isAdmin) {
                return { error: 'This token was already blacklist or expired'}
            }
            const { isAdmin, username, email } = payload;
            await JwtHelper.blackListToken(token);
            const access_token = await JwtHelper.generateToken({isAdmin, username, email},
                {expiresIn: '24hr'});
            return access_token;
        } catch (error) {
            return error;
        }
        

    }
}

export default JwtHelper;