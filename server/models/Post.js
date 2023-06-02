const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }, 
    caption:{
        type:String,
    },
    image:{
        public_id:String,
        url:String
    },
    likes:[
       {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    Comments:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User'
            },
            Comment:{
                type:String,
                required:[true,"plz Enter the Comment"]
            }

        }
    ],
    CreatedAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model('Post',PostSchema);