
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
      *1. Add link*
      -->Gõ: /a link 
      + Tùy chọn: 
      -s 'ghi chú' (có thể k điền ghi chú): yêu cầu duyệt share lên trang chủ @tuibittat. VD: /a link -s 'hello'
      -d 'tên thư mục' (nhớ phải luôn quánh tên thư mục vào nhé): Lưu link vào thư mục được chỉ định
      *2. Xem danh sách thư mục*
      -->Gõ: /dir
    *3. Truy cập trang quản lý link:* https://tuibittat.herokuapp.com/
    `
}



module.exports = {Util, botResponse};