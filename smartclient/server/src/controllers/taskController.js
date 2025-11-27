const Task = require("../models/Task.js");
const Project = require("../models/Project.js");
const AppError = require("../utils/appError.js");
const createNotification = require("../utils/createNotification.js");
const { hasProjectAccess, isOwner } = require("../utils/permissions");


exports.createTask = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("You do not have access to this project", 403));
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            owner: req.user._id,
        });

        const usersSet = new Set([
            ...project.members.map(id => id.toString()),
            project.owner.toString()
        ]);
        const users = Array.from(usersSet);

        try {
            await createNotification({
                users,
                title: "New Task Added",
                message: `${req.user.name} added a new task: "${title}"`,
                project: projectId,
            });
        } catch (notifErr) {
            console.error("Failed to create notifications:", notifErr);
        }

        res.status(201).json({ success: true, task });
    } catch (err) {
        next(err);
    }
};



exports.getTasks = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("You do not have access to this project", 403));
        }

        const tasks = await Task.find({ project: projectId });

        res.json({ success: true, tasks });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { taskId, projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("You do not have access to this project", 403));
        }

     

        const task = await Task.findOneAndUpdate(
            { _id: taskId, project: projectId },
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

exports.deleteTask = async (req, res, next) => {
    try {
        const { taskId, projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("You do not have access to this project", 403));
        }

        if (!isOwner(project, req.user._id)) {
            return next(new AppError("Only owner can delete tasks", 403));
        }

        const task = await Task.findOneAndDelete({
            _id: taskId,
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



/*
The Task Controller is responsible for handling all the tasks inside a project, while also making sure that only authorised people can use these features. Before doing anything—whether it is creating a task, getting all tasks, updating a task, or deleting a task—the controller first loads the project using the project ID. Then it checks if the logged-in user has permission through the hasProjectAccess function, which allows both the project owner and the project members. When a new task is created, it is linked with the project and saved with the current user as the task owner. When tasks are fetched, it simply returns all the tasks of that project. For updating and deleting tasks, the same access check is applied, but deleting a task is only allowed for the project owner using the isOwner function. In this way, the controller keeps the system secure: the owner gets full control, and members can still work on tasks without crossing any limits.

*/