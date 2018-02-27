
var request = require('request');
var cheerio = require('cheerio')
var mongoose = require('mongoose')
var Link = mongoose.model('Link');

module.exports.fbAuthToken = function (req, res) {

    let VERIFY_KEY = 'ThisIsSecret';

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    console.log(req.query);

    if (mode && token) {
        if (mode === 'subscribe' && token == VERIFY_KEY) {
            res.status(200).send(challenge);
        } else {
            console.log('Invalid token');
        }
    } else {
        res.sendStatus(404);
    }

}

module.exports.fbbot = function (req, res) {

    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                // If user send text
                if (message.message.text) {
                    var text = message.message.text;
                    console.log(text); // In tin nhắn người dùng
                    console.log(senderId);
                    callSendAPI(senderId, "Tui là bot đây: " + text);
                    addToDB(text);
                }
            }
        }
    }

    res.status(200).send("OK");
}



// Gửi thông tin tới REST API để trả lời
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "text": response
        }
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAAFnFOO5YesBAOpk5wZBJGuKLk8tu1JdYGaITHoXt3D8WIQfyiSBy8tCimZBZByucZC6do8CY5l3eC9M1ZBFIB7gOd1PqDZANNiPfefblnFTEosEqZAiThyYaTdJbRSm03J6i76HZAEk50CHqZBTPaVZApuMVZAZAgDMPXV6MoYimcsDGzSUQnqRPNfZC" },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

function addToDB(link) {
    webtitle = getTitle(link)
    Link.create({
        address: link,
        title: webtitle
    }, (error, link) => {
        if (error) { console.log('**********Loi add document') } else {
            console.log(`********Add document thanh cong: ${link}`)
        }

    });
}

function getTitle (address) {
    request(address, (err, res, body) => {
        if(err || res.statusCode != 200) {
            console.log(`Loi get title: ${err}`)
            return null;
        }
        const $ = cheerio.load(body);
        const webtitle = $('title').text();
        console.log(`WEBTITLE: ${webtitle}`);
        return webtitle;
    })
}

