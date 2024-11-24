const accountService = require('../services/account');

const createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const account = await accountService.createAccount(email, password);
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const account = await accountService.authenticateAccount(email, password);
        res.status(200).json({ message: "Authentication successful", account });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = {
    createAccount,
    getAccountById,
    getAccountByEmail,
    deleteAccount,
    updateAccountPassword,
    authenticateAccount,
};
