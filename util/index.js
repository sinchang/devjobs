'use strict'
exports.isEmail = email => {
  /* eslint-disable */
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

exports.isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
