var mongoose = require('mongoose');
var Link = mongoose.model('Link')


module.exports.home = function (req, res) {
    getLinkData(res);
}

module.exports.deleteOneLink = function (req, res) {
    let _id = req.params.id;
    console.log('**** ID: ' + _id)
    if (_id) {
        Link
            .findByIdAndRemove(_id)
            .exec((err, link) => {
                if (err) {
                    console.log('***Link not found' + err);
                    return;
                } else {
                    console.log('*****Link deleted');
                    res.redirect('/');
                }
            })
    } else {
        console.log('****No link ID')
        res.status(404);
    }
}
function getLinkData(res) {
    Link.find({}, (err, links) => {
        if (err) {
            console.log('****Loi get link data');
            res.render('error');
        }
        console.log(links)
        res.render('index', { links: links });
    })
}
