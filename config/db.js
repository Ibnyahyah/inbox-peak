const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB connected");
}


module.exports = connectDB;