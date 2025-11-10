const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const user = await User.create({ name, email, password});

        res.json({ success: true, user});

    } catch (err){
        res.status(400).json({ success: false, error: err.message });

    }

});

module.exports = router;