import { Request, Response } from 'express';
import { fetchAllPosts, insertPost } from '../services/blog.service';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await fetchAllPosts();
    res.send({ data: posts, message: 'from posts table' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong.', error: err });
  }
};

export const createPost = async (req: Request, res: Response) => {
  console.log('createPost')
  console.log('req.body: ', req.body)
  try {
    const newPost = await insertPost(req.body);
    res.send({ data: newPost, message: 'post created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong.', error: err });
  }
};
