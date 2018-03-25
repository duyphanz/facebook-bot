var express = require('express');
var router = express.Router();
var {home, deleteOneLink, addDirectory, loadLink, moveDir, delDir, renameDir, getKeyCode} = require('../controllers/ctrlIndex')
var {isLoggedIn} = require('../controllers/ctrlAuth');
const { decodeJWT } = require('../controllers/decodeJWT')
const passport = require('passport');


/* GET home page. */
router.get('/', isLoggedIn, home)
router.get('/error', (req, res) => {
    res.render('error')
})
router.get('/successLogin', (req, res) => {
    res.render('info', {
        message: 'successlogin'
    })
})
router.get('/login', (req, res) => res.render('login'))
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login')
})
router.get('/intro', (req, res) => {
    res.render('instruction')
})
router.get('/delete', isLoggedIn, deleteOneLink)
router.get('/addDir', isLoggedIn, addDirectory)
router.get('/loadLink/:dir', isLoggedIn, loadLink)
router.get('/moveDir', isLoggedIn, moveDir)
router.get('/delDir', isLoggedIn, delDir);
router.get('/renameDir', isLoggedIn, renameDir)
router.get('/keycode', isLoggedIn, getKeyCode)
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
            if(user.botID === 'default') return res.render('info', {
                message: 'keycode',
                keycode: user.salt
            })
            res.redirect('/')
        });
        
    })(req, res)
})

module.exports = router;
