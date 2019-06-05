import AdminService from "../../services/AdminService";
import  SendErrorHelpler from '../../helpers/sendErrorHelper';
import _ from 'lodash';

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
            SendErrorHelpler.sendError(res, e);
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
            SendErrorHelpler.sendError(res, e);
        }

    }
}

export default  AdminController;
