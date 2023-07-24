import { Request, Response } from 'express';
import { fetchAllPosts, insertPost, removePost } from '../services/blog.service';

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
  // console.log('createPost')
  // console.log('req.body: ', req.body)
  try {
    const newPost = await insertPost(req.body);
    res.send({ data: newPost, message: 'post created' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong.', error: err });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  console.log('deletePost')
  console.log('req.params: ', req.params)
  try {
    const id = Number(req.params.id);
    const deletedPost = await removePost(id);
    res.send({ data: deletedPost, message: 'post deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong.', error: err });
  }
};
