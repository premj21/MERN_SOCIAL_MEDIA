const nodemailer  = require('nodemailer');

exports.sendmail= async(options)=>{
   var transporter = await nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6bc86bf407b998",
    pass: "a735f20d6f1864"
  }
});
const mailoptions = {
    from:"sandbox.smtp.mailtrap.io",
    to:options.email,
    subject:options.subject,
    text:options.message,
};
await transporter.sendMail(mailoptions);

}