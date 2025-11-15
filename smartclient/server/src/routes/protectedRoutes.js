const express = require("express");
const {protect, restrictTo } = require("../middleware/authMiddleware");
const AppError = require("../utils/appError");

const router = express.Router();


router.get("/test-error", (req, res, next) => {
    return next(new AppError("This is a test error", 400));
});


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