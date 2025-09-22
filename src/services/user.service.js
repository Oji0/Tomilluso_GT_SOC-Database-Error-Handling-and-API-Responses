import db from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import { getUserById } from './user.service.js';

export async function createUser(userData) {
  const { username, email } = userData;

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );

    const userId = result.insertId;
    const newUser = await getUserById(userId);
    return newUser;

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ApiError(409, 'Username or email already exists.');
    }

    throw error;
  }
}