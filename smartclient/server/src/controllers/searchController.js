const Project = require("../models/Project");
const Task = require("../models/Task");
const Comment = require("../models/Comment");
const { hasProjectAccess } = require("../utils/permissions");


exports.globalSearch = async (req, res, next) => {
    try {
        const q = req.query.q;
        if (!q) {
            return res.json({ success: true, results: [] });
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Accessible projects (owner or member)
        const accessibleProjects = await Project.find({
            $or: [
                { owner: req.user._id },
                { members: req.user._id }
            ],
        }).select("_id");

        const projectIds = accessibleProjects.map((p) => p._id);

        const projects = await Project.find({
            _id: { $in: projectIds },
            $text: { $search: q },
        })
            .skip(skip)
            .limit(limit)
            .select("name description createdAt");

        
        const tasks = await Task.find({
            project: { $in: projectIds },
            $text: { $search: q },
        })
            .skip(skip)
            .limit(limit)
            .select("title description status project createdAt");

        const accessibleTasks = await Task.find({
            project: { $in: projectIds },
        }).select("_id");

        const taskIds = accessibleTasks.map((t) => t._id);

        const comments = await Comment.find({
            task: { $in: taskIds },
            $text: { $search: q },
        })
            .skip(skip)
            .limit(limit)
            .populate("task", "title project")
            .populate("user", "name email");

        res.json({
            success: true,
            query: q,
            pagination: {
                page,
                limit,
                skip,
            },
            results: {
                projects,
                tasks,
                comments,
            },
        });

    } catch (err) {
        next(err);
    }
};
