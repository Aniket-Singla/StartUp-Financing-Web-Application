var express = require('express');
const path = require('path');
var userController = require(path.join(__dirname,'../controllers/userController'));
var router = express.Router();

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
//router.get('/startupInfo',(req,res,err)=>{res.render('startupInfo',{layout:'entrepreneur'})});



module.exports = router;
