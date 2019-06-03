class SendErrorHelpler {
  static async sendError (res, error){
    res.status(500).send({
        success: false,
        message:'Unable to complete the request',
        info: 'Kindly contact support for assistance',
        error
    })
  }
}

module.exports.default = SendErrorHelpler;
