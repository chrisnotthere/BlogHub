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
    throw new Error("Error in fetching comments");
  }
};

export const removeComment = async (id: number): Promise<void> => {
  if (isNaN(id)) {
    throw new Error("Comment id is not a number");
  }
  
  const [result]: any = await db.query(
    "DELETE FROM comments WHERE id = ?",
    [id]
  );

  if (!result.affectedRows) {
    throw new Error("Error in deleting comment, or comment not found");
  }
};
