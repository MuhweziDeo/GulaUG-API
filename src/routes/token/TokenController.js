import JwtHelper from '../../helpers/JwtHelper';
import SendErrorHelpler from '../../helpers/sendErrorHelper';

export default class TokenController {

    static async blackListToken(req,res) {
        try {
            const { body: { token } } = req;
            await JwtHelper.blackListToken(token);
            return res.status(200).send({
                success: true,
                message: 'Token successfully blacklisted'
                
            });
        } catch (error) {
            SendErrorHelpler.sendError(res, error);
        }
        
    }

    static async tokenRefresh(req, res) {
        try {
            const { body: { token } } = req;
            const access_token = await JwtHelper.blackListTokenAndReturnNewToken(token);
            if (access_token.error) {
                return res.status(400).send({
                    success: false,
                    message: access_token.error
                })
            }
            return res.json({
                message: 'Token successfully refreshed',
                success: true,
                token: access_token
            });
        } catch (error) {
            SendErrorHelpler.sendError(res, error);
        }
       
    }
}