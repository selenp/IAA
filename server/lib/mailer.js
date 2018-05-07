const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/mailer');

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(config.smtp);

const send = (to, subject, content, cb) => {
  const mailOptions = {
    from: `"${config.title}" <kefu@ydw123.cn>`, // sender address
    to, // list of receivers
    subject,
    text: content,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.warn('sendMail error:', mailOptions, error, info);
    }
    if (cb) {
      cb(error, info);
    }
  });
};

exports.send = send;
