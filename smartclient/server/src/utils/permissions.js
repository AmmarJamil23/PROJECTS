const isOwner = (project, userId) => {
    const ownerId = project.owner._id ? project.owner._id : project.owner;
    return ownerId.toString() === userId.toString();
};

const isMember = (project, userId) => {
    return project.members.some((m) => {
        const memberId = m._id ? m._id : m; 
        return memberId.toString() === userId.toString();
    });
};

const hasProjectAccess = (project, userId) => {
    return isOwner(project, userId) || isMember(project, userId);
};

module.exports = {
    isOwner,
    isMember,
    hasProjectAccess
};
