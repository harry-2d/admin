const nodemailer = require("nodemailer");

// connect smtp
const resetPasswordMail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587, // `true` for port 465, `false` for all other ports
    auth: {
        //TODO: replave `user` and `pass` values
        user: 'jinaalchemycustomermessages@gmail.com', 
        pass: 'rapaddbmzldwkmot'
    },
});

module.exports = resetPasswordMail;  
