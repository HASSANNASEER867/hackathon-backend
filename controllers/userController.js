const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');

const registerUser = async (req, res) => {
  const { CNIC, name, email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({ CNIC, name, email, password: 'defaultpassword' });

  await user.save();

  // Send email with password (for now it's default, you can update it later)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Created',
    text: `Your account has been created. Your temporary password is "defaultpassword". Please log in and change your password.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent: ' + info.response);
  });

  res.status(201).json({ message: 'User registered successfully', user });
};

module.exports = { registerUser };
