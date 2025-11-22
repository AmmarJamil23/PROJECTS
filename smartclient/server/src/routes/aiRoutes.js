const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const { 
    saveAIInteraction,
    getAIInteraction
} = require("../controllers/aiController");

const router = express.Router({ mergeParams: true});

//SAVE AI INTERACTION
router.post(
    "/",
    protect,
    [
        body("prompt").notEmpty().withMessage("Prompt is required"),
        body("response").notEmpty().withMessage("Response is required"),
        body("type").optional().isString(),
    ],
    validate,
    saveAIInteraction
);

router.get("/", protect, getAIInteraction);

module.exports = router;