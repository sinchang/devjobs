'use strict'
const { isEmail, isEmptyObject } = require('../../util')
const User = require('../model/user')
const jobController = require('../controller/job')
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
  const user = new User(validateUser(req, res, true))
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
  const user = validateUser(req, res, false)
  if (isEmptyObject(user)) {
    return res.status(400).json({
      message: 'username can not update'
    })
  }
  User.findOneAndUpdate({ username: req.params.username }, user)
    .then(user => {
      if (!user) {
        return res.status(400).json({
          message: 'user does not exist'
        })
      }
      res.status(200).json({
        message: 'success'
      })
    }).catch(err => {
      sendError(res, err)
    })
}

exports.login = (req, res) => {
  const username = req.body.username.trim()
  const password = req.body.password.trim()

  if (!username || password.length <= 6) {
    res.status(400).json({
      message: 'username and password is required'
    })
    return
  }

  User.findOne({
    username
  }).then(user => {
    if (!user) {
      res.status(400).json({
        message: 'user does not exist'
      })
      return
    }

    if (password !== decrypt(user.password)) {
      res.status(400).json({
        message: 'incorrect password'
      })
      return
    }

    const token = signToken(user)

    res.cookie('devJobs', JSON.stringify({ token, username, isAdmin: user.role === 'admin' }), { expires: new Date(Date.now() + 360000 * 24 * 7) })
    res.status(200).json({
      message: 'success',
      token,
      username
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

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      res.status(400).json({
        message: 'email does not exist'
      })
      return
    }

    const token = signToken(user)

    sentMailVerificationLink(user, token, function (err, success) {
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

exports.getUserInfo = (req, res) => {
  const username = req.params.username
  const token = req.headers.token
  const decoded = verifyToken(token)
  req.username = username
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          message: 'user don\'t exist'
        })
      }
      req.id = user._id
      jobController.getUserJobs(req, res, (jobs) => {
        if (!jobs) {
          return res.status(400).json({
            message: 'find jobs catch error'
          })
        }
        const ret = {
          username: user.username,
          email: user.email,
          jobs: jobs,
          message: 'success'
        }
        if (username === decoded.username) {
          ret.isAuthor = true
        }
        res.status(200).json(ret)
      })
    }).catch(err => {
      sendError(res, err)
    })
}

function validateUser (req, res, hasUsername) {
  const pw = req.body.password
  const repassword = req.body.repassword
  const username = req.body.username
  const email = req.body.email

  if (pw && pw.length <= 6) {
    return res.status(400).json({
      message: 'The password length must be greater than 6'
    })
  }

  if (pw && pw !== repassword) {
    return res.status(400).json({
      message: 'The two passwords are not equal'
    })
  }

  if (email && !isEmail(email)) {
    return res.status(400).json({
      message: 'Incorrect email'
    })
  }

  const password = pw && encrypt(pw)
  const user = {}
  if (pw) user.password = password
  if (email) user.email = email
  if (hasUsername) user.username = username
  return user
}
