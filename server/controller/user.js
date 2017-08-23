'use strict'
const User = require('../model/user')
// const mail = require('../common/mail')
const Jwt = require('jsonwebtoken')
const {
  encrypt,
  decrypt
} = require('../common/crypto')

exports.register = (req, res) => {
  req.body.password = encrypt(req.body.password)
  const user = new User(req.body)

  user.save()
    .then(user => {
      const token = Jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY)
      return res.status(200).json({
        message: 'success',
        token
      })
    }).catch(err => {
      if (err.name === 'ValidationError') {
        res.status(409).json({
          message: err.message
        })
      } else {
        res.status(500).json({
          message: 'Oh uh, something went wrong'
        })
      }
    })
}

exports.updateInfo = (req, res) => {
  const token = req.headers.token
  var decoded = Jwt.verify(token, process.env.SECRET_KEY)
  User.findByIdAndUpdate(decoded.id, req.body)
    .then(user => {
      res.status(200).json({ message: 'success' })
    }).catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      res.status(404).json({ message: 'username does not exist' })
      return
    }

    if (req.body.password !== decrypt(user.password)) {
      res.status(401).json({ message: 'incorrect password' })
      return
    }

    const token = Jwt.sign({ username: user.username, id: user._id }, process.env.SECRET_KEY)

    res.cookie('devJobs', token)
    res.status(200).json({
      message: 'success',
      token,
      username: user.username
    })
  }).catch(err => {
    res.status(500).json({ message: err.message })
  })
}
