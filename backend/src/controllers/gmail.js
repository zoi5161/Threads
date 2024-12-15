const gmailService = require('../services/gmail');
const accountService = require('../services/account');
var verCode = null;
var verificationTimer = null;

const sendVerificationEmail = async (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existingAccount = await accountService.getAccountByEmail(toEmail);

    console.log('Existing account:', existingAccount);
    if (existingAccount) {
      return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống.' });
    }


    const response = await gmailService.sendVerificationEmail(toEmail);

    req.session.verificationCode = response.verificationCode;
    verCode = response.verificationCode;
    
    if (verificationTimer) {
      clearTimeout(verificationTimer);
    }

    verificationTimer = setTimeout(() => {
      verCode = null;
      console.log('Verification code reset due to timeout.');
    }, 60000);

    return res.status(200).json({ 
      message: 'Verification code sent successfully', 
      data: response 
    });
  } 
  catch (error) {
    return res.status(500).json({ 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
};

const getcode = (req) => {
  console.log(req.session);
  return req.session.verificationCode;
};


const verifyCode = async (req, res) => {
  const { code } = req.body;
  const verificationCode = getcode(req);


  console.log('Mã từ client:', code);
  console.log('Mã trong session:', verCode);

  if (verCode && verCode.toString() === code) {
    return res.status(200).json({ message: 'Xác minh thành công!' });
  }
  return res.status(400).json({ message: 'Mã xác minh không đúng hoặc hết hạn.' });
};

module.exports = { sendVerificationEmail, verifyCode, getcode};