import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();


// ========== Middleware ==========
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies
  })
);

// Parse cookies
app.use(cookieParser());

// Body parsing (with increased limits)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ========== Import Routes ==========
import authRoutes from "./routes/auth.route.js";
import mediaRoutes from "./routes/media.routes.js";
import userRoutes from "./routes/user.route.js";

// ========== Routes ==========
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/users", userRoutes);

export default app;
