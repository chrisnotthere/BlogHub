import express from "express";
import { createComment, getAllComments } from "../controllers/comment.controller";

const router = express.Router();

router.post("/create", createComment);
router.get("/allComments/:postId", getAllComments);

export default router;
