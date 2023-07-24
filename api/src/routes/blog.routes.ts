import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/blog.controller";

const router = Router();

router.get("/allPosts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/createPost", createPost);
router.put("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

export default router;
