import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

    export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        return res
            .status(200)
            .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
    } catch (error) {
        //...
    }
};

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = async (req, res) => {
    try {
        // The data is guaranteed to be valid here
        const newPost = await postService.createPost(req.body);
        return res
            .status(201)
            .json(new ApiResponse(201, newPost, "Post created successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, error.message));
    }
};

export const updatePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};

export const patchPost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const updates = req.body;

    const updatedPost = postService.updatePostPartial(postId, updates);
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(updatedPost);
};

export const deletePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const success = postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
};