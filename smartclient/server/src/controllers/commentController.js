const Comment = require("../models/Comment");
const Task = require("../models/Task");
const AppError = require("../utils/appError");

//VERIFY THAT THE TASK BELONGS TO THE USER [INDIRECT CHECK VIA PROJECT]
const verifyTaskOwner = async (taskId, userId) => {
    const task = await Task.findOne({ _id: taskId, owner: userId});
    return task;
}

//CREATE COMMENT
exports.createComment = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { text } =req.body;

        const task = await verifyTaskOwner(taskId, req.user._id);

        if(!task) {
            return next(new AppError("Task not found", 404));
        }

        const comment = await Comment.create({
            text,
            task: taskId,
            user: req.user._id,
        });

        res.status(201).json({ success: true, comment});

    } catch (err) {
        next(err);
    }
};

//GET COMMENTS FOR A TASK
exports.getComments = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await verifyTaskOwner(taskId, req.user._id);

        if(!task) {
            return next(new AppError("Task not found", 404));
        }

        const comments = await Comment.find({ task: taskId }).populate("user", "name email");

        res.json({ success: true, comments});

    } catch (err) {
        next(err);
    }
}

//DELETE COMMENT (ONLY OWNER CAN DELETE)
exports.deleteComment = async (req, res, next) => {
    try {
        const { commentId, taskId } = req.params;
        const task = await verifyTaskOwner(taskId, req.user._id);

        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        const comment = await Comment.findOneAndDelete({
            _id: commentId,
            user: req.user._id,
            task: taskId,
        });

        if (!comment) {
            return next(new AppError("Comment not found or unauthorized", 404));
        }

        res.json({ success: true, message: "Comment deleted"})

    } catch (err) {
        next(err);
    }
}