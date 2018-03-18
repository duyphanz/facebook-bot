
class Util {

    //Tra response khi co request
    static sendResponse(res, statusCode, content){
        res.status(statusCode);
        res.json(content);
    }
}

const botResponse = {
    help: `+ Đăng ký để bắt đầu sử dụng:
    #signup [nickname]
    `
}

module.exports = {Util, botResponse};