import { db } from "../config/db";
import { Comment } from "../models/comment.model";
import { FieldPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";

export const insertComment = async (comment: Comment): Promise<Comment> => {
  const { post_id, user_id, content } = comment;
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)",
    [post_id, user_id, content]
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
