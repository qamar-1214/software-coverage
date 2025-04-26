import express from "express";
import { authToken } from "../middlewares/authToken.js";

import {
  getUserData,
  logout,
  signin,
  signup,
  updateProfile,
  verifyEmail,
  resendVerification,
  firebaseSignIn,
} from "../Controllers/auth/authController.js";
import { createUploadMiddleware } from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.post("/sign-in", signin);
authRouter.post("/sign-up", signup);
authRouter.post("/firebaseSignIn", firebaseSignIn);
authRouter.put(
  "/update-profile",
  createUploadMiddleware("profileImage"),
  authToken,
  updateProfile
);
authRouter.get("/verify-token", authToken, (req, res) => {
  res.json({
    isAuthenticated: true,
    user: {
      email: req.email,
      isAdmin: req.isAdmin,
      profileImage: req.profileImage,
      displayName: req.displayName,
    },
  });
});
authRouter.get("/user-data", authToken, getUserData);
authRouter.post("/logout", logout);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/resend-verification", resendVerification);

export default authRouter;
