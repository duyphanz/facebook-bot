
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    User.findOne({email: username}, (err, user) => {
        if(err) return done(err);
        if(!user) return done(null, false, {message: 'Incorrect username.'});
        console.log(password);
        
        if(!user.validPassword(password)) return done(null, false, {message: 'Incorect password.'});
        return done(null, user);
    })
}));