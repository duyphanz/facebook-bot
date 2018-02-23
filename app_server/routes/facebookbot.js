var express = require('express');
var router = express.Router();
var ctrlFBbot = require('../controllers/ctrlFBbot');


//authen facebook
router.get('/', ctrlFBbot.fbAuthToken);
router.post('/', ctrlFBbot.fbbot)

module.exports = router;