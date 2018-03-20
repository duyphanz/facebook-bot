
class Util {

    //Tra response khi co request
    static sendResponse(res, statusCode, content){
        res.status(statusCode);
        res.json(content);
    }
}

const botResponse = {
    help: 
    `
    *B1. Đăng nhập để nhận keycode kích hoạt @bot nhé:*
    --> Click vào đường link sau để đăng nhập và nhận keycode: https://tuibittat.herokuapp.com/login 
    *B2. Kích hoạt @bot bằng keycode nhận được:*
    --> Gõ: /active keycode
    `,
    details: 
    `
    1. Add link: /a link 
    2. Truy cập trang quản lý link: https://tuibittat.herokuapp.com/
    `
}

module.exports = {Util, botResponse};