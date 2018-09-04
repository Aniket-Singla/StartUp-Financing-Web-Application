var express = require('express');
const path = require('path');
var helper = require(path.join(__dirname,'../helpers/helperlogin'))
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home');
});

router.get('/investors',(req,res)=>{
	res.render('investor',{layout:'investor_home'});
});
router.get('/entrepreneurs',(req,res)=>{
	res.render('entrepreneurs',{layout:'entrepreneur'});
		//for view with no layout {layout: false}
});
router.get('/login',(req,res)=>{
 	res.render('login');
});
router.post('/login',helper.loginUser)
router.get('/createUser',(req,res)=>{
 	res.render('signup');
});
router.post('/createUser',helper.createUser);
// router.get('/signup',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'public','signup.html'));
// });
module.exports = router;
