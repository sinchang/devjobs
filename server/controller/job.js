'use strict'
const { verifyToken } = require('../common/crypto.js')
const Job = require('../model/job')
const {
  sendError
} = require('../common/errorHandler')
const type = ['全职', '兼职', '远程']
const language = [
  'HTML/CSS/JS',
  'Nodejs',
  'Python',
  'Ruby',
  'Java',
  'Objective-C/Swift',
  'PHP',
  'C, C++ and C#',
  'Go',
  'Lua',
  'SQL'
]
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
      jobs = formatJobs(req, jobs)
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
      jobs = formatJobs(req, jobs)
      res.status(200).json({
        message: 'success',
        data: jobs
      })
    }).catch(err => {
      sendError(res, err)
    })
}

exports.getOneJobs = (req, res) => {
  const jobId = req.params.id
  Job.find({ _id: jobId })
    .populate('author', 'username')
    .exec()
    .then(jobs => {
      jobs = formatJobs(req, jobs)
      res.status(200).json({
        message: 'success',
        data: jobs.length ? jobs[0] : jobs
      })
    }).catch(err => {
      sendError(res, err)
    })
}

function formatJobs (req, jobs) {
  const token = req.headers.token
  const decoded = token && verifyToken(token)
  if (!jobs.length) return []
  return jobs.map(job => {
    job.type = type[job.type]
    if (token && job.author._id === parseInt(decoded.id)) {
      job.isAuthor = true
    }
    job.language = job.language.map(v => {
      return language[v]
    })
    return job
  })
}
