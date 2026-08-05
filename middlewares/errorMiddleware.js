const errorMiddleware = (err, req, res, next) => {

   return  res.status(err.statusCode || 500).json({
        status : err.status || 'error', 
        message : err.message || 'something went wrong'
    })

}

module.exports = errorMiddleware