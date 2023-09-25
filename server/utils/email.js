const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstname = user.name;
    this.url = url;
    this.from = 'InterActiMate <InterActiMate@gmail.com>';
  }

  newTransport() {
    return nodemailer.createTransport({
      serviceName: 'SendGrid',
      auth: {},
    });
  }
};

const sendEmail = async (options) => {
  //1 create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  // 2 define the mail option
  const mailOptions = {
    from: 'InterActiMate InterActiMate@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html: options.html,
  };
  //3 Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
