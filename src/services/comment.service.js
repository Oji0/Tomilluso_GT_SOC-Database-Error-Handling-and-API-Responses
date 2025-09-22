import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const createComment = async ({ content, postId, authorId }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO comments (content, postId, authorId) VALUES (?, ?, ?)',
      [content, postId, authorId]
    );

    const newCommentId = result.insertId;
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [newCommentId]);
    return rows[0];
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid postId or authorId.');
    }
    throw error;
  }
};