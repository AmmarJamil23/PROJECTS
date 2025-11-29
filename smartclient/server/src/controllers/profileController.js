const User = require("../models/User");
const AppError = require("../utils/appError");

//UPDATE NAME
exports.updateProfile = async (req, res, next) => {
    try {
        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name },
            { new: true, runValidators: true }
        ).select("-password");

        res.json({success: true, user });

    } catch (err) {
        next(err);
    }
};

//UPDATE EMAIL
exports.updateEmal = async (req, res, next) => {
    try {
        const { email } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return next(new AppError("Email already in use", 400));
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { email },
            { new: true, runValidators: true }
        ).select("-password");

        res.json({ success: true, user});

    } catch (err) {
        next(err);
    }
}