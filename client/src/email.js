const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const clientDetails = require('./_emailPrivate.js');

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'plancakeco@gmail.com',
      clientId: clientDetails.clientId,
      clientSecret: clientDetails.clientSecret,
      refreshToken: clientDetails.refreshToken
  }
});

const mailOptions = {
  from: 'Christina <plancake.co@gmail.com>',
  to: 'christina.elaine.yuen@gmail.com',
  subject: 'nodemailer test',
  text: 'hello world'
}

transporter.sendMail(mailOptions, function(err, res) {
  if (err) {
    console.log('err', err);
  } else {
    console.log('email is sent')
  }
})