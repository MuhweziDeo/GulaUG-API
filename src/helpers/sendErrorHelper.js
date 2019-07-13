export default class SendErrorHelper {

  static async sendError (res, error){
    return res.status(500).send({
        success: false,
        message:'Unable to complete the request',
        info: 'Kindly contact support for assistance',
        error
    });
  }
}


