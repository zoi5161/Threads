const Account = require("../models/Account");
const bcrypt = require("bcrypt");

const createAccount = async (email, password) => {
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = new Account({
        email,
        password: hashedPassword,
    });

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
