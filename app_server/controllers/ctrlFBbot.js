
const request = require('request');
const cheerio = require('cheerio')
//var mongoose = require('mongoose')
//var Link = mongoose.model('Link');
const { Link } = require('../models/links')
const { User } = require('../models/users')
const { Util, botResponse } = require('./util');


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
    //console.log(entries.json());
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
                        User.findOne({ botID: senderId }, (err, user) => {
                            const regexCommand = /^(\/\w+).*/g;
                            const command = regexCommand.exec(text);

                            if (err) {
                                return new Error('Check Signup error')
                            }

                            if (!command) return callSendAPI(senderId, 'Viết gì zậy má???. Gõ /help để xem cách sử dụng đi ba.')

                            if (!user) {
                                //console.log('No user')
                                if (text === '/help') return callSendAPI(senderId, botResponse.help)
                                switch (command[1]) {
                                    case '/signup':
                                        //const regexParameter = /^(\/\w+)\s+(.*)/g
                                        callSendAPI(senderId, 'Click vào đường link sau để đăng ký: https://tuibittat.herokuapp.com/login')
                                        break;
                                    case '/active':

                                        if (user.botID != 'default') return callSendAPI(senderId, 'Bạn đã kích hoạt @bot rồi mà bro??')
                                        const regexParameter = /^(\/\w+)\s+(.*)/g
                                        const parameter = regexParameter.exec(text);
                                        const keycode = parameter[2];
                                        if (!keycode || keycode === 'default') return callSendAPI(senderId, 'Sai cú pháp kich hoạt bot rồi nhé :)');
                                        User.findOneAndUpdate({
                                            hash: keycode
                                        }, {
                                                botID: senderId
                                            }, (err, user) => {
                                                if (err) {
                                                    console.log(err);
                                                    return callSendAPI(senderId, 'Đã có lỗi, vui lòng thực hiện lại.')
                                                }
                                                if (!user) {
                                                    return callSendAPI(senderId, 'Keycode sai rồi, kiểm tra keycode và kích hoạt lại nha.')
                                                }
                                                callSendAPI(senderId, 'Kích hoạt @bot thành công rồi nha ' + user.name);
                                            })
                                        //----------

                                        break;
                                    default:
                                        callSendAPI(senderId, 'Bạn chưa đăng ký hoặc kích hoạt @bot. Gõ /help để được hướng dẫn nhé.')
                                        break;
                                }
                            } else {
                                //User da kich hoat bot

                                if (text === '/help') {
                                    return callSendAPI(senderId, botResponse.details)
                                }
                                else {
                                    //Xu lu chuc nang
                                    return callSendAPI(senderId, 'Gõ /help để xem thông tin chức năng nhé')
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

function postingFB() { }

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



