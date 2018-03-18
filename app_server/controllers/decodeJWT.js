
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

function decodeJWT(req, res, next) {
    const {token} = req.query || req.body;
    if(!token){
        return res.status(404).send('Token not found');
    }
    const user = jwt.verify(token, secret, (err, decoded) => {
        if(err){
            return res.status(500).send(err)
        }
        console.log('Decoded:', decoded);
        req.decoded = decoded;
        next()
    })

}

module.exports = { decodeJWT }