import JoiValidator from  '../../../helpers/JoiValidatorHelper';
import { googleFacebookValidator, twitterTokenValidator } from '../../../helpers/userValidations/userSchemas';

class SocialValidator {

    static async facebookGoogleTokenValidator(req,res,next) {
        const response = await JoiValidator.validateRequest(req,res,next,googleFacebookValidator);
        return response;
    }

    static async twitterTokenValidator(req, res, next) {
        const response = await JoiValidator.validateRequest(req,res,next,twitterTokenValidator);
        return response;
    }
}

export default SocialValidator;