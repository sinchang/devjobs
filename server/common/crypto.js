'use strict'
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'

exports.decrypt = (password) => {
  const decipher = crypto.createDecipher(algorithm, process.env.SECRET_KEY)
  let dec = decipher.update(password, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

exports.encrypt = (password) => {
  const cipher = crypto.createCipher(algorithm, process.env.SECRET_KEY)
  let crypted = cipher.update(password, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}
