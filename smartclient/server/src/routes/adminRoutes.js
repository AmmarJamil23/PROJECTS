const express = require("express");
const { protect, adminOnly} = require("../middleware/authMiddleware");

const {
    getAllUser,
    searchUsers,
    freezeUser,
    unfreezeUser,
    softDeleteUser,
} = require("../controllers/adminController");

const router = express.Router();

//GET ALL USER
router.get("/users", protect, adminOnly, getAllUser);


//SEARCH USERS
router.get("/users/search", protect, adminOnly, searchUsers);


//FREEZE
router.patch("/users/:userId/freeze", protect, adminOnly, freezeUser);


//UNFREEZE
router.patch("/users/:userId/unfreeze", protect, adminOnly, unfreezeUser);


//SOFT DELETE
router.patch("/users/:userId/delete", protect, adminOnly, softDeleteUser);

module.exports = router;