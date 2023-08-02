import express from "express";
import {
  checkIfUserLikedController,
  createComment,
  deleteComment,
  getAllComments,
  likeToggleController,
} from "../controllers/comment.controller";

const router = express.Router();

router.post("/create", createComment);
router.get("/allComments/:postId", getAllComments);
router.delete("/delete/:commentId", deleteComment);

router.post("/likeToggle", likeToggleController);
router.post("/checkIfUserLiked/", checkIfUserLikedController);

export default router;
