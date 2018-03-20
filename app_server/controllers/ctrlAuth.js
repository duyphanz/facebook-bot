//var passport = require('passport');
//var mongoose = require('mongoose');
const Util = require('./util');
// var User = mongoose.model('User');
const { User } = require('../models/users')

module.exports.register = (req, res) => {
    const {name, email, password, userid} = req.body;
    if(!name || !email || !password || !userid) {
        return Util.sendResponse(res, 400, {
            'message': 'All fileds required.'
        })
    }
    var user = new User({
        name, 
        email, 
        userID: userid,
    });

    user.setPassword(password) 
    console.log('User: ', user);
    
    user.save( err => {
        if(err) return Util.sendResponse(res, 404, err);
        var token = user.generateJwt();
        Util.sendResponse(res, 200, { token })
    })
}

module.exports.login = (req, res) => {
    if(!req.body.email || !req.body.password) {
        Util.sendResponse(res, 400, {
            message: 'All fields required.'
        })
        return;
    }
    passport.authenticate('local', (err, user, info) => {
        var token;

        if(err) {
            console.log('Loi', err);
            
            Util.sendResponse(res, 404, { Loi: err.name })
            return;
        }
        console.log(user);
        if(user){
            token = user.generateJwt();
            Util.sendResponse(res, 200, {token})
            
        } else {
            Util.sendResponse(res, 400, {info})
        }
    })(req, res);
}


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.render('info', {
        message: 'nonelogin'
    })

}
module.exports = { isLoggedIn}