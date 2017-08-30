'use strict'
exports.sendError = (res, err, msg) => {
  return res.status(500).json({ message: msg ? msg : err.message })
}
