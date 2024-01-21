const User = require("../model/User");
const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utlis/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");



//check if user is authenticated or not
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler("You are not logged in", 401));
    }

    const decode = jwt.verify(token, "@Rabbit");
    req.user = await User.findById(decode.id);

    next();
});

//handling User Roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler("You are not authorized to perform this action", 403)
            );
        }
        next();
    };
}