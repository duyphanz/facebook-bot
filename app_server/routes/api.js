var express = require('express');
var router = express.Router();
var ctrlApi = require('../controllers/ctrlApi')


/* GET users listing. */
router.post('/getToken', ctrlApi.getToken);

module.exports = router;
