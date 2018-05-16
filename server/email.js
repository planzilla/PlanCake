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
    refreshToken: clientDetails.refreshToken,
  },
});

const template = email => ({
  from: 'PlanCake Co <plancake.co@gmail.com>',
  to: email,
  subject: 'You\'ve been invited to a PlanCake event!',
  text: 'Please click here to join the event planning :)',
  html: '<b>Please click here to join the event planning :)</b> <br/> <button> Link </Button>',
});

module.exports.transporter = transporter;
module.exports.template = template;
