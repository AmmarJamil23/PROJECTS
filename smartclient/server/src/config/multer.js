const multer = require("multer");
const path = require("path");

// Storage settings
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});

// basic file filter
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

module.exports = multer({ storage, fileFilter});