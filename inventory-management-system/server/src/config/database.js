import mongoose from "mongoose";
import { config } from "./env.js"

export const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);

        console.log(`MongoDB connected: ${conn.connection.host}`);

        mongoose.connection.on("error", (err) => {
            console.error((`MongoDB connection error ${err}`));
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
        return conn;

    } catch (error) {
        console.log(`MongoDB connection failed ${error.message}`);
        process.exit(1);
    }
};

export const disconnectDatabase = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");

    } catch (error) {
        console.log(`Error closing MongoDB connection: ${error.message}`);
    }
}
