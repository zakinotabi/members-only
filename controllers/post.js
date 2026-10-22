const postQueries = require('../db/queries/post');

async function setNewPost(req, res) {
  const { id, postContent } = req.body;
  await postQueries.addNewPost(id, postContent);
  return res.redirect('/');
}

module.exports = {
  setNewPost,
};
