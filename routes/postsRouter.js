const { Router } = require('express');
const postsRouter = Router();
const postController = require('../controllers/post');

postsRouter.post('/new', postController.ensureSecureSession, postController.setNewPost);
postsRouter.post('/edit', postController.ensureSecureSession, postController.editPost);
postsRouter.post('/delete', postController.ensureSecureSession, postController.deletePost);

module.exports = postsRouter;
