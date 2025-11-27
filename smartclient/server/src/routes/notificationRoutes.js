const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Notification = require("../models/Notifications");

const router = express.Router();

//GET ALL NOTIFICATIONS FOR LOGGED-IN USERS
router.get("/", protect, async (req, res) => {
    const notifs = await Notification.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.json({ success: true, notifications: notifs });
});


//MARK AS READ
router.post("/:id/read", protect, async (req, res) => {
    await Notification.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { isRead: true }
    );

    res.json({ success: true });
});

module.exports = router;