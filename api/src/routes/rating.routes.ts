import express from "express";
import {
  getRatingSummaryByPostIdController,
  getRatingByPostIdAndUserIdController,
  upsertRatingController,
} from "../controllers/rating.controller";
import { authenticateJWT } from "../controllers/authMiddleware";

const router = express.Router();

router.get("/ratingSummary/:postId", getRatingSummaryByPostIdController);
router.get("/:postId/:userId", getRatingByPostIdAndUserIdController);
router.post("/", authenticateJWT, upsertRatingController);

export default router;
