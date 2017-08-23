'use strict'
const crypto = require('crypto')
const Jwt = require('jsonwebtoken')
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

exports.signToken = user => {
  const token = Jwt.sign({
    username: user.username,
    id: user._id
  }, process.env.SECRET_KEY, { expiresIn: '7d' })
  return token
}

exports.verifyToken = token => {
  try {
    return Jwt.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    console.log(err)
    return false
  }
}
