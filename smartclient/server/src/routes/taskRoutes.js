const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const { 
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const router = express.Router({ mergeParams: true});

router.post(
    "/",
    protect,
    [
        body("title").notEmpty().withMessage("Task title is required"),
        body("description").optional().isString(),
    ],
    validate,
    createTask
);

// GET /api/v1/projects/:projectId/tasks
router.get("/", protect, getTasks);

// PUT /api/v1/projects/:projectId/tasks/:taskId
router.put("/:taskId", protect, updateTask);

// DELETE /api/v1/projects/:projectId/tasks/:taskId
router.delete("/:taskId", protect, deleteTask);

module.exports = router;