const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const uploadController = require("../controllers/upload.controller") ;

router.post("/", upload.single("pdf") ,uploadController.uploadPdf);

module.exports = router;