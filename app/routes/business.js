var express = require('express');
const path = require('path');
var userController = require(path.join(__dirname,'../controllers/userController'));
var businessController = require(path.join(__dirname,'../controllers/business'));
const passportConfig = require(path.join(__dirname,'../config/passport'));
var router = express.Router();
router.get('/',passportConfig.isAuthenticated);
router.get('/add',passportConfig.isAuthenticated,userController.isEntrepreneur,businessController.addBusinessGet);
router.post('/add',passportConfig.isAuthenticated,businessController.addBusinessPost);
router.get('/view',passportConfig.isAuthenticated,businessController.viewBusinessGet);
router.get('/view/:id',passportConfig.isAuthenticated,businessController.viewOneBusinessGet);
router.get('/update',passportConfig.isAuthenticated,userController.isEntrepreneur,businessController.updateBusinessGet);
router.get('/update/:bid',passportConfig.isAuthenticated,businessController.updateBusinessById);
router.post('/update/:bid',passportConfig.isAuthenticated,businessController.updateBusinessPost);
module.exports = router;