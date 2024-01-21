const mongoose = require('mongoose');

const connectDatabase = async() => {
    mongoose
    .connect(
        `mongodb://localhost:27017/admin`
    )
}

module.exports =connectDatabase;
