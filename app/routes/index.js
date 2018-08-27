var express = require('express');
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
// router.get('/login',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'public','login.html'));
// });
// router.get('/signup',(req,res)=>{
// 	res.sendFile(path.join(__dirname,'public','signup.html'));
// });
module.exports = router;
