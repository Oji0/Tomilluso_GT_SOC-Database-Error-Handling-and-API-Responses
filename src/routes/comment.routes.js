import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/', commentController.getAllComments);
router.get('/posts/:postId/comments', commentController.getCommentsForPost);
router.post('/posts/:postId/comments', commentController.createCommentForPost);
router.post('/', validateComment, commentController.createComment);

export default router;
