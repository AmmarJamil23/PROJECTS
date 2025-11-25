const isOwner = (project, userId) => {
    return project.owner.toString() === userId.toString();
};

const isMember = (project, userId) => {
    return project.members.some(
        (id) => id.toString() === userId.toString()
    );
};

// PERSON IS OWNER OR MEMBER
const hasProjectAccess = (project, userId) => {
    return isOwner(project, userId) || isMember(project, userId);
};

module.exports = {
    isOwner,
    isMember,
    hasProjectAccess
};