const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User Already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPass });

        res.json({ message: "User registered successfully "});


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
            });
        res.json({ token });


    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}