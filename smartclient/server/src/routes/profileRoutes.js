const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const upload = require("../config/multer");


const { 
    updateProfile,
    updateEmail,
    updatePassword,
    updateAvatar,
 } = require("../controllers/profileController");

 const router = express.Router();

 //UPDATE NAME
 router.patch(
    "/me",
    protect,
    [body("name").notEmpty().withMessage("Name is required")],
    validate,
    updateProfile,
 );


 //UPDATE EMAIL
 router.patch(
    "/me/email",
    protect,
    [body("email").isEmail().withMessage("Email is invalid")],
    validate,
    updateEmail,
 );


 //UPDATE PASSWORD
 router.patch(
    "/me/password",
    protect,
    [body("oldPassword").notEmpty(),
        body("newPassword").isLength({ min: 6 }),
    ],
    validate,
    updatePassword,

 );


 //UPDATE AVATAR
 router.patch(
    "/me/avatar",
    protect,
    upload.single("avatar"),
    updateAvatar,
 );

 module.exports = router;