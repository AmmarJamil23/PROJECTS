const jwt = require("jsonwebtoken");
const User = require("../models/User");



const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select("-password");
            next();

        } catch (err) {
            console.error("Auth Error:", err.message);
            return res.status(401).json({ success: false, error: "Invalid or expired token "});

        }
    }
    if (!token){
        return res.status(401).json({ success: false, error: "No token provided"});
    }
};

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return res.status(403).json({ success: false, error: "Access denied"});
        }
        next();
    };
};

const adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, error: "Admins only" });
    }
    next();
}

module.exports = { protect, restrictTo, adminOnly};