const express = require('express');
const app = express();
const userRouter = require('./router/userRouter'); 
const errMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const coffeeRouter = require('./router/coffeeRouter');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/", userRouter);
app.use("/", coffeeRouter);
app.use(errMiddleware);
module.exports = app;