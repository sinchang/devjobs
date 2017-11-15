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
  'iOS',
  'PHP',
  'C, C++ and C#',
  'Go',
  'Android',
  'Devops'
]
exports.create = (req, res) => {
  req.body.author = req.id
  const jobId = req.body.id
  const job = new Job(req.body)

  if (jobId) {
    Job.findOneAndUpdate({ _id: jobId, author: req.id }, req.body)
      .then(job => {
        if (!job) {
          return res.status(400).json({
            message: 'The job information doesn\'t exist or you don\'t have access'
          })
        }
        res.status(200).json({
          message: 'success'
        })
      }).catch(err => {
        sendError(res, err)
      })
    return
  }

  job.save()
    .then(user => {
      res.status(200).json({
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

exports.createComment = (req, res) => {
  const jobId = req.body.id
  const content = req.body.content
  // const contentMd = req.body.contentMd
  if (!content) {
    return res.status(400).json({
      message: 'content params is required'
    })
  }
  const comment = {
    author: req.username,
    content: req.body.content,
    // contentMd: req.body.contentMd,
    createdAt: new Date()
  }
  Job.findOneAndUpdate({ _id: jobId }, { $push: { comment } })
    .then(job => {
      // console.log(job)
      if (!job) {
        return res.status(400).json({
          message: 'The job information doesn\'t exist or you don\'t have access'
        })
      }
      res.status(200).json({
        message: 'success'
      })
    }).catch(err => {
      sendError(res, err)
    })
}

exports.getUserJobs = (req, res, cb) => {
  Job.find({
    author: req.id
  }).populate('author', 'username')
    .exec()
    .then(jobs => {
      cb && cb(formatJobs(req, jobs))
    }).catch(err => {
      cb && cb()
      console.log(err)
    })
}

exports.getJobs = (req, res) => {
  const curPage = parseInt(req.query.curPage, 10) < 1 || !req.query.curPage ? 0 : req.query.curPage - 1
  const limit = req.query.limit || 10
  Job.find({ isActive: true })
    .populate('author', 'username')
    .limit(limit)
    .skip(curPage * limit)
    .sort({
      createdAt: -1
    })
    .exec()
    .then(jobs => {
      Job.count().exec()
        .then(count => {
          jobs = formatJobs(req, jobs)
          res.status(200).json({
            message: 'success',
            curPage: curPage,
            limit: limit,
            data: jobs,
            hasNextPage: count > (curPage + 1) * limit
          })
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

exports.close = (req, res) => {
  console.log(req.body.id, req.body.isActive)
  Job.findOneAndUpdate({ _id: req.body.id, author: req.id }, { isActive: req.body.isActive })
    .then(job => {
      console.log(job)
      if (!job) {
        return res.status(400).json({
          message: 'The job information doesn\'t exist or you don\'t have access'
        })
      }
      res.status(200).json({
        message: 'success'
      })
    }).catch(err => {
      sendError(err)
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
