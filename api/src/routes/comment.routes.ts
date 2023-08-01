import express from "express";
import { createComment, deleteComment, getAllComments } from "../controllers/comment.controller";

const router = express.Router();

router.post("/create", createComment);
router.get("/allComments/:postId", getAllComments);
router.delete("/delete/:commentId", deleteComment);

export default router;
