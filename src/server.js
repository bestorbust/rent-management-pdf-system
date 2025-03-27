require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  { email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10) }
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: ${resetLink}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ message: 'Email not sent' });
    res.json({ message: 'Password reset email sent' });
  });
});

app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(u => u.email === decoded.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = bcrypt.hashSync(newPassword, 10);
    res.json({ message: 'Password reset successful' });
  } catch {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
