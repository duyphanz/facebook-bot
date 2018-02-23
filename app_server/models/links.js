
var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
    address: String,
    timestamp: { type: Date, default: Date.now }
});

mongoose.model('Link', linkSchema);