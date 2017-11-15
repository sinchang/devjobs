const qn = require('qn')
const multer = require('multer')
const bytes = require('bytes')

exports.upload = (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: bytes('2MB') // 限制文件在2MB以内
    },
    fileFilter: function (req, files, callback) {
      // 只允许上传jpg|png|jpeg|gif格式的文件
      var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
      var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
      callback(null, !!fileTypeValid)
    }
  })

  const client = qn.create({
    accessKey: process.env.QINIU_AK,
    secretKey: process.env.QINIU_SK,
    bucket: 'memento',
    origin: '7xnrti.com1.z0.glb.clouddn.com'
  })

  upload.single('image')(req, res, function (err) {
    if (err) {
      return console.error(err)
    }
    if (req.file && req.file.buffer) {
      // 上传到七牛
      client.upload(req.file.buffer, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: 'upload fail'
          })
        }
        res.status(200).json({
          message: 'upload success',
          data: result
        })
      })
    }
  })
}
