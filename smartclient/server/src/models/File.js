const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        originalName: String,
        fileName: String,
        filePath: String,
        fileSize: Number,
        fileType: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);

