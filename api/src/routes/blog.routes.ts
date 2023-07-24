import { Router } from 'express';
import { createPost, deletePost, getAllPosts } from '../controllers/blog.controller';

const router = Router();

router.get('/allPosts', getAllPosts);
router.post('/createPost', createPost);
router.delete('/deletePost/:id', deletePost);

export default router;
