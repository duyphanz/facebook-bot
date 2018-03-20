
class Util {

    //Tra response khi co request
    static sendResponse(res, statusCode, content){
        res.status(statusCode);
        res.json(content);
    }
}

const botResponse = {
    help: 
    `1. Đăng nhập để nhận keycode kích hoạt @bot nhé:
    --> Gõ: /signup 
    2. Kích hoạt @bot bằng keycode nhận được:
    --> Gõ: /active keycode
    `,
    details: `Add: 
    Dasboard: `
}

module.exports = {Util, botResponse};