require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/userService');
const ProfileService = require('../../services/profileService');
const sendMail = require('../../helpers/emailHelper');
const app = require('../../app');

class UserController {
    static async signUpUser(req, res) {
        try {
            const { body } = req

            const user = await UserService.createUser(body);
            
            app.emit('user_created', _.pick(user,['username']))
            res.status(201).send({
                success: true,
                data: _.pick(user, ['id', 'username', 'email']),
                token: null,
                message: 'An email verification link has been sent to your email'

            });
            const token = await jwt.sign({
                email: user.email,
                username: user.username,
                id:user.id
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
            res.status(500).send({
               message:'Unable to complete request',
               error:error
            }
            )
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
            const accessToken = jwt.sign( { username:user.username, email:user.email, id:user.id },process.env.SECRET)
        
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

            const accessToken = jwt.sign( { username:user.username, email:user.email, id:user.id },process.env.SECRET)

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

    static async requestPasswordReset(req,res){
    try {
        const { email , username , id } = req.user
       const token = await jwt.sign({
        email,
        username,
        id,
    }, process.env.SECRET, {
        expiresIn: 60 * 60
    });

    const mailOptions = {
        to: email,
        from: process.env.USER_EMAIL,
        subject: 'Email Verification',
        html: `
    Hey ${username} password reset link was sent to your email
    Click the link to reset password
    <p>Click <a href="${process.env.ACTIVATION_URL}/auth/password-reset/${token}/confirm/">Here</a></p>
    if you didnot request a password reset, Please ignore this message...
    `

    }
    sendMail(mailOptions);
    res.status(200).send({
        success:true,
        message:'Thank You A password reset link was sent to your email'
    })


    } catch (error) {
        console.log(error);
        throw new Error('Unable to complete your password reset request');
    }
    }

    static async passwordResetConfirm (req,res) {
        try {
            const { body: { password , confirmPassword } } = req
            const user =  jwt.verify(req.params.token, process.env.SECRET)
            if(password === confirmPassword){
              const userPassworReset = await UserService.updatePassword(user.email,password)
              const accessToken = jwt.sign(_.pick(user,['username','id']),process.env.SECRET)
              return res.status(200).send({
                  success:true,
                  data: _.pick(userPassworReset,['username','id','email']),
                  message:'password reset successfully',
                  accessToken

              })
            }
           return res.status(400).send({
                success:false,
                message:'passwords must match'
            })
           
        } catch (error) {
           
            res.status(500).send({
                success:false,
                error:error.message,
                name:error.name,
                message:'Please check the link and try again'
            })
        }
        
    }
    static async getProfile (req,res) {
        try {
            const { params : { username } } = req;
            const fetchProfile = await ProfileService.getProfile(username);

            if(!fetchProfile) return res.status(404).send({
                message:'404 profile not found',
                success:false
            })

            res.status(200).send({
                success:true,
                profileData:fetchProfile
            })

        } catch (error) {
            console.log(error)
            throw new Error({
                message:"unable to fetch profile",
                error:error
            });
        }
    }
    static async updateProfile(req,res){
        const { params: { username }, body } = req;
        
        const updatedProfile = await ProfileService.updateProfile(username,body)

        res.status(200).send({
            success:true,
            message:'Profile updated successfully',
            data:updatedProfile
        });
    }
    static async getProfiles(req,res) {
        const profiles = await ProfileService.getProfiles();
        res.status(200).send({
            success:true,
            profiles
        });
    }
}

module.exports = UserController;