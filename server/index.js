import dotenv from "dotenv";
dotenv.config(); // <-- MUST be first, before using process.env.JWT_SECRET
console.log("JWT_SECRET =", process.env.JWT_SECRET);
import express from "express";
// import cors from "cors";
import db from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());

import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


// test route
app.get("/", (req, res) => res.send("Server running 🚀"));

// routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import dashboardRoutes from "./routes/dashboardRoutes.js";
app.use("/api/dashboard", dashboardRoutes);

// import userRoutes from "./routes/userRoutes.js";
// app.use("/api/user", userRoutes);

import appointmentRoutes from "./routes/appointmentRoutes.js";
app.use("/api/appointments", appointmentRoutes);


app.listen(5000, () => console.log("Server running on http://localhost:5000"));