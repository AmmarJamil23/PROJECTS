const mongoose = require("mongoose");

const aiInteractionSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: ["summary", "task_helper", "chat", "custom"],
            default: "custom"
        },

        prompt: {
            type: String,
            required: true,
        },

        response: {
            type: String,
            required: true,
        },

        metadata: {
            type: Object,
            default: {},
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("AIInteraction", aiInteractionSchema);