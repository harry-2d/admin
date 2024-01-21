const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userFullName:{
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: ''
    }
 },
 {timestamps:true}
);

//Encrypting the password before saving it into database
userSchema.pre("save", async function(next) {
    if(!this.isModified("userPassword")){
        next();
    }
    this.userPassword = await bcrypt.hashSync(this.userPassword, 14);
});

//comparing the passwords
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.userPassword);
}

//Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, "@Rabbit",
    {expiresIn: "4d"})
};

module.exports = mongoose.model("User", userSchema);