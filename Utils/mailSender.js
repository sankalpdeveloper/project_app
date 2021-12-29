const nodemailer = require("nodemailer");
require('dotenv').config();
const demotemp = require('./templates/demoTemplates')


const option = {
    to:"karan.cmarix@gmail.com",
    subject:"this is subject",
    message:demotemp.temp
}
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(option) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_SANDGRID_SERVER,
        port: process.env.SMTP_PORT_NON_SSL_2,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.MAIL_SANDGRID_USERNAME,
          pass: process.env.MAIL_SANDGRID_PASSWORD,
        },
      });
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log("error",error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Sankalp cmarix" <sankalp.cmarix@gmail.com>', // sender address
        to: option.to, // list of receivers
        subject: option.subject, // Subject line
        // text: "Hello world?", // plain text body
        html: option.message, // html body
      });

      console.log("Message sent: %s", info);

}

sendMail(option).catch(console.error);


