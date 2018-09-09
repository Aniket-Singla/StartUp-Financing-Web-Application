var express = require('express');
const path = require('path');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home',{ title: 'Home', css: ['main.css'] });
});

router.get('/investors',(req,res)=>{
	res.render('investor',{layout:'investor_home'});
});
router.get('/entrepreneurs',(req,res)=>{
	res.render('entrepreneurs',{layout:'entrepreneur'});
		//for view with no layout {layout: false}
});

// router.get('/signup',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'public','signup.html'));
// });

module.exports = router;
