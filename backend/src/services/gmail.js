const nodemailer = require('nodemailer');
const Code = require('../models/Code');

// Cấu hình nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'baomun250@gmail.com',
    pass: 'tkye iwup ounb mqqb',
  },
});

// Hàm gửi email xác minh
const sendVerificationEmail = async (toEmail) => {
  // Generate mã xác minh
  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  req.session.verificationCode = verificationCode; // Lưu mã vào session
  console.log('Mã xác minh được lưu:', req.session.verificationCode);

  // Cấu hình email
  const mailOptions = {
    from: 'baomun250@gmail.com',
    to: toEmail,
    subject: 'Code for email confirmation',
    text: `Your verification code is: ${verificationCode}`,  // Nội dung email
  };

  // Gửi email
  try {
    const info = await transporter.sendMail(mailOptions);
    return { verificationCode, response: info.response };
  } catch (error) {
    throw new Error('Failed to send email: ' + error.message);
  }
};

module.exports = { sendVerificationEmail };