const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Project = require("../models/Project");
const AppError = require("../utils/appError");

const { hasProjectAccess, isOwner } = require("../utils/permissions");

// CREATE COMMENT
exports.createComment = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { text } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized: no access to this project", 403));
        }

        const comment = await Comment.create({
            text,
            task: taskId,
            user: req.user._id,
        });

        res.status(201).json({ success: true, comment });

    } catch (err) {
        next(err);
    }
};

// GET COMMENTS
exports.getComments = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);
        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized: no access to this project", 403));
        }

        const comments = await Comment.find({ task: taskId }).populate("user", "name email");

        res.json({ success: true, comments });

    } catch (err) {
        next(err);
    }
};

// DELETE COMMENT (COMMENT OWNER OR PROJECT OWNER ONLY)
exports.deleteComment = async (req, res, next) => {
    try {
        const { commentId, taskId } = req.params;

        const task = await Task.findById(taskId);
        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized: no access to this project", 403));
        }

        const comment = await Comment.findOne({
            _id: commentId,
            task: taskId,
        });

        if (!comment) {
            return next(new AppError("Comment not found", 404));
        }

        const isCommentOwner = comment.user.toString() === req.user._id.toString();

        if (!isCommentOwner && !isOwner(project, req.user._id)) {
            return next(new AppError("Not allowed to delete this comment", 403));
        }

        await Comment.findByIdAndDelete(commentId);

        res.json({ success: true, message: "Comment deleted" });

    } catch (err) {
        next(err);
    }
};


/*
The Comment Controller manages all the comments that users add on tasks, and it makes sure that only authorised people interact with them. Before creating, reading, or deleting a comment, the controller first loads the task by its ID. After that, it checks the project connected to that task and verifies access through the hasProjectAccess function, so both the project owner and project members can work with comments. When a user creates a comment, the system saves the comment with the task ID and the user who wrote it. For deleting comments, the controller applies a strict rule: only the person who wrote the comment or the project owner is allowed to delete it. This way, normal members can manage their own comments, but only the owner has full control. Overall, the controller keeps everything secure and organised by making sure comments stay tied to the right project and only the right users can manage them.
*/ 