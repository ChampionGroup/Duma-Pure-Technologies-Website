import express from "express";
import { signup, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword, getUserData } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp)
authRouter.post("/verify-email", verifyEmail)
authRouter.get("/is-auth", userAuth, isAuthenticated)
authRouter.post("/send-reset-otp", sendResetOtp)
authRouter.post("/reset-password", resetPassword)
authRouter.get("/data", getUserData)

export default authRouter;