import multer from 'multer';
import path from 'path';
import crypto from 'crypto'

// Disk storage configuration
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './public/images'); // make sure this folder exists
  // },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {
      if (err) return cb(err);

      const fn = name.toString('hex') + path.extname(file.originalname);
      cb(null, fn);
    });
  }
});

const upload = multer({ storage: storage });

export default upload
