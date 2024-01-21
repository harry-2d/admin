const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const resetPasswordMail = require("../utlis/resetPasswordMail");


//send reset password mail
exports.sendResetpasswordMail = catchAsyncErrors( async(name, email, token) => {
    const info = await resetPasswordMail.sendMail({
        from: "jinaalchemycustomermessages@gmail.com",
        to: "uchiha3493@gmail.com",
        subject: "From customer ",
        html: `
        link:http://127.0.0.1:4000/resetPassword?token='${token}'
        `
    });
});
