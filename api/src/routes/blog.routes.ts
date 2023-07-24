import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/blog.controller';

const router = Router();

router.get('/allPosts', getAllPosts);
router.post('/createPost', createPost);

export default router;
