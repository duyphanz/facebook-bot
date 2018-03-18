var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/ctrlIndex')
var ctrlAuth = require('../controllers/ctrlAuth');
const {decodeJWT} = require('../controllers/decodeJWT')



/* GET home page. */
router.get('/', decodeJWT, ctrlIndex.home);
router.get('/delete/:id', ctrlIndex.deleteOneLink)
router.post('/register', ctrlAuth.register)
// router.post('/login', ctrlAuth.login)
// router.get('/login', (req, res) => {
//     res.render('login')
    
// })
module.exports = router;
