const express = require('express');
const { register,allUser,login, followUser,forgetpassword,resetpass,getMyPosts, logout,Passwordchange, updateprofile ,deleteaccount, myprofile, getuserprofile, getallUser} = require('../Controllers/Userroutes');
const authentication = require('../middlewares/authentication');

const router = express.Router();


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/alluser').get(allUser);
router.route('/follow/:id').get(authentication,followUser);


router.route('/logout').get(logout);
router.route('/update/password').put(authentication,Passwordchange);
router.route('/update/profile').put(authentication,updateprofile);
router.route('/delete/me').delete(authentication,deleteaccount);
router.route('/me').get(authentication,myprofile);
router.route("/my/posts").get(authentication, getMyPosts);

router.route('/user/profile/:id').get(authentication,getuserprofile);
router.route('/users').get(authentication,getallUser);
router.route('/user/resetpassword').post(authentication,forgetpassword);
router.route('/password/reset/:token').put(authentication,resetpass)

module.exports= router; 

