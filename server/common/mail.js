'use strict'
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
})

/**
 * 发送邮件
 * @param {*} to
 * @param {*} subject
 * @param {*} text
 * @param {*} html
 */
function sendMail (to, subject, html) {
  let mailOptions = {
    from: '"devJobs" <process.env.GMAIL_ADDRESS>', // sender address
    to, // list of receivers
    subject, // Subject line
    html // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
}

exports.sentMailVerificationLink = (user, token, cb) => {
  const mailbody = `<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/><a href=""
  >Verification Link</a></p>`

  sendMail('772608204@qq.com', `Account Verification`, mailbody, (error, success) => {
    cb(error, success)
  })
}
