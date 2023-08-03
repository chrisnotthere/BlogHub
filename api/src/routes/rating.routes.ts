import express from "express";
import {
  getRatingSummaryByPostIdController,
  getRatingByPostIdAndUserIdController,
  upsertRatingController,
} from "../controllers/rating.controller";

const router = express.Router();

router.get("/ratingSummary/:postId", getRatingSummaryByPostIdController);
router.get("/:postId/:userId", getRatingByPostIdAndUserIdController);
router.post("/", upsertRatingController);

export default router;
