import { Request, Response } from "express";
import {
  checkUserLike,
  fetchAllComments,
  insertComment,
  removeComment,
  toggleLike,
} from "../services/comment.service";
import { Comment } from "../models/comment.model";

export const createCommentController = async (req: Request, res: Response) => {
  const { post_id, user_id, author, content } = req.body as Partial<Comment>;

  if (!post_id || !user_id || !author || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const comment: Comment = { post_id, user_id, author, content };

  try {
    const newComment = await insertComment(comment);
    return res
      .status(201)
      .json({ data: newComment, message: "Successfully created comment" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllCommentsController = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const comments = await fetchAllComments(Number(postId));
    return res
      .status(200)
      .json({ data: comments, message: "Successfully retrieved comments" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.commentId);
  if (isNaN(commentId)) {
    return res.status(400).send({ error: "Invalid id" });
  }

  try {
    await removeComment(commentId);
    return res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const likeToggleController = async (req: Request, res: Response) => {
  const { userId, commentId } = req.body;
  try {
    await toggleLike(userId, commentId);
    res.status(200).json({ message: "Like toggled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkIfUserLikedController = async (
  req: Request,
  res: Response
) => {
  const { userId, commentId } = req.body;
  try {
    const hasLiked = await checkUserLike(userId, commentId);
    res.status(200).json({ data: hasLiked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
