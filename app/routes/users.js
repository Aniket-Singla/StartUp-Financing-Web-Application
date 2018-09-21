var express = require('express');
const path = require('path');
var helper = require(path.join(__dirname,'../helpers/helperlogin'));
var router = express.Router();

const passportConfig = require(path.join(__dirname,'../config/passport'));
/* GET users listing. */
/*router.get('/aut', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.get('/login',passportConfig.alreadyLogged,helper.loginGet);
router.post('/login',helper.loginPost,passportConfig.authenticate);
router.get('/createUser',helper.signupGet);
router.post('/createUser',helper.createUser);
router.get('/logout', helper.logoutUser);




module.exports = router;
