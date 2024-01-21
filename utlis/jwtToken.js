//create and send token and save it to cookie
const sendToken = (user, statusCode, message, res) => {
    //creating jwt tokem
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + 4 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token,).json({
        success: true,
        token: token,
        user: user,
        message: message
    })
};

module.exports = sendToken;