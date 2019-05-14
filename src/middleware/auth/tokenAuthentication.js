require('dotenv').config
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {

const { headers : { authorization } } = req; 

try {
    if(!authorization) return res.status(401).send({
        success:false,
        message:'Missing Authorization header',
        action:'Please pass in Authorization header'
    })
    req.user = jwt.verify(authorization,process.env.SECRET);
    next();
    
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        error:error,
        success:false,
    })
}}
