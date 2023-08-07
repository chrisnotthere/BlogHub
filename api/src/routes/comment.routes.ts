import express from "express";
import {
  checkIfUserLikedController,
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  likeToggleController,
} from "../controllers/comment.controller";
import { authenticateJWT } from "../controllers/authMiddleware";

const router = express.Router();

router.post("/create", authenticateJWT, createCommentController);
router.get("/allComments/:postId", getAllCommentsController);
router.delete("/delete/:commentId", authenticateJWT, deleteCommentController);

router.post("/likeToggle", authenticateJWT, likeToggleController);
router.post("/checkIfUserLiked/", checkIfUserLikedController);

export default router;
