const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    coffeeName:{
        type: String,
        unique: true,
        required: true
    },
    coffeeSize:{
        type: String,
        enum: ['Small', 'Medium', 'Large'],
        default: 'Medium',
        required: true
    },
    coffeePrice:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        minLength:0,
        maxLength:100
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Coffee", coffeeSchema);