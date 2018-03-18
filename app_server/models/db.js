var mongoose = require('mongoose');
require('./links')
require('./users')
var GracefullShutdown;
//connect to mongoosedb
var dbURI = 'mongodb://chimsaudibao:phanngocduy@ds147118.mlab.com:47118/linkcollection';
mongoose.connect(dbURI);

//connection result
mongoose.connection.on('connected', () => {
    console.log(`Connected to URI: ${dbURI}`);
});

mongoose.connection.on('error', (e) => {
    console.log(`Connect to mongoose failed: ${e}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected to mongoosedb');
});

//closing connection

GracefullShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log(`Disconnect to mongodb: ${msg}`)
        callback();
    });
}
process.once('SIGUSR2', () => {
    GracefullShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    GracefullShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    GracefullShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});