const accountService = require('../services/account');
const { v4: uuidv4 } = require("uuid"); // để tạo chuỗi ngẫu nhiên sessionId


//session: ở đây khai báo đơn giản là 1 object thoi
const sessions = {}

const createAccount = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Email, password, and username are required" });
        }

        // Validation cho username
        const usernameRegex = /^[a-zA-Z0-9-_\.]{4,30}$/;  // Chỉ cho phép chữ cái, số, -, _, . và độ dài tối thiểu 4, tối đa 30
        
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username must be alphanumeric with dash, hyphen, or dot, and not exceed 30 characters" });
        }

        const account = await accountService.createAccount(email, password, username);
        res.status(201).json(account);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAccountById = async (req, res) => {
    try {
        const { accountId } = req.params;
        const account = await accountService.getAccountById(accountId);
        res.status(200).json(account);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getAccountByEmail = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const account = await accountService.getAccountByEmail(email);
        res.status(200).json(account);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const getAccountByUsername = async (req, res) => {
    try {
        const { username } = req.params;  // Lấy username từ params trong URL
        console.log("Looking for username:", username);  // Debugging

        // Gọi hàm trong service để lấy tài khoản theo username
        const account = await accountService.getAccountByUsername(username);
        console.log("Looking for account:", account);

        // Nếu tìm thấy tài khoản, trả về
        res.status(200).json(account);
    } catch (err) {
        // Nếu có lỗi, trả về lỗi với thông báo
        res.status(404).json({ message: err.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { accountId } = req.params;

        await accountService.deleteAccount(accountId);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const updateAccountPassword = async (req, res) => {
    try {

        const { accountId } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: "New password is required" });
        }

        const result = await accountService.updateAccount(accountId, newPassword);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const authenticateAccount = async (req, res) => {
    try {
        const { input, password } = req.body;

        // Kiểm tra xem có đủ thông tin hay không
        if (!input || !password) {
            return res.status(400).json({ message: "Input (email or username) and password are required" });
        }

        // Tìm tài khoản qua email hoặc username
        const account = await accountService.authenticateAccount(input, password);
        
        // Tạo sessionId cho người dùng đã đăng nhập
        const sessionId = uuidv4();
        sessions[sessionId] = {
            account: account,
            expired: Date.now() + 60 * 60 * 1000, // session hết hạn sau 1 giờ
        };

        // Gửi sessionId vào cookie
        res.setHeader(
            'Set-Cookie',
            `sessionId=${sessionId}; Path=/; HttpOnly; Max-Age=${3600}`
        );

        res.status(200).json({ message: "Authentication successful", account });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const logOutAccount = (req, res) => {

    // console.log(">>>CHECK COOKIE BACKEND: ", req.cookies.sessionId);
    try {
        // console.log(sessions);
        delete sessions[req.cookies.sessionId];
        res.setHeader('Set-Cookie', `sessionId=; Path=/; HttpOnly; Max-Age=0`);

        // console.log("CHECK SESSIONS APTER LOGOUT: ", sessions);
        res.status(200).json({ message: "Log Out successful" });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const getAccountData = (req, res) => {
    const sessionId = req.cookies.sessionId; // Lấy sessionId từ cookie
    const session = sessions[sessionId]; // Lấy thông tin session

    // Kiểm tra session có tồn tại hay không
    if (!session) {
        console.log('Session không tồn tại hoặc đã hết hạn.');
        return res.status(203).json({ redirect: "/login", message: "Not logged in" });
    }

    // Kiểm tra thời gian hết hạn
    if (Date.now() > session.expired) {
        console.log('Session hết hạn.');
        delete sessions[sessionId]; // Xóa session nếu hết hạn
        return res.status(203).json({ redirect: "/login", message: "Session expired" });
    }
    // console.log("CHECK SESSIONS: ", sessions);
    // console.log("CHECK SESSION account: ", session);


    // Trả về thông tin account nếu session hợp lệ
    res.status(200).json(session.account);
};

const authMiddleware = (req, res, next) => {
    const sessionId = req.cookies.sessionId; // Lấy sessionId từ cookie
    const session = sessions[sessionId]; // Lấy thông tin session

    // Kiểm tra session có tồn tại hay không
    if (!session) {
        console.log('Session không tồn tại hoặc đã hết hạn.');
        return res.status(401).json({ redirect: "/login", message: "Unauthorized" });
    }

    // Kiểm tra thời gian hết hạn
    if (Date.now() > session.expired) {
        console.log('Session hết hạn.');
        delete sessions[sessionId]; // Xóa session nếu hết hạn
        return res.status(401).json({ redirect: "/login", message: "Session expired" });
    }

    // Session hợp lệ, gắn session vào request
    req.session = session;
    next();
};

module.exports = {
    createAccount,
    getAccountById,
    getAccountByEmail,
    getAccountByUsername,
    deleteAccount,
    updateAccountPassword,
    authenticateAccount,

    logOutAccount,
    getAccountData,
    authMiddleware,
    sessions,
};
