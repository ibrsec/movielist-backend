

const errorHandler = (err,req,res,next)=> {
    const statusCode = err.statusCode || (res.statusCode === 200 ? null : res.statusCode ) || 500;
    res.status(statusCode).json({
        error:false,
        message:err.message,

    })
}


module.exports = errorHandler;