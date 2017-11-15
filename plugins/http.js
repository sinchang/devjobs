import * as axios from 'axios'
import Cookie from 'js-cookie'
import toast from '../plugins/toast'

const client = axios.create()

const Http = function (options) {
  const cookie = Cookie.getJSON('devJobs')
  if (cookie) client.defaults.headers.common['token'] = cookie.token

  const onSuccess = response => {
    return response.data
  }

  const onError = error => {
    if (error.response) {
      toast({
        message: error.response.data.message,
        position: 'top',
        timeout: 2000,
        type: 'error'
      })
    }
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

export const upload = data => {
  return Http({
    method: 'POST',
    url: '/api/upload',
    data
  })
}

export const publishJob = data => {
  return Http({
    method: 'POST',
    url: '/api/jobs',
    data
  })
}

export const getJobs = (curPage, limit) => {
  return Http({
    method: 'GET',
    url: `/api/jobs?curPage=${curPage}&limit=${limit}`
  })
}

export const getOneJob = id => {
  return Http({
    method: 'GET',
    url: `/api/jobs/${id}`
  })
}

export const closeOneJob = data => {
  return Http({
    method: 'PATCH',
    url: `/api/jobs`,
    data
  })
}

export const getUserInfo = username => {
  return Http({
    method: 'GET',
    url: `/api/user/${username}`
  })
}

export const updateUserInfo = (username, data) => {
  return Http({
    method: 'PUT',
    url: `/api/user/${username}`,
    data
  })
}

export const submitComment = data => {
  return Http({
    method: 'POST',
    url: `/api/jobs/comment`,
    data
  })
}
