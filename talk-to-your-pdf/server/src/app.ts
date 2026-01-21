const express = require("express");
const cors = require("cors");
const uploadRouter = require("./routes/upload.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRouter);

module.exports = app;
