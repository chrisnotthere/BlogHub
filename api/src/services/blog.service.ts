import { db } from "../config/db";
import { Post } from "../models/post.model";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
import { ResultSetHeader } from "mysql2";
import { removeComment } from "./comment.service";

export const fetchAllPosts = async (): Promise<Post[]> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
    "SELECT * FROM posts"
  );
  // The first element is an array of rows from the db (with each row being a RowDataPacket),
  // and the second element an array of FieldPacket that contains metadata about the fields.
  // We only care about the first element (the rows), so we destructure it out into a variable 'rows'.

  return rows.map((row) => {
    // This function takes a row and returns an object that matches the shape of the Post interface.
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      user_id: row.user_id,
      image: row.image,
      tags: row.tags,
    } as Post;
  });
};

export const fetchPost = async (id: number): Promise<Post> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
    "SELECT * FROM posts WHERE id = ?",
    [id]
  );

  return {
    id: rows[0].id,
    title: rows[0].title,
    content: rows[0].content,
    author: rows[0].author,
    user_id: rows[0].user_id,
    image: rows[0].image,
    tags: rows[0].tags,
  } as Post;
};

export const insertPost = async (post: Post): Promise<Post> => {
  const { title, content, author, user_id, image, tags } = post;
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query(
    "INSERT INTO posts SET ?",
    { title, content, author, user_id, image, tags }
  );

  return {
    id: result.insertId,
    title,
    content,
    author,
    user_id,
    image,
    tags,
  } as Post;
};

export const editPost = async (post: Post): Promise<Post> => {
  const { id, title, content, image, tags } = post;

  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
      "UPDATE posts SET title = ?, content = ?, image = ?, tags = ? WHERE id = ?",
      [title, content, image, tags, id]
    );
  } catch (error) {
    console.log(error);
  }

  return {
    id,
    title,
    content,
    image,
    tags,
  } as Post;
};

/**
 * Removes a post with the given ID from the database.
 * 
 * This function performs the following steps within a transaction:
 * 1. Retrieves all comments related to the post.
 * 2. Deletes each related comment using the `removeComment` function.
 * 3. Deletes all ratings associated with the post.
 * 4. Deletes the post itself from the 'posts' table.
 * 
 * If any step fails, the entire transaction is rolled back to ensure
 * database consistency.
 */
export const removePost = async (id: number): Promise<Post> => {
  const connection = await db.getConnection();
  try {
    await connection.query('START TRANSACTION');

    // get all comments related to this post
    const [comments]: any = await connection.query("SELECT id FROM comments WHERE post_id = ?", [id]);

    // remove each comment using the existing removeComment function
    for (const comment of comments) {
      await removeComment(comment.id, connection);
    }

    // delete all ratings associated with this post
    await connection.query("DELETE FROM ratings WHERE post_id = ?", [id]);

    // delete the post itself
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    await connection.query('COMMIT');
    connection.release();

    return {
      id,
    } as Post;
  } catch (error) {
    await connection.query('ROLLBACK');
    connection.release();
    throw error;
  }
};
