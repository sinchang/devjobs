import axios from 'axios'
const User = require('../model/user')
const {
  signToken
} = require('../common/crypto')
export const goGithub = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CI}`
  res.redirect(url)
}

export const callback = async (req, res) => {
  const code = req.query.code
  let at = ''
  try {
    const ret = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CI,
      client_secret: process.env.GITHUB_CS,
      code,
      accept: 'json'
    })
    at = ret.data.split('&')[0].split('=')[1]
  } catch (err) {
    console.log(err)
  }

  try {
    const {
      data
    } = await axios.get(`https://api.github.com/user?access_token=${at}`)
    req.body.email = data.email
    req.body.username = data.login
    req.body.githubId = data.id
    const newUser = new User(req.body)

    try {
      User.findOne({
        githubId: data.id
      }).then(user => {
        console.log(user)
        githubLogin(res, user)
      })
    } catch (err) {
      newUser.save().then(user => {
        githubLogin(res, user)
      }).catch(err => {
        console.log(err)
        req.body.username = req.body.email
        const newUser = new User(req.body)
        newUser.save().then(user => {
          githubLogin(res, user)
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}

function githubLogin (res, user) {
  const token = signToken(user)
  res.cookie('devJobs', JSON.stringify({
    token,
    username: user.username,
    isAdmin: user.role === 'admin'
  }), {
    expires: new Date(Date.now() + 360000 * 24 * 7)
  })
  res.redirect(process.env.HOST + process.env.PORT)
}
