const qn = require('qn')
const multer = require('multer')
const bytes = require('bytes')

// const storage = multer.memoryStorage()
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: bytes('2MB') // 限制文件在2MB以内
//   },
//   fileFilter: function (req, files, callback) {
//     // 只允许上传jpg|png|jpeg|gif格式的文件
//     var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|'
//     var fileTypeValid = '|jpg|png|jpeg|gif|'.indexOf(type) !== -1
//     callback(null, !!fileTypeValid)
//   }
// })

// exports.upload = (req, res) => {
//   // const localFile = req.files
//   // console.log(localFile)
//   const mac = new qiniu.auth.digest.Mac(process.env.QINIU_AK, process.env.QINIU_SK)
//   const options = {
//     scope: 'memento'
//   }
//   const putPolicy = new qiniu.rs.PutPolicy(options)
//   const uploadToken = putPolicy.uploadToken(mac)
//   const config = new qiniu.conf.Config()
//   // 空间对应的机房
//   config.zone = qiniu.zone.Zone_z0
//   // 是否使用https域名
//   config.useHttpsDomain = true

//   const formUploader = new qiniu.form_up.FormUploader(config)
//   const putExtra = new qiniu.form_up.PutExtra()
//   // 文件上传
//   upload.single('image')(req, res, err => {
//     if (err) {
//       return console.error(err)
//     }
//     console.log(req.file)
//     if (req.file && req.file.buffer) {
//       formUploader.putFile(uploadToken, null, req.file.buffer, putExtra, (respErr, respBody, respInfo) => {
//         if (respErr) {
//           res.status(500).json(respErr)
//         }
//         if (respInfo.statusCode === 200) {
//           console.log(respBody)
//           res.status(200).json(respBody)
//         } else {
//           res.status(respInfo.statusCode).json(respBody)
//           console.log(respInfo.statusCode)
//           console.log(respBody)
//         }
//       })
//     }
//   })
// }

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
