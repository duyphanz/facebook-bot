var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var { secret } = require('../config/config')


var userSchema = new mongoose.Schema({
    userID: {
        type: String,
        trim: true,
        unique:true,
        required: true
    },
    botID: {
        type: String,
        trim: true,
        required:true
    },
    email: {
        type: String,
        //unique: true,
        required: true,
        default: "email-default"
    },
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        //required: true
    },
    salt: {
        type: String,
        //required: true
    }
});

userSchema.methods.setHash = function() {

    this.salt = crypto.randomBytes(16).toString('hex');
    //console.log('Salt: ', this.salt);

    //this.hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'binary'), 1000, 64).toString('hex');
    //this.hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 1000, 64, 'sha1').toString('hex');
    //console.log('Hash: ', this.hash);


    //return [this.salt, this.hash]

}

userSchema.methods.validPassword = (password) => {
    console.log(this.salt);

    const hash = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        //exp: parseInt(expiry.getTime() / 1000)
    }, secret, {expiresIn: 30});
};

var User = mongoose.model('User', userSchema);

module.exports = { User }