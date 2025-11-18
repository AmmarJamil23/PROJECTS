const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const {
     createComment,
     getComments,
     deleteComment,
    } = require("../controllers/commentController");

const router = express.Router({ mergeParams: true });

//CREATE
router.post(
    "/",
    protect,
    [body("text").notEmpty().withMessage("Comment text is required")],
    validate,
    createComment
);

//GET ALL COMMENTS FOR A TASK
router.get("/", protect, getComments);

//DELETE
router.delete("/:commentId", protect, deleteComment);


module.exports = router;