const express = require('express');
const cors = require('cors');
const dbconnect = require('./config/dbconnect');
require('dotenv').config({path:'./config/config.env'});
const cookieparser = require('cookie-parser')
const User = require('./routes/User');
const Post = require('./routes/Post');
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
dbconnect();
app.use(cookieparser());
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:"50mb",extended:true}));

app.use('/api/auth',User);
app.use('/api/post',Post);

app.listen(process.env.PRT,()=>{
    console.log(`surver is running on port ${process.env.PRT}`);
})