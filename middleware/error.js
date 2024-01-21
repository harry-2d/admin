const ErrorHandler = require("../utlis/ErrorHandler");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if("DEVELOPMENT" === "DEVELOPMENT"){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack
        });
    }

    if("PRODUCTION" === "PRODUCTION"){
        let error = {...err};

        error.message = err.message;

        //wrong Mongoose ObjectID Error
        if(err.name === "castError") {
            const message = `Resource not found with id of ${err.value}. Invalid ${err.path}`;
            error = new ErrorHandler(message, 404);
        }

        //validatin Error
        if(err.name === "validationError"){
            const message = Object.values(err.errors).map((val) => val.message);
            error = new ErrorHandler(message, 400);
        }

        //Duplicate Key Error
        if(err.code === 11000) {
            const message = `Duplicate Field value: ${Object.keys(
                err.KeyValue
            )}. Please use another value`;
            error = new ErrorHandler(message, 401)
        }

        //handling JsonWebToken Error
        if(err.name === "JsonWebTokenError"){
            const message = "Token Expired. Please Login Again !!";
            error = new ErrorHandler(message, 401);
        }

        //Any Other Error
        res.status(error.statusCode).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};