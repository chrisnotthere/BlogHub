import express from "express";
import { postRating } from "../controllers/rating.controller";

const router = express.Router();

router.post("/", postRating);

export default router;
