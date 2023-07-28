import { db } from "../config/db";
import { Rating } from "../models/rating.model";

export const getExistingRating = async (userId: number, postId: number): Promise<Rating | null> => {
  const [rows]: any[] = await db.query("SELECT * FROM ratings WHERE user_id = ? AND post_id = ?", [userId, postId]);

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    rating: rows[0].rating,
    user_id: rows[0].user_id,
    post_id: rows[0].post_id,
  } as Rating;
};

export const insertRating = async (userId: number, postId: number, rating: number): Promise<void> => {
  await db.query("INSERT INTO ratings (user_id, post_id, rating) VALUES (?, ?, ?)", [userId, postId, rating]);
};

export const updateRating = async (ratingId: number, rating: number): Promise<void> => {
  await db.query("UPDATE ratings SET rating = ? WHERE id = ?", [rating, ratingId]);
};
