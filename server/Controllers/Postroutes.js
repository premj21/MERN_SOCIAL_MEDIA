
const Post = require('../models/Post');
const User = require('../models/User');

const cloudinary  = require('cloudinary');

const  postupload =async (req,res) =>{
    try {
      const mycloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "post",
      });
        const {caption} = req.body;
        const post = await Post.create({
            caption,
            image:{
                public_id:mycloud.public_id,
                url:mycloud.secure_url
            },
          owner:req.user._id
        });
        const user = await User.findById(req.user._id);
        user.Posts.push(post._id);
await user.save();
    res.status(201).json({success:true,post:post});
    } catch (error) {

        res.status(500).json({success:false,message:error.message})
    }
} 
const likepost = async (req,res)=>{
   try {

    const post =await Post.findById(req.params.id);

    if(!post) return res.status(404).json({success:false,message:"Post Not Found"})
    if(post.likes.includes(req.user._id)){
        const ind = post.likes.indexOf(req.user._id);
        post.likes.splice(ind,1);
        await post.save();
        res.status(200).json({
            success:true,
            message:"Post Unliked" }) }
    else 
    {
  post.likes.push(req.user._id);
        await post.save();
          res.status(200).json({
            success:true,
            message:"Post Liked"
        })
    }


   } catch (error) {
     res.status(500).json({success:false,message:error.message})
   }
}

const deletepost = async(req,res) =>{  
    try {
         console.log(req.params.id);
    const post =await Post.findById(req.params.id); 
    if(!post) return res.status(404).json({success:false,message:"Post not Found"});

    if(post.owner.toString() !==    req.user._id.toString()){
        return res.status(401).json({success:false,message:"Unuthorized"});
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);
    await post.deleteOne();
    const user = await User.findById(req.user._id);
   const ind = user.Posts.indexOf(req.params.id);
  await  user.Posts.splice(ind,1);
  await user.save();
   res.status(200).json({success:true,message:"Post Deleted"});
} catch (error) {
    res.status(500).json({success:false,message:error.message})    
}
}


const followingPost = async(req,res)=>{
    try {
        const user =await User.findById(req.user._id)
        const posts = await Post.find({
          owner: {
            $in: user.following,
          },
        }).populate("owner likes Comments.user");
        res.status(200).json({
            success:true,
            post:posts.reverse()
        })
    } catch (error) {
    res.status(500).json({success:false,message:error.message})    
    }
}
const updatecaption = async(req,res)=>{
    try {
     let post = await Post.findById(req.params.id);
     if(post.owner.toString()!==req.user._id.toString()){
        return res.status(401).json({
            message:"U cant Update This Post"
        })
     }
     const {caption}  = req.body
      if(!post) return res.status(401).json({
        success:true,
        message:"Post Not FOund"
     })
     if(caption) post.caption = caption;
    await post.save();
    res.status(200).json({
        success:true,
        message:"POst Updated "
    });

    } catch (error) {
    res.status(500).json({success:false,message:error.message})     
    }
}

const updatecomment  = async(req,res)=>{
  try {
    const {comment} = req.body; 
    let post =await Post.findById(req.params.id);
    if(!post) return res.status(401).json({
        success:false,
        message:"Post Not FOund"
    });
    let commentindex = -1; 
    post.Comments.forEach((item,index)=>{
         if(item.user.toString()=== req.user._id.toString()) return commentindex=index
    });

    if(commentindex !== -1){
       post.Comments[commentindex].Comment = comment ;
       await post.save();
       res.status(200).json({
         success:true,
         message:"COmment Updated"
       });
    }
    else{
        post.Comments.push({
            user:req.user._id,
            Comment:comment
        });
        await post.save();
        res.status(200).json({
            success:true,
            message:"COmment added"
          });
    }
  } catch (error) {
    res.status(500).json({success:false,message:error.message})    
  }
}


const commentdelete = async(req,res)=>{
    try {
      let post = await Post.findById(req.params.id);
      if(!post) return res.status(401).json({
        success:false,
        message:"Post Not FOund"
    });

    if(post.owner.toString() === req.user._id.toString()) {
      const {id} = req.body
       console.log(id)
        if(req.body.id===undefined){
           return res.status(401).json({
                success:false,
                message:"Comment Id required"
            });
        }

        post.Comments.forEach((item,index)=>{
            if(item._id.toString()=== req.body.id.toString()) return post.Comments.splice(index,1);
       });
       await post.save();
       res.status(200).json({
        success:true,
        message:"COmment Deleted"
      });
    }
    else{
        post.Comments.forEach((item,index)=>{
            if(item.user.toString()=== req.user._id.toString()) return post.Comments.splice(index,1);
       });
       await post.save();
       res.status(200).json({
         success: true,
         message: "COmment Deleted",
       });
    }
    } catch (error) {
    res.status(500).json({success:false,message:error.message})    
    }
}


module.exports = {postupload,likepost,deletepost,followingPost,updatecaption,updatecomment,commentdelete};