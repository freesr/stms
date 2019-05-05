const nodemailer = require('nodemailer');

module.exports = async (userGmail, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: `smtp.gmail.com`,
            service: `gmail`,
            //The following details needed to be entered
            auth: {
                user: 'buscvr@gmail.com',
                pass: 'cvr_1234'
            }
        });

        const mailOptiions = {
            from: `buscvr@gmail.com`,
            to: userGmail,
            subject: subject,
            text: message
        };

        const responseFromEmail = await transporter.sendMail(mailOptiions);
        console.log(responseFromEmail.response);

    } catch (err) {
        throw err;
    }
};