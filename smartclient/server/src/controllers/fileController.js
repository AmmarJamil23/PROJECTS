const File = require("../models/File");
const Project = require("../models/Project");
const AppError = require("../utils/appError");

const verifyProjectOwner = async (projectId, userId) => {
    const project = await Project.findOne({ _id: projectId, owner: userId});
    return project;
}

//UPLOAD
exports.uploadFile = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const file = await File.create({
            project: projectId,
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size,
            fileType: req.file.mimetype
        });

        res.status(201).json({ success: true, file});

    } catch (err) {
        next(err);
    }
};

//GET FILES
exports.getFiles = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        const files = await File.find({ project: projectId});
        res.json({ success: true, files});

    } catch (err){
        next(err);
    }
}

//DELETE FILE
exports.deleteFile = async (req, res, next) => {
    try {
        const {projectId, fileId } = req.params;

        const project = await verifyProjectOwner(projectId, req.user._id);
        if (!project){
            return next(new AppError("Project not found", 404));
        }

        const file = await File.findOneAndDelete({
            _id: fileId,
            user: req.user._id,
            project: projectId,
        });

        if (!file) {
            return next(new AppError("File not found", 404));
        }

        if (file.filePath) {
            fs.unlink(file.filePath, (err) => {
                if (err) {
                    console.error("Error deleting file from disk:", err.message);
                }
            });
        }

        res.json({ success: true, message: "File Deleted"});

    } catch (err){
        next(err);
    }
}