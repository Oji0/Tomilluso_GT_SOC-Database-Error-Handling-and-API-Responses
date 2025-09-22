import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(new ApiResponse(201, newUser, 'User created successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(new ApiResponse(200, users, 'All users fetched successfully'));
});

export const getPostsByUser = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const posts = await userService.getPostsByAuthorId(userId);
  res.status(200).json(new ApiResponse(200, posts, 'Posts by user retrieved successfully'));
});
