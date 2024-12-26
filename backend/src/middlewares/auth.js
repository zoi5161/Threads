
// const authMiddleware = (req, res, next) => {
//     //console.log('auth middleware');

//     const sessionId = req.cookies.sessionId; // Lấy sessionId từ cookie
//     const session = sessions[sessionId]; // Lấy thông tin session

//     // Kiểm tra session có tồn tại hay không
//     if (!session) {
//         //console.log('no session');
//         return res.status(200).json({});
//     }

//     // Kiểm tra thời gian hết hạn
//     if (Date.now() > session.expired) {
//         // Xóa session nếu hết hạn
//         delete sessions[sessionId];
//         return res.status(200).json({});
//     }
//     //console.log("CHECK SESSIONS: ", sessions);
//     //console.log("CHECK SESSION account: ", session);


//     // Trả về thông tin account nếu session hợp lệ
//     // res.status(200).json(session.account);
//     req.session = session;
//     next();
// };

// module.exports = {
//     authMiddleware,
//     sessions,
// };