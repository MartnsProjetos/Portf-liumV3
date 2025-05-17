require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.DEST_EMAIL,
  subject: 'Teste de envio',
  text: 'Funcionou enviar email pelo Node.js!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Erro ao enviar e-mail:', error);
  }
  console.log('Email enviado:', info.response);
});
