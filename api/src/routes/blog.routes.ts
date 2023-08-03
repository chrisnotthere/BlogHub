import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  updatePostController,
} from "../controllers/blog.controller";
import { upload } from "../config/middleware";

const router = express.Router();

router.get("/allPosts", getAllPostsController);
router.get("/post/:id", getPostController);
router.post(
  "/createPost",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createPostController
);
router.put(
  "/updatePost/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updatePostController
);
router.delete("/deletePost/:id", deletePostController);

export default router;
