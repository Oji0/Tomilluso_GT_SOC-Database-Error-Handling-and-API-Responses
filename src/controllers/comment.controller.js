import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.status(201).json(new ApiResponse(201, comment, 'Comment created successfully'));
});

export const getAllComments = asyncHandler(async (req, res) => {
  const allComments = await commentService.getAllComments();
  res.status(200).json(new ApiResponse(200, allComments, 'All comments retrieved'));
});

export const getCommentsForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentService.getCommentsByPostId(postId);
  res.status(200).json(new ApiResponse(200, comments, 'Comments for post retrieved'));
});


export const createCommentForPost = (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required.' });
  }

  const newComment = commentService.createComment(postId, text);
  res.status(201).json(newComment);
};
