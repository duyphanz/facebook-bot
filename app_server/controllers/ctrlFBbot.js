

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
                    sendMessage(senderId, "Tui là bot đây: " + text);
                }
            }
        }
    }

    res.status(200).send("OK");
}

// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: "EAAFnFOO5YesBAMzxxECrX7sCpGMZCnwNDxXzDupHUsk2eA7qAcuUI25lYsHKM8EIHfdpDkiGGD2GZA0Fo2CA0pxbcZAFKr3jW4yVVRIItCRdJ4BYGkfDol9iZCTsPEMkq4bJ53bEheZAIi0v1rhe7dat5HGhCPicJSyjt4WULmNIOrZCIHTBDb",
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}
