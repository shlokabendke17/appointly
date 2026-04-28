import express from "express";
import { registerUser, registerProvider, getServices, loginUser } from "../controllers/authController.js";

const router = express.Router();

// User / Provider auth routes
router.post("/register-user", registerUser);
router.post("/register-provider", registerProvider);
router.get("/getServices", getServices);
router.post("/login", loginUser);

export default router;
