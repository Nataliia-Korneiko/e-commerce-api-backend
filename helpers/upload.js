const multer = require('multer');
const shortid = require('shortid');
const { fileSizeLimit } = require('../config/rate-limit.json');
require('dotenv').config();

const FILE_TYPE_MAP = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = shortid();
    const extension = FILE_TYPE_MAP[file.mimetype];

    cb(null, `product-${fileName}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
});

module.exports = upload;
