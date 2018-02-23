

module.exports.fbAuthToken = function (req, res) {

    let VERIFY_KEY = 'ThisIsSecret';

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    console.log(req.query);

    if (mode && token) {
        if (mode === 'subscribe' && token == VERIFY_KEY){
            res.status(200).send(challenge);
        } else{
            console.log('Invalid token');
        }
    } else {
        res.sendStatus(404);
    }

}