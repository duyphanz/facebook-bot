// var jwt = require('jsonwebtoken');

// var token = jwt.sign({name: "duy"}, 'thisIsSecret');

// console.log(token);

// var decoded = jwt.verify(token, 'thisIsSecret');
// console.log(decoded)

//------------------------

const {botResponse} = require('./app_server/controllers/util')

console.log(botResponse.help);
