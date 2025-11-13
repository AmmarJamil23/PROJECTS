const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

//REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ success: false, error: "User already exists "});

        const user = await User.create({ name, email, password});

        const token = generateToken(user);

        res.json({
         success: true,
         token,
         user: {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
      },
    });

    } catch (err){
        res.status(400).json({ success: false, error: err.message});
    }
} );

//LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(401).json({ success: false, error: "Invalid credentials"});

        const match = await user.matchPassword(password);
        if (!match) return res.status(401).json({ success: false, error: "Invalid credentials"});

        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        res.status(500).jsoon({ success: false, error: err.message });

    }

});

router.post("/logout", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if( !authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({ success: false, error: "No token provided"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.decode(token);
        const exp = decoded?.exp;
        const now = Math.floor(Date.now() / 1000);
        const remaining = exp - now;

        if (remaining > 0) await blacklistToken(token, remaining);

        res.json({ success: true, message: "Logged out successfully"});

    } catch(err) {
        res.status(500).json({ success: false, error: err.message});
    }
})

module.exports = router;