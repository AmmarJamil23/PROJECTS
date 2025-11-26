const ActivityLog = require("../models/ActivityLog");
const Project = require("../models/Project");
const AppError = require("../utils/appError");
const { hasProjectAccess } = require("../utils/permissions");

exports.getProjectActivity = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized: no access to this project", 403));
        }

        const logs = await ActivityLog.find({ targetId: projectId })
        .populate("user", "name email")
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            total: logs.length,
            activity: logs,
        });

    } catch (err) {
        next(err);
    }
}