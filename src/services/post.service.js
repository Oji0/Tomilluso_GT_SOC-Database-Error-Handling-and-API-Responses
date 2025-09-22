import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getPostById = async (id) => {
  const [rows] = await pool.query(
  `SELECT 
     p.id, 
     p.title, 
     p.content, 
     p.authorId,
     u.username AS authorUsername, 
     u.email AS authorEmail
   FROM posts p
   JOIN users u ON p.authorId = u.id
   WHERE p.id = ?`,
  [id]
);

  if (!rows[0]) {
    throw new ApiError(404, 'Post not found');
  }
  return rows[0];
};

export const getAllPosts = async () => {
  const [rows] = await pool.query(
    `SELECT 
       p.id, 
       p.title, 
       p.content, 
       p.authorId,
       u.username AS authorUsername, 
       u.email AS authorEmail
     FROM posts p
     JOIN users u ON p.authorId = u.id`
  );
  return rows;
};


export const createPost = async (postData) => {
  const { title, content, authorId } = postData;

  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
      [title, content, authorId]
    );

    const newPostId = result.insertId;
    return await getPostById(newPostId);

  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid author ID. User does not exist.');
    }

    throw error;
  }
};