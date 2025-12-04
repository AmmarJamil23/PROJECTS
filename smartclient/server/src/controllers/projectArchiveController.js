const Project = require("../models/Project");
const AppError = require("../utils/appError");
const { isOwner } = require("../utils/permissions");


exports.archiveProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!isOwner(project, req.user._id)) {
            return next(new AppError("Only project owner can archive", 403));
        }

        project.isArchived = true;
        await project.save();

        res.json({ success: true, message: "Project archived", project });

    } catch (err) {
        next(err);
    }
};


exports.unarchiveProject = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!isOwner(project, req.user._id)) {
            return next(new AppError("Only project owner can unarchive", 403));
        }

        project.isArchived = false;
        await project.save();

        res.json({ success: true, message: "Project restored", project});

    } catch (err) {
        next(err);
    }
}