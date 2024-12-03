const gmailService = require('../services/gmail');

const sendVerificationEmail = async (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const response = await gmailService.sendVerificationEmail(toEmail, req);;
    
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

const verifyCode = async (req, res) => {
  const { code } = req.body;
  console.log('Mã từ client:', req.body.code);
  console.log('Mã trong session:', req.session.verificationCode);

  if (req.session.verificationCode && req.session.verificationCode.toString() === code) {
    req.session.destroy();
    return res.json({ message: 'Xác minh thành công!' });
  }
  res.status(400).json({ message: 'Mã xác minh không đúng hoặc hết hạn.' });
};

module.exports = { sendVerificationEmail, verifyCode };