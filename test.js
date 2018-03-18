var jwt = require('jsonwebtoken');

var token = jwt.sign({name: "duy"}, 'thisIsSecret');

console.log(token);

var decoded = jwt.verify(token, 'thisIsSecret');
console.log(decoded)