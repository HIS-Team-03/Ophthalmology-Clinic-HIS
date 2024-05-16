// mailer.js

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = (email, username, password,name) => {
    console.log("sending email");
    let mailOptions = {
        from: 'opticareclinic8@gmail.com',
        to: email, // patient's email
        subject: 'Welcome to OptiCare Clinic! Your Account Information',
        text: `Dear ${name},\n\nWelcome to OptiCare Clinic! We are pleased to provide you with access to your online patient portal.\n\nYour login credentials are as follows:\n\n* Username: ${username}\n* Password: ${password}\n\nWith your online account, you can:\n\n* View your appointment history and upcoming appointments\n* Access your medical records`,
        html: `<p>Dear ${name},</p><p>Welcome to Optimatology Clinic! We are pleased to provide you with access to your online patient portal.</p><p>Your login credentials are as follows:</p><ul><li>Username: ${username}</li><li>Password: ${password}</li></ul><p>With your online account, you can:</p><ul><li>View your appointment history and upcoming appointments</li><li>Access your medical records</li></ul>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = sendEmail;