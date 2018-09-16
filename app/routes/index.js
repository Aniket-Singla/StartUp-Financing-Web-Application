var express = require('express');
const path = require('path');

var router = express.Router();
var helper = require(path.join(__dirname,'../helpers/helperlogin'))
/* GET home page. */
router.get('/', function(req, res) {
  res.render('home',{ port:3000,title: 'Home', css: ['main.css'] });
});

router.get('/investors',helper.ensureAuthenticated,(req,res)=>{
	res.render('investor',{layout:'investor_home'});
});
router.get('/entrepreneurs',helper.ensureAuthenticated,(req,res)=>{
	res.render('entrepreneurs',{layout:'entrepreneur'});
		//for view with no layout {layout: false}
});

// router.get('/signup',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'public','signup.html'));
// });

module.exports = router;
