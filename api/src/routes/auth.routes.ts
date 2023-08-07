import express from "express";
import {
  getUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller";
import { authenticateJWT } from "../controllers/authMiddleware";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", authenticateJWT, logoutUserController);
router.get("/user", authenticateJWT, getUserController);

export default router;
