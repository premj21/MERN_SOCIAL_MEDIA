const User = require('../models/User.js');
const Post = require('../models/Post.js');
const { sendmail } = require('../middlewares/Sendmail.js');
const crypto = require('crypto')
const cloudinary = require("cloudinary");


const allUser =async(req,res)=>{
    try {
        const user =await User.find({});
        res.json({user:user});
    } catch (error) {
        console.log(error);
    }
}
const register = async(req,res)=>{
    try {
       const mycloud = await cloudinary.v2.uploader.upload(req.body.image, {
         folder: "post",
       });

  const {name, email,password} = req.body; 
   let user = await User.findOne({email});
   if(user){
    return res.status(400).json({success:false,message:"User Already Exist"});
   }
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  await user.save();
 const token = user.gentoken();
 res.status(201).cookie('token',token,  {expires:new Date(Date.now()+90*24*60*60*1000),}).json({success:true,message:"Registered Successfully",user:user,token:token});
    } catch (error) {
       
        res.status(501).json({success:false,message:error});
    } 
}
const login = async(req,res)=>{
    try {
       const {email,password} = req.body
     let user = await User.findOne({email}).select("+password");
     if(!user) return res.status(401).json({success:false,message:"User Not Found"});
     let pasmatch = await user.matchpass(password);
     if(!pasmatch) return res.status(401).json({success:false,message:"Inalid Credential"});
     const token = user.gentoken();
     res.status(200).cookie('token',token).json({success:true,message:"Login Succesfull",user:user})
   } catch (error) {
        res.status(501).json({success:false,message:error});
   }
} 
const followUser= async(req,res)=>{
    try {
     const user = await User.findById(req.params.id);
     const luser =await User.findById(req.user._id);
     if(!user) {
         return res.status(401).json({message:"User Not Found"});
        }
 if(req.user._id.toString() === req.params.id.toString()) return res.status(401).json({message:"YOu cant follow yourself"});
  if(luser.following.includes(req.params.id)){
    const id = user.followers.indexOf(req.user._id);
    const di = luser.following.indexOf(req.params.id);
    user.followers.splice(id,1);
    luser.following.splice(di,1);
    await user.save();
    await luser.save();
 return    res.status(200).json({success:true,message:"Unfollow successfull"})
  }
  else{
      user.followers.push(req.user._id);
      luser.following.push(req.params.id);
      await user.save();
      await  luser.save();
      res.status(200).json({success:true,message:"follow successfull"})
    }
    } catch (error) {
    res.status(500).json({success:false,message:error.message})    
    }
}

const logout =(req,res)=>{
    try {
        res.status(200).cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
        .json({
            message:"Logout Successfully",
        })
        
    } catch (error) {
    res.status(500).json({success:false,message:error.message})    
        
    }
  }



  const getMyPosts = async (req, res) => {
      try {
        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.Posts.length; i++) {
          const post = await Post.findById(user.Posts[i]).populate(
            "likes Comments.user owner"
          );
          posts.push(post);
        }
        res.status(200).json({
          success: true,
          post: posts.reverse(),
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };



const Passwordchange =async(req,res)=>{
    try {
        let user = await User.findById(req.user._id).select("+password");
    const {oldpassword,newpassword} = req.body
    const ismatch =await user.matchpass(oldpassword);
    if(!ismatch){
        return res.status(401).json({
            success:false,
            message:"Old password Not Matched"
        })
    }

    user.password = newpassword; 
    await user.save();
    res.status(200).json({
        success:true,
        message:"Password changed Successfully"
    })

    } catch (error) {
    res.status(500).json({success:false,message:error.message})    
        
    }
}
const updateprofile = async(req,res) =>{
  try {
     let user = await User.findById(req.user._id);
     if(req.body.name) user.name = req.body.name; 
     if(req.body.email) user.email = req.body.email;
     if(req.body.avatar){
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "post",
      });

      user.avatar.public_id = mycloud.public_id
      user.avatar.url = mycloud.secure_url     
     }
     await  user.save();
     res.status(200).json({
        success:true,
        message:"Profile Updated "
     })
    
  } catch (error) {
    res.status(500).json({success:false,message:error.message})    
    
  }
}
const deleteaccount = async(req,res)=>{
   try {
    const  user =await User.findById(req.user._id);
    for(let i = 0; i<user.following.length;i++){
        const newusers = await User.findById(user.following[i]);
        const ind = await newusers.followers.indexOf(req.user._id);
       await  newusers.followers.splice(ind,1);
        await newusers.save();
    }
    for(let i = 0 ;i<user.followers.length;i++){
        const luser = await User.findById(user.followers[i]);
        const ind = luser.following.indexOf(req.user._id);
       await luser.following.splice(ind,1);
        await luser.save();
    }
    
    for(let i = 0; i<user.Posts.length; i++){
        const post =await Post.findById(user.Posts[i]);
        await post.deleteOne();
    }
    
    res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
   await user.deleteOne();
   res.status(200).json({
    message:"User Deleted"
   })
   } catch (error) {
    res.status(500).json({success:false,message:error.message})    
   }
}


const myprofile = async(req,res)=>{
    try {
       const user =await User.findById(req.user._id).populate('Posts following followers');
       res.status(200).json({
        user
       })
    } catch (error) {
    res.status(500).json({success:false,message:error.message})          
    }
}


const getuserprofile = async(req,res)=>{
    try {
       const user = await User.findById(req.params.id).populate([
         {
           path: "Posts",
           populate: { path: "Comments",populate:{path:"user"}},
         },
         {
           path: "Posts",
           populate: { path: "likes" },
         },
         {
           path: "following",
         },
         {
           path: "followers",
         },
       ]);

    

      

    

      
       if(!user) return res.status(401).json({
        success:false,
        message:"user not found"
       })
       res.status(200).json({
        message:"User",
        user
       })
    } catch (error) {
    res.status(500).json({success:false,message:error.message})          
    }
}

const getallUser = async (req, res,) => {

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await await User.find(keyword);
  res.status(201).json({success:true,user});
};



const forgetpassword = async(req,res)=>{
    try {
    const {email} = req.body
    let user = await User.findOne({email});
    if(!user) return res.status(401).json({success:false,message:"User not found"});
    const passresetToken = await user.resetkrpass(); 
  await user.save();
  const reseturl = `${req.protocol}://${req.get("host")}/api/password/reset/${passresetToken}`;
const meesage = `reset your password with this link ${reseturl}`;
   try {
    await sendmail({email:user.email,subject:"Reset password",meesage});
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email}`
    });
    
   } catch (error) {
    user.passresetToken=undefined;
    user.passresetTokenExpired= undefined;
    await user.save();
  
    res.status(500).json({success:false,message:error.message})          
   }
    
  } catch (error) {
    res.status(500).json({success:false,message:error.message})          
  }
  
}

const resetpass = async(req,res)=>{
    try {
        const resetpass = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        passresetToken,
        passresetTokenExpired:{$gt:Date.now()}
    });

    if(!user) return res.status(401).json({
        success:false,
        message:"Reset Token has been expired"
    });
    
    user.password = req.body.password;
    user.passresetToken=undefined;
    user.passresetTokenExpired= undefined;
    await user.save();

    res.json({
        success:true,
        message:"Password successfully change"
    })

        
    } catch (error) {
    res.status(500).json({success:false,message:error.message})          
        
    }
}
module.exports = {
  register,
  allUser,
  login,
  followUser,
  logout,
  Passwordchange,
  updateprofile,
  deleteaccount,
  myprofile,
  getuserprofile,
  getallUser,
  forgetpassword,
  resetpass,
  getMyPosts
};