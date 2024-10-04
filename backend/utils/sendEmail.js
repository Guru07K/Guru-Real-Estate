const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "mukilanbb33@gmail.com", // your Gmail account
      pass: "ehof bent oooy icwn", // your Gmail password or App password (for security reasons use an App password)
    },
  }); 
  
  await transporter.sendMail({
    from: options.from || '"Default Sender" <mukilanbb33@gmail.com>', // Sender address is dynamically set here
    to: options.email, // List of receivers
    subject: options.subject, // Subject line
    html: options.message, // HTML body
  });
};

module.exports = sendEmail;
