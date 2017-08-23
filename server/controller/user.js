'use strict'
const User = require('../model/user')
const {
  sentMailVerificationLink
} = require('../common/mail')
const {
  sendError
} = require('../common/errorHandler')
const {
  encrypt,
  decrypt,
  signToken,
  verifyToken
} = require('../common/crypto')

exports.register = (req, res) => {
  const password = encrypt(req.body.password)
  const user = new User({
    password,
    email: req.body.email,
    username: req.body.username
  })

  user.save()
    .then(user => {
      const token = signToken(user)
      return res.status(200).json({
        message: 'success',
        token
      })
    }).catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).json({
          message: err.message
        })
      } else {
        sendError(res, err)
      }
    })
}

exports.updateInfo = (req, res) => {
  User.findByIdAndUpdate(req.id, req.body)
    .then(user => {
      res.status(200).json({
        message: 'success'
      })
    }).catch(err => {
      sendError(res, err)
    })
}

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username
  }).then(user => {
    if (!user) {
      res.status(400).json({
        message: 'user does not exist'
      })
      return
    }

    if (req.body.password !== decrypt(user.password)) {
      res.status(400).json({
        message: 'incorrect password'
      })
      return
    }

    const token = signToken(user)

    res.cookie('devJobs', token)
    res.status(200).json({
      message: 'success',
      token,
      username: user.username
    })
  }).catch(err => {
    sendError(res, err)
  })
}

exports.checkToken = (req, res, next) => {
  const token = req.headers.token
  const decoded = verifyToken(token)
  if (!token || !decoded) {
    res.status(401).json({
      message: 'invalid token'
    })
    return
  }

  User.findOne({
    username: decoded.username
  }).then(user => {
    if (!user) {
      res.status(401).json({
        message: 'invalid token'
      })
      return
    }
    req.username = decoded.username
    req.id = decoded.id
    next()
  }).catch(err => {
    res.status(500).json({
      message: err.message
    })
  })
}

exports.sendMail = (req, res) => {
  const email = req.body.email
  if (!email) {
    res.status(400).json({
      message: 'email is required'
    })
    return
  }

  User.findOneAndUpdate({
    email
  }).then(user => {
    if (!user) {
      res.status(400).json({
        message: 'email does not exist'
      })
      return
    }

    const token = signToken(user)

    sentMailVerificationLink(user, token, req.body.url, (err, success) => {
      if (err) {
        sendError(res, err)
        return
      }
      res.status(200).json({ message: 'success' })
    })
  }).catch(err => {
    sendError(res, err)
  })
}
