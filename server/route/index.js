const user = require('../controller/user')
const job = require('../controller/job')
const { upload } = require('../controller/qiniu')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.put('/user/info', user.checkToken, user.updateInfo)
router.get('/user/jobs', user.checkToken, job.getUserJobs)
router.post('/user/mail', user.sendMail)

router.post('/jobs', user.checkToken, job.create)
router.get('/jobs', job.getJobs)

router.post('/upload', user.checkToken, upload)

module.exports = router
