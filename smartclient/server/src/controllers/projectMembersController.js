const Project = require("../models/Project");
const User = require("../models/User");
const AppError = require("../utils/appError");

//ONLY ONLY OWNER CAN MODIFY MEMBERS
const verifyOwner = async (projectId, userId) => {
    return await Project.findOne({ _id: projectId, owner: userId});
};

// ADD MEMBER
exports.addMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body;

        const project = await verifyOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found or authorized", 403));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError("User does not exists", 404));
        }

        if (project.members.includes(user._id)) {
            return next(new AppError("User already a member", 400));
        }

        project.members.push(user._id);
        await project.save();

        res.json({ success: true, message: "Member added", project});

    } catch (err){
        next(err);
    }
}

///REMOVE MEMBERS
exports.removeMember = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.body;

        const project = await verifyOwner(projectId, req.user._id);
        if (!project) {
            return next(new AppError("Project not found or unauthorized", 403));
        }

        project.members = project.members.filter(id => id.toString() !== userId);
        await project.save();

        res.json({ success: true, message: "Member removed", project });

    } catch (err){
        next(err);
    }
}

// LIST MEMBERS
exports.listMembers = async (req, res, next) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            $or: [
                { owner: req.user._id },
                { members: req.user._id }
            ]
        })
        .populate("owner", "name email")
        .populate('members', "name email");

        if (!project) {
            return next(new AppError("Project not found or unauthorized", 403));
        }

        res.json({
            success: true,
            owner: project.owner,
            members: project.members
        })


    } catch (err){
        next(err);
    }
}