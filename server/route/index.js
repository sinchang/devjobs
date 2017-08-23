const user = require('../controller/user')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.post('/user/updateInfo', user.updateInfo)

module.exports = router
