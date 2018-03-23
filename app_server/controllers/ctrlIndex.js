//var mongoose = require('mongoose');
//var Link = mongoose.model('Link')
const { User } = require('../models/users')

function home(req, res) {
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
    const inputCreateDir = req.query.inputCreateDir;
    const { userID } = req.user;
    console.log('User ID: ', userID + inputCreateDir);

    User.findOne({ userID }, (err, user) => {
        if (err) return console.log(err)
        const directories = user.directory;
        const isExist = directories.includes(inputCreateDir)
        if (isExist) {
            const message = 'Thư mục đã tồn tại'
            return res.render('./layouts/listDir', { directories, message })
        }
        user.directory.push(inputCreateDir);

        user.save((err) => {
            if (err) return console.log(err)
            res.render('./layouts/listDir', { directories, message: '' })
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
        const links = user.link.filter(link => link.directory === 'root')
        const directories = user.directory;

        //if(links.length === 0) empty = 'empty'
        //console.log('Link truyen zo hom ne: ', links)
        res.render("index", { links, name, directories, dir: 'root', message: '' });
    })
}

function loadLink(req, res) {

    const dir = req.params.dir;
    console.log(dir);
    const { userID } = req.user;
    console.log(userID);
    User.findOne({ userID }, (err, user) => {
        if (err) return console.log(err)
        if (!user) return console.log('None user')

        const links = user.link.filter(link => link.directory === dir)
        //const name = user.name;
        const directories = user.directory;


        //console.log(links)
        res.render('./layouts/link', { links, directories, dir })
        //res.render('test', {dir})
    })
    // const dir = req.params.dir;
    // //console.log(dir);
    // const {userID} = req.user;
    // User.findOne({userID}, (err, user) => {
    //     if(err) return console.log(err)
    //     if(!user) return console.log('None user')

    //     const links = user.link.filter( link => link.directory === dir)
    //     const name = user.name;
    //     const directories = user.directory;
    //     //console.log(links)
    //     res.render('index', {links, name, directories, dir})
    // })
}
function delDir(req, res) {
    const dir = req.query.dir;
    const { userID } = req.user;
    User.findOne({ userID }, (err, user) => {
        if (err) return console.log(err)
        const directories = user.directory;
        if (dir === 'root') {
            const message = 'Root cannot be deleted'
            return res.render('./layouts/listDir', { directories, message })
        }
        const nonDeletedLink = user.link.filter(link => link.directory != dir)
        user.link = nonDeletedLink;
        const index = directories.indexOf(dir)
        directories.splice(index, 1)

        user.save((err) => {
            if (err) return console.log(err)
            res.render('./layouts/listDir', { directories, message: '' })
        })
    })
}

function renameDir(req, res) {
    const dir = req.query.dir;
    const inputRenameDir = req.query.inputRenameDir;
    const { userID } = req.user;
    //console.log(dir + inputRenameDir + userID)
    User.findOne({ userID }, (err, user) => {
        if (err) return console.log(err)
        var directories = user.directory;

        if(inputRenameDir === 'root'){
            return res.render('./layouts/listDir', {directories, message: 'Duplicate name'})
        }
        const index = directories.indexOf(dir);
        user.directory.splice(index, 1)
        user.directory.push(inputRenameDir)
        //change link's dir
        user.link.forEach( e => {
            if( e.directory === dir) e.directory = inputRenameDir;
        })
        //console.log(directories)
        user.save((err) => {
            if (err) return console.log(err)
            //res.send('ok')
            res.render('./layouts/listDir', {directories, message: ''})
        })
    })

}

function moveDir(req, res) {
    const linkID = req.query.linkID;
    const newDir = req.query.newDir;
    const currDir = req.query.currDir;
    const userID = req.user.userID;
    User.findOne({ userID }, (err, user) => {
        if (err) return console.log(err)
        const indexLink = user.link.findIndex(link => link.id === linkID);
        user.link[indexLink].directory = newDir;
        user.save((err) => {
            if (err) return console.log(err)
            res.send(currDir)
            //res.send('/loadLink/' + currDir)
        })
    })
}

module.exports = { home, deleteOneLink, addDirectory, loadLink, moveDir, delDir, renameDir }