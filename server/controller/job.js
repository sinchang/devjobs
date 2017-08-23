'use strict'
const Job = require('../model/job')
const { sendError } = require('../common/errorHandler')

exports.create = (req, res) => {
  const job = new Job({
    title: req.body.title,
    author: req.id
  })

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
      const ret = []
      jobs.forEach(job => {
        ret.push({
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          title: job.title,
          author: job.author.username
        })
      })
      res.status(200).json({
        message: 'success',
        job: ret
      })
    }).catch(err => {
      sendError(res, err)
    })
}
