const express = require("express");
const accountController = require("../controllers/account");
const router = express.Router();

router.get("/", accountController.getAccountByEmail);
router.get("/username/:username", accountController.getAccountByUsername);
router.post("/", accountController.createAccount);
router.get("/logout", accountController.logOutAccount);
router.get("/getAccount", accountController.getAccountData);
router.get("/:accountId", accountController.getAccountById);
router.delete("/:accountId", accountController.deleteAccount);
router.put("/:accountId/password", accountController.updateAccountPassword);
router.post("/authenticate", accountController.authenticateAccount);
module.exports = router;
