const nodemailer = require('nodemailer');

require('dotenv').config();

function sendEmail (args={}) {
return new Promise((resolve,reject)=>{

  const title = args.title ? args.title : '⛔⛔⛔🏋️‍♀GYM ALERT🏋️‍♀⛔⛔⛔';
  const booking_hour = args.booking_hour ? args.booking_hour : '<Unknown>'
  const name = args.name ? args.name : '<Unknown>'
  const link = args.link ? args.link : '<Unknown>'
  const message_payload = args.message_payload ? args.message_payload : '<Unknown>'
  const featuredMessage = args.featuredMessage ? args.featuredMessage : `<p style="font-size:48px; font-weight: bold"> ${message_payload}  </p> </br>`; 
  const errMessage = args.errMessage ? args.errMessage : `<p style="font-size:12px; font-weight: bold"> ${message_payload}  </p> </br>`; 
  const message = args.error ? errMessage: featuredMessage;

  try {
    let transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: title,
      html: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error)
      } else {
        console.log('Email sent: ' + info.response);
        resolve('Email sent');
      }
  });
  
  } catch (err) {
    console.log(err)
    reject(err)
  }
})

  }

  module.exports = sendEmail;