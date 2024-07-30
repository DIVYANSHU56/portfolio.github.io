require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'divyanshu.sh88@gmail.com',
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from:
        
Name: ${name}
Email: ${email}
Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending message');
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Message sent successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
