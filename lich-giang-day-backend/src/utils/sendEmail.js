
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Địa chỉ email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu email của bạn
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
