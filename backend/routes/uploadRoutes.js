var path = require('path')
var express = require('express')
var multer = require('multer')

const router = express.Router()

const d = new Date();
let day = d.getDate();
let month = d.getMonth();
let year = d.getFullYear()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'frontend/public/images/products')
  },
  filename(req, file, cb) {
    console.log(file);
    cb(
      null,
      `${file.fieldname}-${file.originalname.slice(0, file.originalname.length - 4)}-${day}${month + 1}${year}${file.originalname.slice(file.originalname.length - 4)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)


  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('PRD'), (req, res) => {
  res.send(`${req.file.path.replace(/\\/g, "/").replace("public", "").replace("frontend", "").substring(1)}`)
})

module.exports = router
