//var mongoose = require('mongoose');
//var Link = mongoose.model('Link')
const { User } = require('../models/users')

function home (req, res) {
    //console.log(req.decoded);

    getLinkData(res, req.user.botID);
}

function deleteOneLink(req, res) {
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

function addDirectory(req, res) {
    const {dirName} = req.body;
    const {userID} = req.user;
    console.log('User ID: ', userID + dirName);
    
    User.findOne({userID}, (err, user) => {
        if(err) return console.log(err)
        user.directory.push(dirName);
        user.save((err) => {
            if(err) return console.log(err)
            res.redirect('/');
        })
    })
}

function getLinkData(res, botID) {
    User.findOne({ botID }, (err, user) => {
        if (err) {
            console.log('****Loi get link data');
            res.render('error');
        }
        const name = user.name;
        const links = user.link;
        const directories = user.directory;
        //console.log('Link truyen zo hom ne: ', links)
        res.render("index", { links, name, directories, dir: 'root'});
    })
}

function loadLink(req, res){
    const dir = req.params.dir;
    //console.log(dir);
    const {userID} = req.user;
    User.findOne({userID}, (err, user) => {
        if(err) return console.log(err)
        if(!user) return console.log('None user')

        const links = user.link.filter( link => link.directory === dir)
        const name = user.name;
        const directories = user.directory;
        //console.log(links)
        res.render('index', {links, name, directories, dir})
    })
}

function moveDir(req, res){
    const linkID = req.query.linkID;
    const newDir = req.query.newDir;
    const currDir = req.query.currDir;
    const userID = req.user.userID;
    User.findOne({userID}, (err, user) => {
        if(err) return console.log(err)
        const indexLink = user.link.findIndex( link => link.id === linkID);
        user.link[indexLink].directory = newDir;
        user.save((err) => {
            if(err) return console.log(err)
            res.send('/loadLink/' + currDir)
        }) 
    })
}

module.exports = {home, deleteOneLink, addDirectory, loadLink, moveDir}