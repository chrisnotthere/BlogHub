import { Router } from 'express';
import { getAllPosts } from '../controllers/blog.controller';

const router = Router();

router.get('/allPosts', getAllPosts);

export default router;
