const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const {
    addMember,
    removeMember,
    listMembers
} = require("../controllers/projectMembersController");

const router = express.Router({ mergeParams: true});

//ADD MEMBER
router.post(
    "/add",
    protect,
    [body("email").isEmail().withMessage("Valid email required")],
    validate,
    addMember
);

//REMOVE MEMBER
router.post(
    "/remove",
    protect,
    [body("userId").notEmpty().withMessage("userId required")],
    validate,
    removeMember
);

//LIST MEMBERS
router.get("/", protect, listMembers);

module.exports = router;