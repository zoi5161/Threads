const gmailService = require('../services/gmail');

const sendVerificationEmail = async (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const response = await gmailService.sendVerificationEmail(toEmail);

    req.session.verificationCode = response.verificationCode;
    console.log(getcode(req));

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
  const verificationCode = await getcode(req);


  console.log('Mã từ client:', code);
  console.log('Mã trong session:', verificationCode);
  console.log(req.session);

  if (req.session.verificationCode && req.session.verificationCode.toString() === code) {
    req.session.destroy();
    return res.status(200).json({ message: 'Xác minh thành công!' });
  }
  return res.status(400).json({ message: 'Mã xác minh không đúng hoặc hết hạn.' });
};

module.exports = { sendVerificationEmail, verifyCode, getcode};