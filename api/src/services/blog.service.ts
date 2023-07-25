import { db } from '../config/db';
import { Post } from '../models/post.model';
import { FieldPacket, RowDataPacket } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

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
      image: row.image,
    } as Post;
  });
};

export const fetchPost = async (id: number): Promise<Post> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);

  return {
    id: rows[0].id,
    title: rows[0].title,
    content: rows[0].content,
    author: rows[0].author,
    image: rows[0].image,
  } as Post;
}

export const insertPost = async (post: Post): Promise<Post> => {
  console.log('insertPost')
  const { title, content, author, image } = post;
  const [result]: [ResultSetHeader, FieldPacket[]] = await db.query('INSERT INTO posts SET ?', { title, content, author, image });

  return {
    id: result.insertId,
    title,
    content,
    author,
    image
  } as Post;
}

export const editPost = async (post: Post): Promise<Post> => {
  console.log('editPost')
  const { id, title, content, author, image } = post;
  console.log('====post: ', post)

  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('UPDATE posts SET title = ?, content = ?, author = ?, image = ? WHERE id = ?', [title, content, author, image, id]);
    console.log(rows);
  } catch (error) {
    console.log(error);
  }

  return {
    id,
    title,
    content,
    author,
    image
  } as Post;
}


export const removePost = async (id: number): Promise<Post> => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('DELETE FROM posts WHERE id = ?', [id]);

  return {
    id,
  } as Post;
}
