const express = require('express');
const { userRegister, userLogin, getUser, logout, changeUserPasword, forgetPassword, resetPassword } = require('../controller/userController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route('/userRegister')
.post(
    userRegister
)
router.route('/userLogin')
.post(
    userLogin
)
router.route('/getUser')
.get(
    isAuthenticated,
    getUser
)
router.route('/logout')
.get(
    isAuthenticated,
    logout
)

router.route('/updatePassword')
.patch(
    isAuthenticated,
    changeUserPasword
)

router.route('/forgetPassword')
.post(
    forgetPassword
)

router.route('/resetPassword')
.patch(
    resetPassword
)




module.exports = router;