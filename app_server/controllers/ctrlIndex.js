
module.exports.home = function (req, res) {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    console.log(req.query);
    res.render('index', {title : 'Express'});
}