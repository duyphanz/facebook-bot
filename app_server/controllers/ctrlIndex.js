var mongoose = require('mongoose');
var Link = mongoose.model('Link')


module.exports.home = function (req, res) {
    getLinkData(res);
}

function getLinkData(res) {
    Link.find({}, (err, links) => {
        if(err) {
            console.log('****Loi get link data');
            res.render('error');
        }
        console.log(links)
        res.render('index', {links: links});
    })
}