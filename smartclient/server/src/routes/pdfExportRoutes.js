const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { exportProjectPDF } = require("../controllers/pdfExportController");

const router = express.Router({ mergeParams: true });

router.get("/", protect, exportProjectPDF);

module.exports = router;