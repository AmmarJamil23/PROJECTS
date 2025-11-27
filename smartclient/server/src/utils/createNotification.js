const Notification = require("../models/Notifications");

const createNotification = async ({ users, title, message, project}) => {
    try{
        const data = users.map((userId) => ({
            user: userId,
            title,
            message,
            project,
        }));

        await Notification.insertMany(data);

    } catch (err) {
        console.error("Notification error:", err.message);
    }
};

module.exports = createNotification;