require('dotenv').config();
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import UserService from '../../services/UserService';
import ProfileService from '../../services/ProfileService';
import sendMail from '../../helpers/emailHelper';
import app from '../../app';
import ErrorHandler from '../../helpers/sendErrorHelper';
import { dataUri } from '../../helpers/multer';
import { uploader } from '../../helpers/cloudinary';
import { updateProfileValidator } from '../../helpers/userValidations/userValidator';

class UserController {
    static async signUpUser(req, res) {
        try {
            const { body } = req;
            const user = await UserService.createUser(body);
            app.emit('user_created', _.pick(user,['username']));
            res.status(201).send({
                success: true,
                data: _.pick(user, ['id', 'username', 'email','isAdmin']),
                token: null,
                message: 'An email verification link has been sent to your email'

            });
            const token = await jwt.sign({
                email: user.email,
                username: user.username,
                isAdmin:user.isAdmin,
                id:user.id
            }, process.env.SECRET, {
                expiresIn: '24hr'
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

            };

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
            const { params :{ token } } = req;
            const { email } = jwt.verify(token,process.env.SECRET);
            const { email_verified, username, id, isAdmin} = await UserService.findUserByEmail(email);
            const profile = await ProfileService.getProfile(username);

            if(email_verified){
                return res.status(400).send({
                    success:false,
                    message:'This email was already verified'
                });
            }
            await UserService.verifyUser(email);
            const accessToken = jwt.sign( { username, email, id, isAdmin }, process.env.SECRET, {
                expiresIn: '24hr'
            });

            res.status(200).send({
                success:true,
                data:profile,
                message:'Email Verification was successfully',
                accessToken
            });
        } catch (error) {
            res.status(500).send({
                success:false,
                message:'Unable to complete request',
                error
            })
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
                action:'Please check password and try again'
            });

            if(!user.email_verified || !user.active ) return res.status(400).send({
                success:false,
                message:'email not verified or the account is disabled',
                action:'Please verify your email before you login or contact administrator to activate account',
                action_url:null
            });

            const accessToken = jwt.sign( {
                isAdmin:user.isAdmin,
                 username:user.username,
                 email:user.email,
                  id:user.id,
                  active: user.active
                 },process.env.SECRET, {
                expiresIn: '24hr'
            });

            res.status(200).send({
                success:true,
                data:_.pick(user,['username','isAdmin', 'active']),
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


  } catch (error){
      ErrorHandler.sendError(res, error);
    }
  }

    static async passwordResetConfirm (req,res) {
        try {
            const { body: { password , confirmPassword } } = req
            const user =  jwt.verify(req.params.token, process.env.SECRET)
            if(password === confirmPassword){
              const userPasswordReset = await UserService.updatePassword(user.email,password)
              const accessToken = jwt.sign(_.pick(user,['username','id']),process.env.SECRET)
              return res.status(200).send({
                  success:true,
                  data: _.pick(userPasswordReset,['username','id','email']),
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

            if(fetchProfile.message) return res.status(404).send({
                message:fetchProfile.message,
                success:false
            })

            res.status(200).send({
                success:true,
                profileData:fetchProfile
            })

        } catch (error) {
            res.status(500).send({
                message:'unable to complete this request',
                error:error.message
            })
        }
    }
    static async updateProfile(req,res){
        try {
            const { error } = updateProfileValidator(req.body);
            if (error) return res.status(400).send({
                success: false,
                message: error.details[0].message
            });

            let updateObject = {};
            if(req.file) {
                const file = dataUri(req).content;
                const result = await uploader.upload(file)
                updateObject.image = result.url;
            }
            updateObject = {...updateObject, ...req.body};

            const { params: { username } } = req;

            const updatedProfile = await ProfileService.updateProfile(username,updateObject);
            res.status(200).send({
                success:true,
                message:'Profile updated successfully',
                data:updatedProfile
            });


        } catch (error) {
          res.status(500).send({
              message:'unable to complete this request',
              error:error.message
          })
        }

    }
    static async getProfiles(req,res) {
        const profiles = await ProfileService.getProfiles();
        res.status(200).send({
            success:true,
            data: profiles
        });
    }
    static async socialAuthenticationHandler(req, res){
        try {
        const { user: { username, email , id, isAdmin, active } } = req;
        if (!active) {
            return res.status(401).send({
                'message': 'Account deactivated Please contact admin',
                'success': false
            });
        }
        const { image }  = await ProfileService.getProfile(username);
        const token = jwt.sign({ username,email,id, isAdmin },process.env.SECRET)
        res.status(200).send({
            success:true,
            username,
            id,
            isAdmin,
            token,
            image
        })

        } catch (error) {
          res.status(500).send({
              message: 'unable to complete this request',
              error: error.message
          })
        }
    }
    static async getLoggedInUser(req,res) {
        try {
            const fetchProfile = await ProfileService.getProfile(req.user.username);
            res.status(200).send({
                data: fetchProfile,
                success: true
            })
        }catch (e) {
            res.status(500).send({
                error: e,
                message:'Something Went wrong'
            })
        }
    }
}

export default UserController;
