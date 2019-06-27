import JoiValidatorHelper from  '../../helpers/JoiValidatorHelper';
import tokenSchema from '../../helpers/tokenValidator';


export default class TokenValidator { 

    static async verifyToken(req, res, next) {
        
        const response = await JoiValidatorHelper.validateRequest(req, res, next, tokenSchema)
        return response;
    }
}
