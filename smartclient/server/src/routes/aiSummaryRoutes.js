const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { generateProjectSummary } = require("../controllers/aiSummaryController");

const router = express.Router({ mergeParams: true });

router.post("/", protect, generateProjectSummary);

module.exports = router;
