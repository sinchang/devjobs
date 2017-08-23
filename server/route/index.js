const user = require('../controller/user')
const job = require('../controller/job')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.put('/user/info', user.checkToken, user.updateInfo)
router.get('/user/jobs', job.getUserJobs)

router.post('/mail', user.sendMail)

router.post('/jobs', user.checkToken, job.create)

module.exports = router
