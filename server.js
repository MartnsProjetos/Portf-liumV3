aqaconst express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rota GET para testar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Rota POST para enviar email
app.post('/send-email', async (req, res) => {
  const { user_name, user_phone, user_email, subject, message } = req.body;

  if (!user_name || !user_phone || !user_email || !message) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${user_name}" <${user_email}>`,
    to: process.env.DEST_EMAIL,
    subject: subject || 'Contato via site',
    html: `
      <p><b>Nome:</b> ${user_name}</p>
      <p><b>WhatsApp:</b> ${user_phone}</p>
      <p><b>E-mail:</b> ${user_email}</p>
      <p><b>Empresa:</b> ${subject || 'Não informado'}</p>
      <p><b>Mensagem:</b><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar o email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
