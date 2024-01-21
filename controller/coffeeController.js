const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Coffee = require('../model/Coffee');
const sendToken = require("../utlis/jwtToken");


exports.addNewCoffee = catchAsyncErrors(async(req, res, next) => {
    const {
        coffeeName,
        coffeeSize,
        coffeePrice,
        description
    } = req.body

    const coffee = await Coffee.create({
        coffeeName,
        coffeeSize,
        coffeePrice,
        description
    });
    res.json({nessage:coffee, state:"Coffee added Successfully"});
});

exports.getCoffee = catchAsyncErrors(async(req, res, next) => {
    const coffee = await Coffee.find();
    res.json({message: coffee});
});

exports.getOneCoffee = catchAsyncErrors(async(req, res, next) => {
    const coffee = await Coffee.findById(req.params.id);
    res.json({message: coffee});
});

exports.patchCoffee = catchAsyncErrors(async(req, res, next) => {
    const updateCoffee = req.body;
    await Coffee.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:updateCoffee}
    );
    res.json({state:"Book Updated Sucessfully"});
});

exports.deleteCoffee = catchAsyncErrors(async(req, res, next) => {
    const coffee = await Coffee.findByIdAndDelete(req.params.id);
    res.json({message: coffee, state:"Coffee Deleted Successfully"});
});