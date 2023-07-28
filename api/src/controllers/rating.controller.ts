import { Request, Response } from "express";
import {
  insertRating,
  getExistingRating,
  updateRating,
} from "../services/rating.service";

export const postRating = async (req: Request, res: Response) => {
  // console.log("postRating");
  // console.log(req.body);

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
