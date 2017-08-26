import axios from 'axios'
const { register, login } = require('./user')
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
    console.log(at)
    const { data } = await axios.get(`https://api.github.com/user?access_token=${at}`)
    // console.log(ret.data)
    req.body.email = data.email
    req.body.username = data.login
    req.body.password = data.login + data.id + '000751'
    req.body.repassword = data.login + data.id + '000751'
    await register(req, res)
    await login(req, res)
  } catch (err) {
    console.log(err)
  }
}
