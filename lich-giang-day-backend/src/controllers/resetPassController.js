const nodemailer = require('nodemailer');
const User = require('../models/Lecturer'); 

let verificationCodes = {}; // Lưu mã xác minh

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

exports.requestReset = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    const code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
    const expirationTime = Date.now() + 70 * 1000; // Set expiration time to 1 minute from now
    verificationCodes[email] = { code, expirationTime };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mã xác thực đổi mật khẩu',
        text: `Mã xác thực của bạn là: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        console.log(`send code to ${email}`)
        res.status(200).send('Verification code sent');
    });
};

exports.verifyCode = (req, res) => {
    const { email, code } = req.body;
    const record = verificationCodes[email];

    if (!record) return res.status(400).send('Invalid code');
    if (record.expirationTime < Date.now()) {
        delete verificationCodes[email];
        return res.status(400).send('Code expired');
    }
    if (record.code === code) {
        res.status(200).send('Code verified');
    } else {
        res.status(400).send('Invalid code');
    }
};

exports.updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    await User.updateOne({ email }, { password: newPassword });
    delete verificationCodes[email]; // Remove the code after successful password reset

    res.status(200).send('Password updated');
};
