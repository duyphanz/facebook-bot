//var mongoose = require('mongoose');
//var Link = mongoose.model('Link')
const { User } = require('../models/users')

module.exports.home = function (req, res) {
    //console.log(req.decoded);
    getLinkData(res, req.user.botID, req.user.name);
}

module.exports.deleteOneLink = function (req, res) {
    const _id = req.params.id;
    const { botID } = req.user;
    User.findOne({
        botID
    }, (err, user) => {
        if (err) {
            console.log(err)
            return res.render('info')
        }
        //console.log(user)
        const index = user.link.findIndex(e => e.id === _id)
        user.link.splice(index, 1);
        // const removeLink = user.link.filter( e => e.id != _id);
        // user.link = removeLink;
        user.save((err) => {
            if (err) {
                console.log(err)
                return res.render('info')
            }
            res.redirect('/')
        })
    }

        // console.log('**** ID: ' + _id)
        // if (_id) {
        //     Link
        //         .findByIdAndRemove(_id)
        //         .exec((err, link) => {
        //             if (err) {
        //                 console.log('***Link not found' + err);
        //                 return;
        //             } else {
        //                 console.log('*****Link deleted');
        //                 res.redirect('/');
        //             }
        //         })
        // } else {
        //     console.log('****No link ID')
        //     res.status(404);
        // }
    )
}

function getLinkData(res, botID, name) {
    User.findOne({ botID }, (err, user) => {
        if (err) {
            console.log('****Loi get link data');
            res.render('error');
        }
        const links = user.link;
        //console.log('Link truyen zo hom ne: ', links)
        res.render("index", { links, name });
    })
}
