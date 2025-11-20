const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const { 
    uploadFile ,
    getFiles,
    deleteFile,
} = require("../controllers/fileController");

const router = express.Router({ mergeParams: true});

//UPLOAD
router.post("/", protect, upload.single
    ("file"), uploadFile);

//LIST FILES
router.get("/", protect, getFiles);

//DELETE
router.delete("/:fileId", protect, deleteFile);

module.exports = router;
