const ActivityLog = require("../models/ActivityLog");
const Project = require("../models/Project");
const AppError = require("../utils/appError");
const { hasProjectAccess } = require("../utils/permissions");
const paginate = require("../utils/paginate");


exports.getProjectActivity = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return next(new AppError("Project not found", 404));
    if (!hasProjectAccess(project, req.user._id))
      return next(new AppError("Unauthorized", 403));

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await paginate(
      ActivityLog,
      { targetId: projectId },
      page,
      limit,
      { path: "user", select: "name email" },
      { createdAt: -1 }
    );

    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};