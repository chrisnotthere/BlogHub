import express from "express";
import {
  getAverageRatingByPostIdController,
  getRatingByPostIdAndUserIdController,
  postRatingController,
} from "../controllers/rating.controller";

const router = express.Router();

router.get("/avgPostRating/:postId", getAverageRatingByPostIdController);
router.get("/:postId/:userId", getRatingByPostIdAndUserIdController);
router.post("/", postRatingController);

export default router;
