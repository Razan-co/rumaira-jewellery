const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.SMTP_EMAIL, 
    pass: process.env.SMTP_PASSWORD,
  },
  
});



module.exports = transporter;
