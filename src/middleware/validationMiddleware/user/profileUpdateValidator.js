import { updateProfileValidator } from '../../../helpers/userValidations/userValidator';

export default function(req,res,next){
const { body ,user:{ username }} = req;

if(Object.keys(body).length === 0 ){
    return res.status(400).send({
        success:false,
        message:'Please Provide atleast one value to update'
    })
}
const { error } = updateProfileValidator(body)
if (error) return res.status(400).send({
    success: false,
    message: error.details[0].message
});

if(username === req.params.username) return next();

return res.status(403).send({
    success:false,
    message:'Access Denied, You are not owner'
});

};
