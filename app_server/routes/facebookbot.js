var express = require('express');
var router = express.Router();
var ctrlFBbot = require('../controllers/ctrlFBbot');


//authen facebook
router.get('/', ctrlFBbot.fbAuthToken);

module.exports = router;