const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

/* ===== MIDDLEWARE (ORDER MATTERS) ===== */

app.use(express.json());

app.use(cors({
  origin: true,          // allow ALL origins (browser will send correct one)
  credentials: true
}));

// IMPORTANT: allow preflight
app.options("*", cors());

/* ===== ROUTES ===== */

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

/* ===== TEST ROUTES ===== */

app.get("/", (req, res) => {
  res.send("ChatWave API running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "ChatWave API",
    time: new Date().toISOString()
  });
});

module.exports = app;
