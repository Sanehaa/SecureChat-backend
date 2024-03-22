const multer = require ('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadType = 'uploads/';

    if (file.fieldname === 'image') {
      uploadType += 'profile-pictures/';
    } else if (file.fieldname === 'screenshot') {
      uploadType += 'reportedscreenshots/';
    }

    cb(null, uploadType);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
