const fs = require("fs");
const File = require("../models/File");
const Project = require("../models/Project");
const AppError = require("../utils/appError");
const { hasProjectAccess, isOwner } = require("../utils/permissions");

exports.uploadFile = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) return next(new AppError("Project not found", 404));

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized", 403));
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

        res.status(201).json({ success: true, file });

    } catch (err) {
        next(err);
    }
};

exports.getFiles = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) return next(new AppError("Project not found", 404));

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized", 403));
        }

        const files = await File.find({ project: projectId });

        res.json({ success: true, files });

    } catch (err) {
        next(err);
    }
};

exports.deleteFile = async (req, res, next) => {
    try {
        const { projectId, fileId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) return next(new AppError("Project not found", 404));

        if (!hasProjectAccess(project, req.user._id)) {
            return next(new AppError("Unauthorized", 403));
        }

        const file = await File.findOne({
            _id: fileId,
            project: projectId
        });

        if (!file) return next(new AppError("File not found", 404));

        const isUploader = file.user.toString() === req.user._id.toString();
        if (!isUploader && !isOwner(project, req.user._id)) {
            return next(new AppError("Not allowed to delete this file", 403));
        }

        await File.findByIdAndDelete(fileId);

        if (file.filePath) {
            fs.unlink(file.filePath, () => {});
        }

        res.json({ success: true, message: "File Deleted" });

    } catch (err) {
        next(err);
    }
};
/** 
 * The File Controller manages all file-related actions inside a project, such as uploading, viewing, and deleting files. Before doing anything, it first loads the project using the project ID and checks whether the user has permission through the hasProjectAccess function, which allows both the project owner and the project members. During upload, the controller saves the file details along with the user who uploaded it. When files are listed, it simply returns all files linked with that project, as long as the user is allowed to access the project. For deleting a file, the rules are stricter: only the user who uploaded the file or the project owner can remove it. This ensures that no normal member can delete someone else’s files unless they own the project. This approach keeps your file system organised and secure, giving proper control to the right users.
*/