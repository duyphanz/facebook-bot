

const passport = require('passport');
const passportFB = require('passport-facebook').Strategy
const {User} = require('../models/users')
const config = require('../config/config')

passport.serializeUser((user, done) => {
    console.log('Serialize: ')
    if(!user) return done(new Error('Can not serialize user.'))
    done(null, user.userID);
})

passport.deserializeUser((id, done) => {
    console.log('Deserialize: ')
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
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: cbURL,
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refeshToken, profile, done) => {
    //console.log(profile);
    
    const {id, name, email} = profile._json;
    //console.log(id, name, email);
    
    User.findOne({
        userID: id
    }, (err, user) => {
        if(err) return done(err);
        if(user) 
        {
            console.log('Auth found user')
            return done(null, user);
        }
        
        //create new user if didn't exist

        const newUser = new User({
            userID: id,
            name,
            email,
            botID: 'default',
            link: [],
            directory: ['root',],
            token: accessToken,
            image: profile.photos[0].value
        })
        newUser.setHash();

        newUser.save((err, u) => {
            //console.log('Creat newUser', u);
            if(err) {
                console.log('Loi creat user', err)
                return done(err)
            }
            done(null, newUser)
        })
    })
}))



