import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  res.status(201).json(new ApiResponse(201, comment, 'Comment created successfully'));
});

export const getAllComments = (req, res) => {
  const allComments = commentService.getAllComments();
  res.json(allComments);
};

export const getCommentsForPost = (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = commentService.getCommentsByPostId(postId);
  res.json(comments);
};

export const createCommentForPost = (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required.' });
  }

  const newComment = commentService.createComment(postId, text);
  res.status(201).json(newComment);
};
