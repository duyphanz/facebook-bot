var express = require('express');
var router = express.Router();
var {fbAuthToken, fbbot} = require('../controllers/ctrlFBbot');


//authen facebook
router.get('/', fbAuthToken);
router.post('/', fbbot)

module.exports = router;