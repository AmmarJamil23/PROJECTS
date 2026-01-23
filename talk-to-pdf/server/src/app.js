const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/upload.routes");
const chatRoutes = require("./routes/chat.routes");
const { chat } = require("./controllers/chat.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

module.exports = app;