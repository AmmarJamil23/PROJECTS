const User = require("../models/User");
const AppError = require("../utils/appError");


//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json({ success: true, users});

    } catch (err) {
        next (err);
    }
};


//SEARCH USERS
exports.searchUsers = async (req, res, next) => {
    try {
        const q = req.query.q || "";
        const users = await User.find({
            $or: [
                { name: new RegExp(q, "i") },
                { email: new RegExp(q, "i") }
            ]
        }).select("-password");

        res.json({ success: true, users});

    } catch (err) {
        next(err);
    }
}


//FREEZE ACCOUNT
exports.freezeUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true }
        ).select("-password");

        res.json({ success: true, user});

    } catch (err) {
        next(err);
    }
}


//UNFREEZE ACCOUNT
exports.unfreezeUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true }
        ).select("-password");

        res.json({ success: true, user});

    } catch (err) {
        next(err);
    }
};


//SOFT DELETE USER
exports.softDeleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { isActive: false, email: `deleted_${Date.now()}@removed.com`},
            { new: true }
        ).select("-password");

        res.json({ success: true, message: "User deactivated", user});

    } catch (err) {
        next(err);
    }
}
