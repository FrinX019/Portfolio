const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received contact form submission:', { name, email, message });

    try {
        // Create Gmail transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ferminfierro4@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
            html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        console.log('Message ID:', info.messageId);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

module.exports = router;
