import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  updatePostController,
} from "../controllers/blog.controller";
import { upload } from "../config/middleware";
import { authenticateJWT } from "../controllers/authMiddleware";

const router = express.Router();

router.get("/allPosts", getAllPostsController);
router.get("/post/:id", getPostController);
router.post(
  "/createPost",
  authenticateJWT,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createPostController
);
router.put(
  "/updatePost/:id",
  authenticateJWT,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updatePostController
);
router.delete("/deletePost/:id", authenticateJWT, deletePostController);

export default router;
