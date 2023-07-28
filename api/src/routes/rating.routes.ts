import express from "express";
import {
  // getAvgPostRating,
  getRatingByPostIdAndUserId,
  postRating,
} from "../controllers/rating.controller";

const router = express.Router();

router.post("/", postRating);
router.get("/:postId/:userId", getRatingByPostIdAndUserId);
// router.get("/avgPostRating/:postId", getAvgPostRating);

export default router;
