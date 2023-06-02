const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Your Name "]
    },
    email:{
        type:String,
        required:[true,"Enter Your Email "]
    },
     password:{
        type:String,
    required:[true,"Enter Your Password"],
        minLength:[8,"Password should contain min 8 charachter"],
        select:false
    },
      Posts:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Post'   
        }    
      ],
       followers:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'   
        }    
      ],
        following:[
        {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'   
        }    
      ],
      avatar:{
        public_id:String,
        url:String
      },

      passresetToken:String,
      passresetTokenExpired:Date,
});


UserSchema.pre("save",async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
})

UserSchema.methods.matchpass =async function(password){
  return await bcrypt.compare(password,this.password);
}
UserSchema.methods.resetkrpass = function(msg){
    const resetToken = crypto.randomBytes(20).toString("hex");
  this.passresetToken= crypto.createHash("sha256").update(resetToken).toString("hex");
  this.passresetTokenExpired=Date.now()+ 10 *60 *1000;
  return resetToken;
};


UserSchema.methods.gentoken =function(){
  return jwt.sign({_id:this._id},process.env.SEC)
};




module.exports = mongoose.model('User',UserSchema);