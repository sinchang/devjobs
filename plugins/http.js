import * as axios from 'axios'
import Cookie from 'js-cookie'
import toast from '../plugins/toast'

const client = axios.create()

const Http = function (options) {
  const cookie = Cookie.getJSON('devJobs')
  client.defaults.headers.common['token'] = cookie.token

  const onSuccess = response => {
    return response.data
  }

  const onError = error => {
    toast({
      message: error.response.data.message,
      position: 'top',
      timeout: 2000,
      type: 'error'
    })
    return Promise.reject(error.response || error.message)
  }

  return client(options)
    .then(onSuccess)
    .catch(onError)
}

export const login = data => {
  return Http({
    method: 'POST',
    url: '/api/user/login',
    data
  })
}

export const register = data => {
  return Http({
    method: 'POST',
    url: '/api/user/register',
    data
  })
}

export const sendMail = data => {
  return Http({
    method: 'POST',
    url: '/api/user/mail',
    data
  })
}
