require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/userService');
const sendMail = require('../../helpers/emailHelper');


class UserController {
    static async signUpUser(req, res) {
        try {
            const { body } = req

            const user = await UserService.createUser(body);
           
            res.status(201).send({
                success: true,
                data: _.pick(user, ['id', 'username', 'email']),
                token: null,
                message: 'An email verification link has been sent to your email'

            });
            const token = await jwt.sign({
                email: user.email,
                username: user.username
            }, process.env.SECRET, {
                expiresIn: 60 * 60
            });

            const mailOptions = {
                to: user.email,
                from: process.env.USER_EMAIL,
                subject: 'Email Verification',
                html: `
            Hey ${user.username} thanks for signing up Please
            Click the link to activate email
            <p>Click <a href="${process.env.ACTIVATION_URL}/auth/verify/${token}/">Here</a></p>
            `

            }
            sendMail(mailOptions);

        } catch (error) {
            res.status(500).send('Unable to complete request')
        }
    }

    static async verifyUser(req,res){
        try {
            const decoded = jwt.decode(req.params.token)
        
            const user = await UserService.findUserByEmail(decoded.email);
        
            if(user.email_verified){
                return res.status(400).send({
                    success:false,
                    message:'This email was already verified'
                });
            }
            const verify = await user.update({
                email_verified:true,
                verified_on:new Date()
            })
            const accessToken = jwt.sign( { username:user.username, email:user.email },process.env.SECRET)
        
            res.status(200).send({
                success:true,
                data:verify,
                message:'Email Verification was successfully',
                accessToken
            });
        } catch (error) {
            res.status(500).send('unable to complete this request')
        }
       
    }
    static async loginUser(req,res){
        try {
            const { body: { email, password } } = req;

            const user = await UserService.findUserByEmail(email);
            if(!user) return res.status(400).send({
                success:false,
               message:'User with that email not found'
            });

            const verifyPassword = await UserService.verifyPassword(email,password);
            if(!verifyPassword) return res.status(400).send({
                success:false,
                message:'Invalid password',
                action:'Please input the right password'
            })

            if(!user.email_verified) return res.status(400).send({
                success:false,
                message:'email not verified',
                action:'Please verify your email before you login',
                action_url:null
            })

            const accessToken = jwt.sign( { username:user.username, email:user.email },process.env.SECRET)

            res.status(200).send({
                success:true,
                data:_.pick(user,['username']),
                accessToken

            });

        } catch (error) {
            res.status(500).send({
                message:'unable to complete this request',
                error:error.message
            })
        }
    }
}

module.exports = UserController;