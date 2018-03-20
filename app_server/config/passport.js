

const passport = require('passport');
const passportFB = require('passport-facebook').Strategy
const {User} = require('../models/users')

passport.serializeUser((user, done) => {
    console.log('Serialize: ', user)
    if(!user) return done(new Error('Can not serialize user.'))
    done(null, user.userID);
})

passport.deserializeUser((id, done) => {
    User.findOne({
        userID: id
    }, (err, user) => {
        if(err) return done(err);
        if(!user) return done(new Error('Can not deserialize user'))
        done(null,user)
    })
} )

const cbURL = process.env.PORT ? 'https://tuibittat.herokuapp.com/auth/fb/cb' : 'http://localhost:3000/auth/fb/cb';

passport.use( new passportFB({
    clientID: '394814394294763',
    clientSecret: 'bdd916fac40827aaaae4cf18ebb30551',
    callbackURL: cbURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refeshToken, profile, done) => {
    console.log(profile);
    
    const {id, name, email} = profile._json;
    console.log(id, name, email);
    
    User.findOne({
        userID: id
    }, (err, user) => {
        if(err) return done(err);
        if(user) return done(null, user);
        //create new user if didn't exist

        const newUser = new User({
            userID: id,
            name,
            email,
            botID: 'default',
            link: [],
            directory: []
        })
        newUser.setHash();

        newUser.save((err, u) => {
            console.log('Creat newUser', u);
            if(err) {
                console.log('Loi creat user', err)
                return done(err)
            }
            done(null, newUser)
        })
    })
}))



