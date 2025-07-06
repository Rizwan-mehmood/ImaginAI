// index.js
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateAIIamge.js";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    req.url = req.url.replace(/^\/\.netlify\/functions\/index/, '');
    next();
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Middleware: ensure MongoDB is connected on each invocation
let isConnected = false;
const connectDB = async () => {
    if (isConnected) return;
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
};

// Add this middleware before routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

// Your routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Rizwan" });
});

app.get('/test', (req, res) => {
    res.status(200).json({ success: true, message: "Test route works!" });
});

// Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).json({ success: false, status, message });
});

// **No `app.listen()` here!**
// Wrap and export for Netlify Functions:
export const handler = serverless(app);
