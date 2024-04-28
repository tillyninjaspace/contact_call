const apiRouter = require('express').Router()
const nodemailer = require('nodemailer')

apiRouter.get('/mail', (req,res, next) => {
    res.send({message: `You've got mail!`})
});

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const contactEmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
});
  
contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready for message to send...");
    }
});

apiRouter.post("/send", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: EMAIL,
      subject: "Contact Form Submission via Contact Form website",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {  
      console.log("Mail Message:", mail)
      if (error) {
        console.log("Current Error: ", error)
        res.json({ status: "ERROR. Message not sent." });
      } else {
        res.json({ status: "Message Sent." });
        console.log("Message successfully sent.")
      }
    });
});

module.exports = apiRouter