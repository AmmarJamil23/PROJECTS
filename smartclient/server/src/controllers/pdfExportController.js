const PDFDocument = require("pdfkit");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Comment = require("../models/Comment");
const File = require("../models/File");
const { hasProjectAccess } = require("../utils/permissions");
const AppError = require("../utils/appError");

exports.exportProjectPDF = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId)
        .populate("owner", "name email")
        .populate("members", "name email");

        if (!project) {
            return next(new AppError("Project not found", 404));
        }

        if (!hasProjectAccess(project,  req.user._id)) {
            return next(new AppError("Unauthorized", 403));
        }

        const tasks = await Task.find({ project: projectId });
        const commentsCount = await Comment.countDocuments({
            task: { $in: tasks.map((t) => t._id) },
        });

        const filesCount = await File.countDocuments({ project: projectId});

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="project_${projectId}.pdf"` );

        doc.pipe(res);

        //TITLE
        doc.fontSize(22).text(project.name, {underline: true });
        doc.moveDown();


        //DESCRIPTION
        doc.fontSize(12).text(`Description: ${project.description}`);
        doc.moveDown();


        //OWNER
        doc.text(`Owner: ${project.owner.name} (${project.owner.email})`);
        doc.moveDown();


        //MEMBERS
        doc.text("Members");
        project.members.forEach((m) => {
            doc.text(` . ${m.name} (${m.email})`);
        });
        doc.moveDown();


        //TASK
        doc.fontSize(16).text("Task", { underline: true }).moveDown(0.5);
        tasks.forEach((t) => {
            doc.fontSize(12).text(` . ${t.title} [${t.status}]`);
        });
        doc.moveDown();


        //COMMENTS AND FILE SUMMARY
        doc.fontSize(12).text(`Comment Count: ${commentsCount}`);
        doc.text(`Files Count: ${filesCount}`);
        doc.moveDown(2);


        //FOOTER
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`);


        doc.end();
    } catch (err) {
        next(err);
    }
}