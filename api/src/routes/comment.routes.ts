import express from "express";
import {
  checkIfUserLikedController,
  createCommentController,
  deleteCommentController,
  getAllCommentsController,
  likeToggleController,
} from "../controllers/comment.controller";

const router = express.Router();

router.post("/create", createCommentController);
router.get("/allComments/:postId", getAllCommentsController);
router.delete("/delete/:commentId", deleteCommentController);

router.post("/likeToggle", likeToggleController);
router.post("/checkIfUserLiked/", checkIfUserLikedController);

export default router;
