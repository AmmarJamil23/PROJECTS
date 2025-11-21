const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        action: {
            type: String,
            required: true,
        },

        targetType: {
            type: String,
            enum: ["project", "task", "comment", "file", "ai"],
            required: true,
        },

        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        metadata: {
            type: Object,
            default: {},
        },

        ip: String,
        userAgent: String,
    },
    {timestamps: true }
);

module.exports = mongoose.model("Activity", activityLogSchema);