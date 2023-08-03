import express from "express";
import {
  getUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);
router.get("/user", getUserController);

export default router;
