const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
            minlength: 2,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],

        status: {
            type: String,
            enum: ["active", "completed", "archived"],
            default: "active",
        },

        isArchived: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true}
);

projectSchema.index({
    name: "text",
    description: "text",
});


module.exports = mongoose.model("Project", projectSchema);
