import express from "express";
import {
  getAverageRatingByPostId,
  getRatingByPostIdAndUserId,
  postRating,
} from "../controllers/rating.controller";

const router = express.Router();

router.get("/avgPostRating/:postId", getAverageRatingByPostId);
router.get("/:postId/:userId", getRatingByPostIdAndUserId);
router.post("/", postRating);

export default router;
