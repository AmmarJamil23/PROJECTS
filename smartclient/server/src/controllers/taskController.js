const Task = require("../models/Task.js");
const Project = require("../models/Project.js");
const AppError = require("../utils/appError.js");

const verifyProjectOwner = async (projectId, userId) => {
    return await Project.findOne({ _id: projectId, owner: userId });
};

// CREATE TASK
exports.createTask = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            owner: req.user._id,
        });

        res.status(201).json({ success: true, task });
    } catch (err) {
        next(err);
    }
};

// GET ALL TASKS FOR ONE PROJECT
exports.getTasks = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const tasks = await Task.find({ project: projectId });

        res.json({ success: true, tasks });
    } catch (err) {
        next(err);
    }
};

// UPDATE TASK
exports.updateTask = async (req, res, next) => {
    try {
        const { taskId, projectId } = req.params;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const task = await Task.findOneAndUpdate(
            { _id: taskId, owner: req.user._id, project: projectId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        res.json({ success: true, task });
    } catch (err) {
        next(err);
    }
};

// DELETE TASK
exports.deleteTask = async (req, res, next) => {
    try {
        const { taskId, projectId } = req.params;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const task = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user._id,
            project: projectId,
        });

        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        res.json({ success: true, message: "Task deleted" });
    } catch (err) {
        next(err);
    }
};
