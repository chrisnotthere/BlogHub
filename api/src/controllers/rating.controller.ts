import { Request, Response } from "express";
import {
  insertRating,
  getExistingRating,
  updateRating,
  getRatingByPostIdAndUserId as getRating,
  getAverageRatingByPostId as getAvgRating,
} from "../services/rating.service";

export const postRatingController = async (req: Request, res: Response) => {
  const { postId, userId, rating } = req.body;

  try {
    const existingRating = await getExistingRating(userId, postId);

    if (existingRating) {
      // If rating exists, update it
      await updateRating(existingRating.id, rating);
      res.send({ message: "Rating updated successfully" });
    } else {
      // If rating does not exist, insert it
      await insertRating(userId, postId, rating);
      res.send({ message: "Rating posted successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was an error processing your request" });
  }
};

export const getRatingByPostIdAndUserIdController = async (
  req: Request,
  res: Response
) => {
  const postId: number = parseInt(req.params.postId);
  const userId: number = parseInt(req.params.userId);

  // Check if postId and userId are valid numbers
  if (isNaN(postId) || isNaN(userId)) {
    res.status(400).send({ message: "Invalid post ID or user ID" });
    return;
  }

  // Proceed with the database query if both postId and userId are valid
  try {
    const rating = await getRating(postId, userId);
    res.send({ data: rating });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was an error processing your request" });
  }
};

export const getAverageRatingByPostIdController = async (
  req: Request,
  res: Response
) => {
  const postId: number = Number(req.params.postId);

  try {
    const avgRating = await getAvgRating(postId);

    if (avgRating !== null) {
      res.send({ data: avgRating });
    } else {
      res.status(404).send({ message: "No ratings found for this post" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was an error processing your request" });
  }
};
