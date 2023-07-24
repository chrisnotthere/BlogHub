import { db } from '../config/db';
import { Post } from '../models/post.model';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';

export const fetchAllPosts = async (): Promise<Post[]> => {  

  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM posts');
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
    } as Post;
  });
};

export const insertPost = async (post: Post): Promise<Post> => {
  const { title, content, author } = post;
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('INSERT INTO posts SET ?', { title, content, author });

  return {
    title,
    content,
    author,
  } as Post;
}

export const removePost = async (id: number): Promise<Post> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('DELETE FROM posts WHERE id = ?', [id]);

  return {
    id,
  } as Post;
}
