
const User = require('../models/User.js');
const jwt =require('jsonwebtoken')

const authentication  = async(req,res,next) =>{

  try {
     const {token} = req.cookies;
  
  if(!token){
     return res.status(401).json({message:"Plz Login First"});
  } 
  const  ab = await jwt.verify(token,process.env.SEC);
  req.user = await User.findById(ab._id);
  next();
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
 
}

module.exports = authentication;