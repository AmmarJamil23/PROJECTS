const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getProjectActivity } = require("../controllers/activityController");

const router = express.Router({ mergeParams: true });

router.get("/", protect, getProjectActivity);

module.exports = router;