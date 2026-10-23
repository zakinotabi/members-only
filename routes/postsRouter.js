const { Router } = require('express');
const postsRouter = Router();
const postController = require('../controllers/post');

postsRouter.post('/new', postController.setNewPost);
postsRouter.post('/edit', postController.editPost);
postsRouter.post('/delete', postController.deletePost);

module.exports = postsRouter;
