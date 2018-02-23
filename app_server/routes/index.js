var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/ctrlIndex')

/* GET home page. */
router.get('/', ctrlIndex.home);

module.exports = router;
