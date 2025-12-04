const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    archiveProject,
    unarchiveProject,
} = require("../controllers/projectArchiveController");

const router = express.Router({ mergeParams: true});

router.patch("/archive", protect, archiveProject);

router.patch("unarchive", protect, unarchiveProject);

module.exports = router;