const express = require('express');
const { postupload , likepost ,deletepost, followingPost,updatecaption,updatecomment, commentdelete} = require('../Controllers/Postroutes');
const authentication = require('../middlewares/authentication.js');
const router = express.Router();

router.route('/upload').post(authentication,postupload)
router.route('/:id').get(authentication,likepost).delete(authentication,deletepost);
router.route('/posts/allposts').get(authentication,followingPost);
router.route('/update/caption/:id').put(authentication,updatecaption);
router.route('/comment/:id').put(authentication,updatecomment).delete(authentication,commentdelete);

module.exports = router; 
