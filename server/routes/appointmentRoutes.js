import express from "express";
import { getUserAppointments, getProviderAppointments } from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// User's appointments
router.get("/user", verifyToken, getUserAppointments);

// Provider's appointments
router.get("/provider", verifyToken, getProviderAppointments);

export default router;
