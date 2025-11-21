const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({ req, userId, action, targetType, targetId, metadata = {} }) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      targetType,
      targetId,
      metadata,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  } catch (err) {
    console.error("Activity log error:", err.message);
  }
};

module.exports = logActivity;
