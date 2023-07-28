import { Request, Response } from "express";
import {
  insertRating,
  getExistingRating,
  updateRating,
  getRatingByPostIdAndUserId as getRating,
} from "../services/rating.service";

export const postRating = async (req: Request, res: Response) => {
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

export const getRatingByPostIdAndUserId = async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.postId);
  const userId: number = parseInt(req.params.userId);

  // Check if postId and userId are valid numbers
  if (isNaN(postId) || isNaN(userId)) {
    res.status(400).send({ message: 'Invalid post ID or user ID' });
    return;
  }

  // Proceed with the database query if both postId and userId are valid
  try {
    const rating = await getRating(postId, userId);
    res.send({ data: rating });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'There was an error processing your request' });
  }
};


// export const getAvgPostRating = async (req: Request, res: Response) => {
//   console.log("getAvgPostRating");
// }
