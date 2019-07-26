module.exports = (error, req, res, next) => {
    if(error) {
        const message = error.message;
        return res.status(500).json({success: false,
         message: `Oops Something went wrong!! Please Contact Support`,
          error: message })
    }
    next();
};
