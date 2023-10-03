const multer = require('multer');
const path = require('path');

// Define the destination folder where uploaded files will be stored.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder path here.
    // For example, to restrict uploads to a folder named "uploads":
    cb(null, path.join(__dirname, 'uploads')); //  folder name
  },
  filename: (req, file, cb) => {
    // You can also define the filename logic here if needed.
    // For example, to keep the original filename:
    cb(null, file.originalname);
  },
});

// Create a multer middleware instance with the configured storage.
const upload = multer({ storage });

module.exports = upload;
