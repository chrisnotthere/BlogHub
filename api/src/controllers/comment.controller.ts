import { Request, Response } from 'express';
import { fetchAllComments, insertComment } from '../services/comment.service';

export const createComment = async (req: Request, res: Response) => {
  console.log('createComment');
  console.log(req.body);

  const { post_id, user_id, author, content } = req.body;

  if (!post_id || !user_id || !author || !content) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  const comment = {
    post_id,
    user_id,
    author,
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

export const getAllComments = async (req: Request, res: Response) => {
  // console.log('getAllComments');
  // console.log(req.params);

  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({
      error: "Missing required fields"
    });
  }

  try {
    const comments = await fetchAllComments(Number(postId));
    return res.status(200).json({
      data: comments,
      message: 'Successfully retrieved comments'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'There was an error retrieving the comments'
    });
  }
}

