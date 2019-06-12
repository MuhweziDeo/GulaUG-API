require('dotenv').config();
import nodemailer from 'nodemailer';

class SendMailHelper {
    static transporter () {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASS
            }
        });
    }

    static async sendEmail(mailOptions) {
        return SendMailHelper.transporter().sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}

export default SendMailHelper;