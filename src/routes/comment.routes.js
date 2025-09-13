import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/comments', commentController.getAllComments);
router.get('/posts/:postId/comments', commentController.getCommentsForPost);
router.post('/posts/:postId/comments', commentController.createCommentForPost);

export default router;
