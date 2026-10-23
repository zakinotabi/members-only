const postQueries = require('../db/queries/post');

async function setNewPost(req, res) {
  const { postContent } = req.body;
  const id = req.user.id;
  await postQueries.addNewPost(id, postContent);
  res.redirect('/');
}

async function editPost(req, res) {
  const { postId, content } = req.body;
  const userId = req.user.id;

  if (!postId || !content) {
    return res.redirect('/');
  }

  await postQueries.editPost(postId, userId, content);
  res.redirect('/');
}

async function deletePost(req, res) {
  const { postId } = req.body;
  const userId = req.user.id;

  if (!postId) {
    return res.redirect('/');
  }

  await postQueries.deletePost(postId, userId);
  res.redirect('/');
}

module.exports = {
  setNewPost,
  editPost,
  deletePost,
};
