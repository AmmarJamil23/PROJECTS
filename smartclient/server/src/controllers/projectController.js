const Project = require("../models/Project");
const AppError = require("../utils/appError");

//CREATE
exports.createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const project = await Project.create({
            name,
            description,
            owner: req.user._id,
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
        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!project){
            return next(new AppError("Project not found", 404));
        }
        res.json({ success: true, project});

    }
     catch (err) {
        next(err);
     }
}

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

        res.json({ success: true, message: "Project deleted"});

    } catch (err){
        next(err);
    }
}
