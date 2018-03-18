const { User } = require('../models/users')
const Util = require('./util')

module.exports.getToken = function(req, res){
    const { email } = req.body;
    if(!email){
        return Util.sendResponse(res, 404, {
            message: 'User not found.'
        })
    }
    User.findOne({email: email})
    .then( user => {
        token = user.generateJwt();
        Util.sendResponse(res, 200, {
            message: 'OK',
            token: token
        })
    })
    .catch( err => {
        console.log('Loi get token: ', err);
        res.render('error', {
            message: 'Loi get token.',
            error: err
        })
    })

}

