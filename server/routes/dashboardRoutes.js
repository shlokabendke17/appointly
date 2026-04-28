import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getUserDashboard, getProviderDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

// Only accessible if logged in (JWT verified)
router.get("/user", verifyToken, getUserDashboard);
router.get("/provider", verifyToken, getProviderDashboard);

export default router;
