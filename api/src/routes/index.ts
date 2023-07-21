import { Router } from 'express';
import blogRoutes from './blog.routes';

const router = Router();

router.use('/posts', blogRoutes);

export default router;
