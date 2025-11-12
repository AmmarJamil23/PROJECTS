const express = require("express");
const {protect, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "Access granted",
        user: req.user,
    });
});

router.get("/admin", protect, restrictTo("admin"), (req, res) => {
    res.json({
        success: true,
        message: "Welcome, admin!",
        user: req.user,
    });
});

module.exports = router;