const { updateProfileValidator } = require('../../../helpers/userValidations/userValidator')
module.exports = function(req,res,next){
const { file, body ,user:{ username }} = req;

if(Object.keys(body).length === 0 && !file){
    return res.status(400).send({
        success:false,
        message:'Please Provide atleast one value to update'
    })
}
const { error, value } = updateProfileValidator(body)
if (error) return res.status(400).send({
    success: false,
    message: error.details[0].message
});

if(username === req.params.username) {
req.body = value;
return next()
};

return res.status(403).send({
    success:false,
    message:'Access Denied, You are not owner'
});

}
