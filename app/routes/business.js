var express = require('express');
const path = require('path');
var businessController = require(path.join(__dirname,'../controllers/business'));
const passportConfig = require(path.join(__dirname,'../config/passport'));
var router = express.Router();
router.get('/',passportConfig.isAuthenticated);
router.get('/add',passportConfig.isAuthenticated,businessController.addBusinessGet);
router.post('/add',passportConfig.isAuthenticated,businessController.addBusinessPost);
router.get('/view',passportConfig.isAuthenticated,businessController.viewBusinessGet);
router.get('/update',passportConfig.isAuthenticated,businessController.updateBusinessGet);
router.get('/update/:bid',passportConfig.isAuthenticated,businessController.updateBusinessById);
router.post('/update/:bid',passportConfig.isAuthenticated,businessController.updateBusinessPost);
module.exports = router;