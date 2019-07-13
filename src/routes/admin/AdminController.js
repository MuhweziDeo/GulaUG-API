require('dotenv').config();
import AdminService from "../../services/AdminService";
import  SendErrorHelper from '../../helpers/sendErrorHelper';
import _ from 'lodash';
import SendMailHelper from "../../helpers/EmailHelperClass";
import JwtHelper from '../../helpers/JwtHelper';

class AdminController {

    static async viewAllUsers(req, res){
        try{
            const users = await AdminService.getAllUsers(req.query);

            res.status(200).send({
                data: users,
                success: true,
                message: 'fetching users success'
            });

        }catch (e) {
            await SendErrorHelper.sendError(res, e);
        }
    };

    static async activateDeactivateUser(req, res) {
        try {
            const { userId , activateStatus } = req.body;
            const user = await AdminService.deactivateOrActivateUser(userId, activateStatus);

            if(user[0] === 0) return res.status(404).send({
                success: false,
                message: 'user doesnt exist',

            });

            const message = activateStatus ? 'Account activated successfully' :
                'Account deactivated successfully';

            res.status(200).send({
                data: _.pick(user[1][0], ['username', 'email', 'createdAt','updatedAt', 'isAdmin','id']),
                success: true,
                message
            });
        }catch (e) {
            await SendErrorHelper.sendError(res, e);
        }

    }

    static async addAdminUser(req,res) {
        try {
            const {body: { email } } = req;
            await AdminService.createAdminUser(email);
            const token = await JwtHelper.generateToken({ email },{ expiresIn: '24hr' } )
            const mailOptions = {
                to: email,
                from: process.env.USER_EMAIL,
                subject: 'Admin Access',
                html: `
                Hey ${email} 
                Please click on the Link to setup Admin Account
                <p>Click <a href="${process.env.ACTIVATION_URL}/admin/verify/${token}/confirm">Here</a></p>
               `};
            await SendMailHelper.sendEmail(mailOptions);
            return res.status(200).send({
                success: true,
                message: 'Admin created successfully awaiting confirmation'
            });

        } catch (error) {
            await SendErrorHelper.sendError(res,error);
        }
    }

    static async verifyAdminUser(req, res) {
        try {
            const { body: { password, username,
                confirmPassword }, params: { token } } = req;

            if (password !== confirmPassword) {
                res.status(400).send({
                    success: false,
                    message: 'Password and confirmation must match'
                });
            }
            const { email } = await JwtHelper.getPayloadData(token);
            const adminObject = { username, password };
            const newAdmin = await AdminService.verifyAdminUser(email, adminObject);
            if (newAdmin[0] === 0) return res.status(404).send({
                success: false,
                message: 'User with email doesnot exist'
            });
            const payload = _.pick(newAdmin[1][0],['username', 'email',
            'createdAt','updatedAt', 'isAdmin','id']);
            const access_token = await JwtHelper.generateToken({ payload });

            res.status(201).send({
                success: true,
                message: 'Account verified successfully',
                access_token,
                isAdmin: newAdmin[1][0].isAdmin,
                username:newAdmin[1][0].username,
            })
        } catch (error) {
            await SendErrorHelper.sendError(res, error);
        }
    }
}

export default  AdminController;
