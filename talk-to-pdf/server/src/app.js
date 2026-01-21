const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

module.exports = app;