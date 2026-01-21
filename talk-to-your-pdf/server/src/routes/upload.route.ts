const express = require("express");
const { uploadPdf } = require("../controllers/upload.controller");

const router = express.Router();

router.post("/", uploadPdf);

module.exports = router;
