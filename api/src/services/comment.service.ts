import { db } from "../config/db";
import { Comment } from "../models/comment.model";
import { FieldPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";

export const insertComment = async (comment: Comment): Promise<Comment> => {
  const { post_id, user_id, author, content } = comment;
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query(
    "INSERT INTO comments (post_id, user_id, author, content) VALUES (?, ?, ?, ?)",
    [post_id, user_id, author, content]
  );

  const [rows]: [any[], FieldPacket[]] = await db.query(
    "SELECT * FROM comments WHERE id = ?",
    [result.insertId]
  );

  if (rows.length > 0) {
    return rows[0] as Comment;
  } else {
    throw new Error("Error in creating comment");
  }
};

export const fetchAllComments = async (postId: number): Promise<Comment[]> => {
  const [rows]: [any[], FieldPacket[]] = await db.query(
    "SELECT * FROM comments WHERE post_id = ?",
    [postId]
  );

  if (rows.length > 0) {
    return rows as Comment[];
  } else {
    return [];
  }
};


/**
 * Removes a comment with the given ID from the database.
 *
 * This function may be used within the context of a larger transaction, such as when deleting
 * a post along with its related comments. The transaction context can be passed as an optional parameter.
 *
 * Steps performed by the function:
 * 1. Verifies that the provided ID is a number.
 * 2. If a transaction context is provided, it uses that context; otherwise, it uses the default database connection.
 * 3. Deletes all likes associated with the comment from the 'comment_likes' table.
 * 4. Deletes the comment itself from the 'comments' table.
 */
export const removeComment = async (
  id: number,
  transaction?: any
): Promise<void> => {
  if (isNaN(id)) {
    throw new Error("Comment id is not a number");
  }

  // use the transaction context if provided
  const context = transaction || db;

  // delete all likes associated with this comment
  await context.query("DELETE FROM comment_likes WHERE comment_id = ?", [id]);

  // then, delete the comment itself
  const [result]: any = await context.query(
    "DELETE FROM comments WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    throw new Error("Error in deleting comment, or comment not found");
  }
};

/**
 * Toggles a like for a specific comment by a user.
 * If the user has already liked the comment, the like is removed.
 * If the user has not liked the comment, a like is added.
 * The total number of likes for the comment is also updated in the comments table.
 */
export const toggleLike = async (
  userId: number,
  commentId: number
): Promise<void> => {
  try {
    const hasLiked = await checkUserLike(userId, commentId);

    if (hasLiked) {
      await db.query(
        "DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?",
        [userId, commentId]
      );

      await db.query("UPDATE comments SET likes = likes - 1 WHERE id = ?", [
        commentId,
      ]);
    } else {
      await db.query(
        "INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)",
        [userId, commentId]
      );

      await db.query("UPDATE comments SET likes = likes + 1 WHERE id = ?", [
        commentId,
      ]);
    }
  } catch (error) {
    console.error("Error in toggleLike service:", error); // Log the error details
    throw error;
  }
};

export const checkUserLike = async (
  userId: number,
  commentId: number
): Promise<boolean> => {
  try {
    const [rows]: [any[], FieldPacket[]] = await db.query(
      "SELECT * FROM comment_likes WHERE user_id = ? AND comment_id = ?",
      [userId, commentId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error("Error in checkUserLike:", error);
    throw error;
  }
};
