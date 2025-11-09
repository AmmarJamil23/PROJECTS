require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ==> following are security middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ok", message: "Backend running successfully"});

});

const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})