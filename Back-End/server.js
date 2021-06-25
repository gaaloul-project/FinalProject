  
const express = require('express')
const mongoose=require('mongoose')
require('dotenv').config({path:'config/.env'})
const app= express();
const connectDB = require ("./Helper/connectDB");


app.use(express.json({extended: false}));

connectDB();
 app.use('/register', require('./routes/Register'));
 app.use('/login', require('./routes/Login'));
 app.use('/feedback', require('./routes/FeedBack'))


app.listen(5000,()=>{
    console.log('server connected')
});