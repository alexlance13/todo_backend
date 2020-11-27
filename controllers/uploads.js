const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else cb(null, false);
};

const limits = { fileSize: 5200000 };

const upload = multer({ storage, limits, fileFilter });

const uploadOne = upload.single('image');

const uploadImage = async (req, res, next) => {
  req.session.imageName = req.file ? req.file.filename : null;
  next();
};

module.exports = {
  uploadImage,
  uploadOne,
};
