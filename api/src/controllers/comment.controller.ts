import { Request, Response } from 'express';
import { insertComment } from '../services/comment.service';

export const createComment = async (req: Request, res: Response) => {
  console.log('createComment');
  console.log(req.body);

  const { post_id, user_id, content } = req.body;

  if (!post_id || !user_id || !content) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  const comment = {
    post_id,
    user_id,
    content,
  };

  try {
    const newComment = await insertComment(comment);
    return res.status(201).json({
      data: newComment,
      message: 'Successfully created comment'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error creating the comment'
    });
  }

};
