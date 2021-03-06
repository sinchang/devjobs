const user = require('../controller/user')
const job = require('../controller/job')
const { upload } = require('../controller/qiniu')
const router = require('express').Router()

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.put('/user/:username', user.checkToken, user.updateInfo)
router.get('/user/:username', user.getUserInfo)
router.post('/user/mail', user.sendMail)

router.post('/jobs', user.checkToken, job.create)
router.patch('/jobs', user.checkToken, job.close)
router.get('/jobs/:id', job.getOneJobs)
router.get('/jobs', job.getJobs)
router.post('/jobs/comment', user.checkToken, job.createComment)

router.post('/upload', user.checkToken, upload)

module.exports = router
