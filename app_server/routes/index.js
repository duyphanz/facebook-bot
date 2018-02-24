var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/ctrlIndex')

/* GET home page. */
router.get('/', ctrlIndex.home);
router.get('/delete/:id', ctrlIndex.deleteOneLink)
module.exports = router;
