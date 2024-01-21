const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const { addNewCoffee, getCoffee, getOneCoffee, patchCoffee, deleteCoffee } = require('../controller/coffeeController');
const router = express.Router();

router.route("/addNewCoffee")
.post(
    isAuthenticated,
    addNewCoffee
)

router.route("/getCoffee")
.get(
    isAuthenticated,
    getCoffee
)

router.route("/getOneCoffee/:id")
.get(
    isAuthenticated,
    getOneCoffee
)

router.route("/patchCoffee/:id")
.patch(
    isAuthenticated,
    patchCoffee
)

router.route("/deleteCoffee/:id")
.delete(
    isAuthenticated,
    deleteCoffee
)


module.exports = router;