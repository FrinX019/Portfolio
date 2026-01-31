const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received contact form submission:', { name, email, message });

    try {
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.MAIL_TO) {
            return res.status(500).json({
                message: 'Email service is not configured. Set EMAIL_USER, EMAIL_PASS, and MAIL_TO.'
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.MAIL_TO,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
