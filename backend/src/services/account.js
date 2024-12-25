const Account = require("../models/Account");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const createAccount = async (email, password, username) => {
    const users = await User.find({}).exec(); // lấy tất cả user
    const new_user_id = 1111 + users.length;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = new Account({
        email,
        password: hashedPassword,
        user_id: new_user_id.toString()
    });

    try {
        const user = new User({
            user_id: new_user_id.toString(),
            user_name: username,
            full_name: 'New User ' + new_user_id,
            tag: 'New User Tag ' + new_user_id,
            bio: 'New User Bio ' + new_user_id,
            avt_url: '', 
            num_follow: 0, // Mặc định số người theo dõi là 0
            link_fb: 'facebook.com', // Mặc định link fb
            follow_status: 'Theo dõi', // Mặc định là 'Not Following'
            followers: [], // Mảng followers, mặc định là rỗng
            following: [] // Mảng following, mặc định là rỗng
        });

        // Lưu user vào database
        await user.save();
        console.log('User added successfully!');
    } catch (err) {
        console.error('Error adding user:', err);
    }

    return await account.save();
};

const getAccountById = async (accountId) => {
    const account = await Account.findById(accountId).select("-password");

    if (!account) {
        throw new Error("Account not found");
    }
    return account;
};

const getAccountByEmail = async (email) => {
    const account = await Account.findOne({ email }).select("-password");
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
};

const deleteAccount = async (accountId) => {
    const account = await Account.findByIdAndDelete(accountId);
    if (!account) {
        throw new Error("Account not found");
    }
    return account;
};

const updateAccount = async (email, newPassword) => {
    const account = await Account.findOne({ email })
    if (!account) {
        throw new Error("Account not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("CHECK PASS SAU KHI HASH: ", hashedPassword);
    account.password = hashedPassword;

    await account.save();

    return { message: "Password updated successfully" };
};

const authenticateAccount = async (email, password) => {
    const account = await Account.findOne({ email });
    if (!account) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return account;
};

module.exports = {
    createAccount,
    getAccountById,
    getAccountByEmail,
    deleteAccount,
    updateAccount,
    authenticateAccount,
};
