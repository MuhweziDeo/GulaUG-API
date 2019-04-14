module.exports=function(error, req, res, next){
    if(error) {
        res.status(500).json({success: false,
         message: `Oops Something went wrong!! Please Contact Support`,
          error})
    }
    next();
}