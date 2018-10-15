var express = require('express');
const path = require('path');

var router = express.Router();
const indexController = require(path.join(__dirname,'../controllers/index'));

router.get('/',indexController.getHome);
router.get('/aboutUs',indexController.getAbout);


module.exports = router;
