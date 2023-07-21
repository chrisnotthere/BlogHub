import { Request, Response } from 'express';
import { fetchAllPosts } from '../services/blog.service';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await fetchAllPosts();
    res.send({ data: posts, message: 'from posts table' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong.', error: err });
  }
};
