// var jwt = require('jsonwebtoken');

// var token = jwt.sign({name: "duy"}, 'thisIsSecret');

// console.log(token);

// var decoded = jwt.verify(token, 'thisIsSecret');
// console.log(decoded)

//------------------------

var test = '/signup tuibittat'

var regex = /^(\/\w+)\s(.*)/g

var match = regex.exec(test);

console.log(match);

