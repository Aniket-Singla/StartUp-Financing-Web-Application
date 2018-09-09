var express = require('express');
const path = require('path');
var helper = require(path.join(__dirname,'../helpers/helperlogin'))
var router = express.Router();

/* GET users listing. */
router.get('/aut', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login',helper.loginGet);
router.post('/login',helper.authenticate,
	(req,res)=>{
		res.redirect('/');
		//redirect to dashboard which is not complete
		//redirect the user to entrepreneur page if he is a entrepreneur and vice versa
	})
router.get('/createUser',helper.signupGet);
router.post('/createUser',helper.createUser);




module.exports = router;
