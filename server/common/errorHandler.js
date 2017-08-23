'use strict'
exports.sendError = (res, err, msg) => {
  res.status(500).json({ message: msg ? msg : err.message })
}
