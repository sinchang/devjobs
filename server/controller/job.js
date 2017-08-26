'use strict'
const Job = require('../model/job')
const {
  sendError
} = require('../common/errorHandler')

exports.create = (req, res) => {
  req.body.author = req.id
  const job = new Job(req.body)

  job.save()
    .then(user => {
      return res.status(200).json({
        message: 'success'
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

exports.getUserJobs = (req, res) => {
  Job.find({
    author: req.id
  }).populate('author', 'username')
    .exec()
    .then(jobs => {
      res.status(200).json({
        message: 'success',
        data: jobs
      })
    }).catch(err => {
      sendError(res, err)
    })
}

exports.getJobs = (req, res) => {
  const curPage = parseInt(req.query.curPage, 10) < 1 ? 0 : req.query.curPage - 1
  const limit = req.query.limit || 10

  Job.find({})
    .populate('author', 'username')
    .limit(limit)
    .skip(curPage * limit)
    .sort({
      createdAt: -1
    })
    .exec()
    .then(jobs => {
      res.status(200).json({
        message: 'success',
        data: jobs
      })
    }).catch(err => {
      sendError(res, err)
    })
}
