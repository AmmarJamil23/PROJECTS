const AIInteraction = require("../models/AIInteraction.js");
const Project = require("../models/Project.js");
const AppError = require("../utils/appError.js");

// ENSURE THE PROJECT BELONGS TO A USER
const verifyProjectOwner = async (projectId, userId) => {
    const project = await Project.findOne({ _id: projectId, owner: userId });
    return project;
};

exports.saveAIInteraction = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { type, prompt, response, metadata } = req.body;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const aiRecord = await AIInteraction.create({
            project: projectId,
            user: req.user._id,
            type: type || "custom",
            prompt,
            response,
            metadata: metadata || {},
        });

        res.status(201).json({ success: true, ai: aiRecord });
    } catch (err) {
        next(err);
    }
};

exports.getAIInteraction = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const logs = await AIInteraction.find({ project: projectId })
            .sort({ createdAt: -1 })
            .select("-__v");

        res.json({ success: true, items: logs });
    } catch (err) {
        next(err);
    }
};
