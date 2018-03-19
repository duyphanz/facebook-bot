
const request = require('request');
const cheerio = require('cheerio')
//var mongoose = require('mongoose')
//var Link = mongoose.model('Link');
const { Link } = require('../models/links')
const { User } = require('../models/users')
const {Util, botResponse} = require('./util');
const {signUp} = require('./ctrlAuth')

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
                    var text = message.message.text.trim();
                    console.log(text); // In tin nhắn người dùng
                    console.log(senderId);

                    if (senderId) {
                        //Check signup
                        User.findOne({userID: senderId}, (err, user) => {
                            if(err){
                                return new Error('Check Signup error')
                            }
                            if(!user || text === '/help'){
                                callSendAPI(senderId, botResponse.help)
                            } else{
                                //callSendAPI(senderId, 'Gõ /help để xem cách sử dụng.')
                                const regexCommand = /^(\/\w+).*/g;
                                const command = regexCommand.exec(text);
                                if (command) return callSendAPI(senderId, 'Viết gì zậy má???. Gõ /help để xem cách sử dụng đi ba.')
                                switch (command[1]) {
                                    

                                    case '/signup':
                                        //const regexParameter = /^(\/\w+)\s+(.*)/g
                                        const nickname = regex.exec(text)
                                        if(!nickname[2] || nickname[2].trim() === '') return callSendAPI(senderId, 'Sai cú pháp ròi kìa -_- Gõ /signup [nickname]')
                                        signUp(senderId, nickname[2], (err) =>{
                                            if(err){
                                                console.log(err);
                                                callSendAPI(senderId, '')
                                            }

                                        })
                                        break;
                                
                                    default:
                                        callSendAPI(senderId, 'Viết gì zậy má???. Gõ /help để xem cách sử dụng đi ba.')
                                        break;
                                }

                            }
                        })
                            
                        //callSendAPI(senderId, "Tui là bot đây: " + text);
                    }
                    //addToDB(text);
                }
            }
        }
    }

    //res.status(200).send("OK");
    Util.sendResponse(res, 200, {
        "status": 200,
        "msg": "Added to DB."
    })
}

function postingFB(){}

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
    var webtitle = 'Gia tri mac dinh';
    request(link, (err, res, body) => {
        if (err || res.statusCode != 200) {
            console.log(`Loi get title: ${err}`)
        } else {
            const $ = cheerio.load(body);
            webtitle = $('title').text();
            console.log(`WEBTITLE: ${webtitle}`);
        }
        Link.create({
            address: link,
            title: webtitle
        }, (error, link) => {
            if (error) { console.log('**********Loi add document') } else {
                console.log(`********Add document thanh cong: ${link}`)
            }

        });
    })


}



