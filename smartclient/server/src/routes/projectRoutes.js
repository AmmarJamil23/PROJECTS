const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    createProject,

} = require("../controllers/projectController");

const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

router.post(
    "/",
    protect,
    [
        body("name").notEmpty().withMessage("Project name is required"),
        body("description").optional().isString(),
    ],
    validate,
    createProject
);

//GET ALL PROJECTS
router.get("/", protect, getProjects);

//GET ONE PROJECT
router.get("/:id", protect, getProject);

//UPDATE PROJECT
router.put("/:id", protect, updateProject);

//DELETE PROJECT
router.delete("/:id", protect, deleteProject);

module.exports = router;