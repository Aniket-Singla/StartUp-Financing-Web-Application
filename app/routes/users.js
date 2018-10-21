var express = require('express');
const path = require('path');
var userController = require(path.join(__dirname,'../controllers/userController'));
var router = express.Router();
require('dotenv').config();
const passportConfig = require(path.join(__dirname,'../config/passport'));
/* GET users listing. */
/*router.get('/aut', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.get('/login',passportConfig.alreadyLogged,userController.loginGet);
router.post('/login',userController.loginPost,passportConfig.authenticate);
router.get('/createUser',passportConfig.alreadyLogged,userController.signupGet);
router.post('/createUser',userController.createUser);
router.get('/logout', userController.logoutUser);
router.get('/account',passportConfig.isAuthenticated,(req,res)=>{
	res.render('Accounts/'+req.user.role,{port:process.env.PORT,title:'User Home',layout:req.user.role});
});
router.get('/account/update',passportConfig.isAuthenticated,userController.updateUserGet);
router.post('/account/update',passportConfig.isAuthenticated,userController.updateUserPost);

router.get('/account/delete',passportConfig.isAuthenticated,userController.deleteAccountGet);
router.post('/account/delete',passportConfig.isAuthenticated,userController.deleteAccountPost);

// router.get('/entrepreneur',passportConfig.isAuthenticated,(req,res)=>{
// 	res.render('Accounts/entrepreneurs',{layout:'entrepreneur'});
// 		//for view with no layout {layout: false}
// });
//router.get('/user',(req,res,next)=>{res.send(req.user)})
//router.get('/startupInfo',(req,res,err)=>{res.render('startupInfo',{layout:'entrepreneur'})});



module.exports = router;
