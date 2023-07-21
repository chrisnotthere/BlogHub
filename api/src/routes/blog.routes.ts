import { Router } from 'express';
import { getAllPosts } from '../controllers/blog.controller';

const router = Router();

router.get('/', getAllPosts);

export default router;
