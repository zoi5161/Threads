const gmailService = require('../services/gmail');
const accountService = require('../services/account');
var verCode = null;
var verificationTimer = null;

//lưu tạm thông tin người dùng khi đăng kí
var localEmail = null;
var localPassword = null;
var localUserName = null;

const sendVerificationEmail = async (req, res) => {
  const { toEmail, password, username } = req.body;

  console.log('Email:', toEmail);
  console.log('Password:', password);

  localEmail = toEmail;
  localPassword = password;
  localUserName = username;

  if (!toEmail) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    try {
      existingAccount = await accountService.getAccountByEmail(toEmail);
    } catch (error) {
      if (error.message === "Account not found") {
        existingAccount = null;
      } else {
        throw error;
      }
    }

    if (existingAccount) {
      return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống.' });
    }

    const response = await gmailService.sendVerificationEmail(toEmail);

    // req.session.verificationCode = response.verificationCode;
    verCode = response.verificationCode;

    console.log('Verification code:', verCode);
    
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

// const getcode = (req) => {
//   console.log(req.session);
//   return req.session.verificationCode;
// };


const verifyCode = async (req, res) => {
  const { code } = req.body;
  // const verificationCode = await getcode(req);

  console.log('Mã từ client:', code);
  console.log('Mã trong session:', verCode);

  if (verCode && verCode.toString() === code) {
      const account = await accountService.createAccount(localEmail, localPassword, localUserName);
      
      verCode = null;

      return res.status(201).json({ 
        message: 'Xác minh thành công! Tài khoản đã được tạo.',
        account
      });
  }
  return res.status(400).json({ message: 'Mã xác minh không đúng hoặc hết hạn.' });
};





const sendVerificationEmail_ResetPass = async (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    try {
      existingAccount = await accountService.getAccountByEmail(toEmail);
    } catch (error) {
      if (error.message === "Account not found") {
        existingAccount = null;
      } else {
        throw error;
      }
    }

    console.log('Existing account:', existingAccount);
    if (!existingAccount) {
      return res.status(400).json({ message: 'Email không tồn tại trong hệ thống.' });
    }


    const response = await gmailService.sendVerificationEmail(toEmail);

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


const verifyCode_ResetPass = async (req, res) => {
  const { code, email, pass } = req.body;

  if (verCode && verCode.toString() === code) {
    console.log("CHECK PASS TRƯỚC KHI HASH: ", pass);
    const updateResponse = await accountService.updateAccount(email, pass);
    verCode = null;
    if (updateResponse.message === "Password updated successfully") {
      return res.status(200).json({ message: 'Đổi mật khẩu thành công !' });
    }
  }

  return res.status(400).json({ message: 'Mã xá minh không đúng hoặc hết hạn.' });
}

module.exports = { 
  sendVerificationEmail,
  verifyCode,

  sendVerificationEmail_ResetPass,
  verifyCode_ResetPass 
};