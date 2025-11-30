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
exports.updateEmail = async (req, res, next) => {
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

//UPDATE PASSWORD
exports.updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id).select("+password");

        const match = await user.matchPassword(oldPassword);
        if (!match) {
            return next(new AppError("Old password incorrect", 401));
        }

        user.password = newPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully"});

    } catch (err) {
        next(err);
    }
}

//UPDATE AVATAR
exports.updateAvatar = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: req.file.filename },
            { new: true }
        ).select("-password");

        res.json({ success: true, user});

    } catch (err) {
        next(err);
    }
}