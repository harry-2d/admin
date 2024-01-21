const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const ErrorHandler = require("../utlis/ErrorHandler");
const sendToken = require("../utlis/jwtToken");
const randomstring = require("randomstring");
const {sendResetpasswordMail} = require("./sendResetPasswordmailController");
const bcrypt = require("bcrypt");
const saltRounds = 14;



//Register a new Admin => /api/userAdmin
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        userFullName,
        userEmail,
        userPassword,
        userConfirmPassword
    } = req.body;

    const user = await User.create({
        userFullName,
        userEmail,
        userPassword,
        userConfirmPassword
    });

    sendToken(user, 200, "User Registered Successfully", res);
});

//login User => /api/userLogin
exports.userLogin = catchAsyncErrors(async(req, res, next) => {
    const {userEmail, userPassword} = req.body;

    //check if Email and Password  is Entered by user
    if(!userEmail || !userPassword){
        return next (new ErrorHandler("please enter email and password", 400));
    }

    //Finding User in the Database
    const user = await User.findOne({ userEmail: userEmail}).select("+userPassword");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    //checking if Password is correct
    const isPasswordMatch = await user.comparePassword(userPassword);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Password", 401));
    }

    sendToken(user, 200, "User Logged in successfullt", res);
});

//Gives Admin Profile
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log(user);

    res.status(200).json({
        success: true,
        user:user
    });
});

//logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status: "Sucess",
        message: "User Logged out Successfully"
    })
})

//update/change Password => /api/ChangeUserPassword
exports.changeUserPasword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+userPassword");

    //check if old password is correct
    if(!(await user.comparePassword(req.body.oldUserPassword))){
        return next(new ErrorHandler("old Password is incorrect", 400));
    }

    //check if new passowrd{password and confirm password matches} is correct
    if(req.body.newUserPassword !== req.body.userConfirmPassword){
        return next(new ErrorHandler("password do not match", 400));
    }

    //set new password
    user.userPassword = req.body.newUserPassword;
    await user.save();
    
    sendToken(user, 200, "password Updated Successfully", res);
});


//forget password
exports.forgetPassword = catchAsyncErrors( async(req, res, next) => {
    const userEmail = req.body.userEmail;
    const userData = await User.findOne({userEmail: userEmail});

    if(!userData){
        return next(new ErrorHandler("User Doesn't Exist"));
    }

    const randomString = randomstring.generate();
    await User.updateOne({userEmail: userEmail}, {$set:{token:randomString}});
    sendResetpasswordMail(userData.userFullName, userData.userEmail, randomString);

    res.status(200).json({
        success: true,
        message: "Reset Link has been sent to your Email",
    });
});

//reset-pasword using reset link
exports.resetPassword = catchAsyncErrors (async( req, res, next) => {
    const token = req.query.token;
    const tokenData = await User.findOne({token: token});
    
    //checking if token has a null value
    if(!token){
        return next(new ErrorHandler("Invalid Reset Link"));
    }
    
    //checking if reset link has already been used or not
    if(tokenData === null){
        return next(new ErrorHandler("Reset Link has been Expired"));  
    }

    const userPassword = req.body.userPassword;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newUserPassword = bcrypt.hashSync(userPassword, salt);

    const userData =await User.findByIdAndUpdate({_id:tokenData._id},{$set:{userPassword: newUserPassword, token:''}},{new: true});

    res.status(200).json({
        success: true,
        message: "Password Reset Successfully",
        data: userData
    });
});