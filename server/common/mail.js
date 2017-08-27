'use strict'
const nodemailer = require('nodemailer')

/**
 * 发送邮件
 * @param {*} to
 * @param {*} subject
 * @param {*} text
 * @param {*} html
 */
function sendMail (to, subject, html, cb) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD
    }
  })

  let mailOptions = {
    from: `devJobs <${process.env.GMAIL_ADDRESS}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, success) {
    cb && cb(error, success)
  })
}

exports.sentMailVerificationLink = (user, token, url, cb) => {
  const mailbody = `hello, ${user.username}! 找回您的密码请点击<a href="/resetpassword?t=${token}">Link</a>`
  sendMail(user.email, `[DeveloperJobs] 找回您的密码`, mailbody, function (error, success) {
    cb && cb(error, success)
  })
}
