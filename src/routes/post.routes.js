import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { validatePost } from '../middlewares/validator.middleware.js';

const router = Router();

router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.patchPost);
router.delete('/:id', postController.deletePost);

export default router;