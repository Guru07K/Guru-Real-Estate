const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true, 
    auth: {
      user: "mukilanbb33@gmail.com",
      pass: "ehof bent oooy icwn", 
    },
  }); 
  
  await transporter.sendMail({
    from: options.from , 
    to: options.email, 
    subject: options.subject, 
    text: options.message,  
    replyTo: options.from,
  });
};

module.exports = sendEmail;
