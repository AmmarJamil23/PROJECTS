const Project = require("../models/Project");
const AppError = require("../utils/appError");
const logActivity = require("../utils/logActivity");

//CREATE
exports.createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            owner: req.user._id,
        });

        await logActivity({
            req,
            userId: req.user._id,
            action: "PROJECT CREATED",
            targetType: "project",
            targetId: project._id,
            metadata: { name: project.name},
        });
        res.status(201).json({ success: true, project });

    } catch (err) {
        next(err);
    }
};

//GET ALL (only ones owned by user)
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ owner: req.user._id});
        res.json({ success: true, projects });

    } catch (err) {
        next(err);
    }
};

//GET ONE PROJECT
exports.getProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized: no access to this project", 403));
        }

        res.json({ success: true, project });

    } catch (err) {
        next(err);
    }
};


//UPDATE
exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!project){
            return next(new AppError("Project not found", 404));
        }

        await logActivity({
            req,
            userId: req.user._id,
            action: "PROJECT UPDATED",
            targetType: "project",
            targetId: project._id,
            metadata: { status: project.status },
        })
        res.json({ success: true, project});

    } catch(err){
        next(err);
    }
};

//DELETE

exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!project){
            return next(new AppError("Project not found", 404));
        }

        await logActivity({
            req,
            userId: req.user._id,
            action: "PROJECT DELETED",
            targetType: "project",
            targetId: project._id,
            metadata: { name: project.name },
        })

        res.json({ success: true, message: "Project deleted"});

    } catch (err){
        next(err);
    }
}
