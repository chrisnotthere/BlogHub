import { Router } from "express";
import blogRoutes from "./blog.routes";
import ratingRoutes from "./rating.routes";
import authRoutes from "./auth.routes";
import commentRoutes from "./comment.routes";

const router = Router();

router.use("/posts", blogRoutes);
router.use("/rating", ratingRoutes);
router.use('/comment', commentRoutes)
router.use("/auth", authRoutes);

export default router;
