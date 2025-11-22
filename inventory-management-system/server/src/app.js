import express from "express";
import cors from "cors";
import { config } from "./config/env";

const app = express();

app.use(cors({
    origin: config.clientUrl,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Inventory Management API",
        version: "1.0.0",
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    console.error("Error: ", err.message);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(config.nodeEnv === "development" && { stack: err.stack }),
    });
});

export default app;