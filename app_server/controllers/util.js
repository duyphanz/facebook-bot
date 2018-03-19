
class Util {

    //Tra response khi co request
    static sendResponse(res, statusCode, content){
        res.status(statusCode);
        res.json(content);
    }
}

const botResponse = {
    help: `[Hãy bắt đầu sử dụng bằng việc đăng ký 1 tài khoản nha]:
    /signup [nickname]
    `
}

module.exports = {Util, botResponse};