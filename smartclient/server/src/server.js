require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");


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

const testUserRoutes = require("./routes/testUser");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/v1/protected", protectedRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test-user", testUserRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})