const multer = require('multer');
const path = require('path');
 
// 1️⃣ mc : Choose where to store files and how to name them   <<<<<<<<<<<<<<<<<<<<<<

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images will be saved
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

// 2️⃣ mc : Optional: filter file types <<<<<<<<<<<<<<<<<<<<<<

const fileFilter = (req, file, cb) => {

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
  }
};

// 3️⃣ mc : Create upload instance <<<<<<<<<<<<<<<<<<<<<<

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  
  fileFilter
});

module.exports = { upload };
