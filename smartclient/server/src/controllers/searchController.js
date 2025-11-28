const Project = require("../models/Project");
const Task = require("../models/Task");
const Comment = require("../models/Comment");
const ProjectModel = require("../models/Project");
const { hasProjectAccess } = require("../utils/permissions");


exports.globalSearch = async (req, res, next) => {
    try {
        const q = req.query.q;
        if (!q) {
            return res.json({ success: true, result: [] });
        }

            //1) FETCH ALL PROJECTS USER CAN ACCESS
            const accessibleProjects = await ProjectModel.find({
                $or: [
                    { owner: req.user._id },
                    { members: req.user._id }

                ],
            }).select("_id");

            const projectIds = accessibleProjects.map((p) => p._id);

            //SEARCH PROJECTS
            const projects = await Project.find({
                _id: { $in: projectIds },
                $text: { $search: q },
            }).select("name description createdAt");

            //SEARCH TASKS
            const tasks = await Task.find({
                project: { $in: projectIds },
                $text: { $search: q },
            }).select("title description status project createdAt");
        

    } catch (err){
        next(err);
    }
}