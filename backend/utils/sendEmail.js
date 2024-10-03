const nodemailer = require("nodemailer");


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "mukilanbb33@gmail.com",
      pass: "ehof bent oooy icwn",
    },
  });
  
  
  await transporter.sendMail({
      from: 'mukilanbb33@gmail.com', // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      html:options.message, // html body
    });

}  

module.exports = sendEmail;