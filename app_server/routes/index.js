var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/ctrlIndex')
var {isLoggedIn} = require('../controllers/ctrlAuth');
const { decodeJWT } = require('../controllers/decodeJWT')
const passport = require('passport');


/* GET home page. */
router.get('/', isLoggedIn, ctrlIndex.home)
router.get('/error', (req, res) => {
    res.render('error')
})
router.get('/login', (req, res) => res.render('login'))
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login')
})
router.get('/delete/:id', ctrlIndex.deleteOneLink)
router.get('/auth/fb', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/auth/fb/cb', (req, res) => {

    passport.authenticate('facebook', (err, user, info) => {
        if(info) console.log(info)
        if(err) {
            console.log('Loi dang nhap: ', err)
            return res.redirect('/error')
        }
        if(!user){
            console.log('Loi dang nhap: khong ton tai user')
            return res.redirect('/error')
        }
        req.login(user, (err) => {
            if(err) {
                console.log('Loi dang nhap1: ', err)
                return res.redirect('/error')
            }
            res.redirect('/')
        });
        
    })(req, res)
})

module.exports = router;
