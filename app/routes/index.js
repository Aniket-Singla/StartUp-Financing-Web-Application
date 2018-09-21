var express = require('express');
const path = require('path');

var router = express.Router();
var helper = require(path.join(__dirname,'../helpers/helperlogin'))
const passportConfig = require(path.join(__dirname,'../config/passport'));
/* GET home page. */
router.get('/', function(req, res) {
  res.render('home',{ port:3000,title: 'Home', css: ['main.css'] });
});

router.get('/investors',passportConfig.isAuthenticated,(req,res)=>{
	res.render('investor',{layout:'investor_home'});
});
router.get('/entrepreneurs',passportConfig.isAuthenticated,(req,res)=>{
	res.render('entrepreneurs',{layout:'entrepreneur'});
		//for view with no layout {layout: false}
});

module.exports = router;
