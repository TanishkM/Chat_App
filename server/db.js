const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.REACT_APP_MONGO_URL;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Database Successfully");
    })
}

module.exports = connectToMongo;