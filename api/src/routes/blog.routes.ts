import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/blog.controller";
import { upload } from "../config/middleware";

const router = Router();

router.get("/allPosts", getAllPosts);
router.get("/post/:id", getPost);
router.post("/createPost", upload.fields([{ name: 'image', maxCount: 1 }]), createPost);
router.put("/updatePost/:id", upload.fields([{ name: 'image', maxCount: 1 }]), updatePost);
router.delete("/deletePost/:id", deletePost);

export default router;
