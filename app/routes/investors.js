var express = require('express');
var router = express.Router();
const path = require('path');
const passportConfig = require(path.join(__dirname,'../config/passport'));
var InvestorsController = require(path.join(__dirname,'../controllers/investors'));

router.get('/',passportConfig.isAuthenticated,InvestorsController.getInvestors);

module.exports = router;