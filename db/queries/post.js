const pool = require('../pool');

async function addNewPost(id, postContent) {
  const insertPost = `
  INSERT INTO posts (content, user) 
  VALUES ($1, $2) 
  RETURNING *;`;
  const { rows } = await pool.query(insertPost, [postContent, id]);
  return rows;
}

async function getAllPosts() {
  const posts = 'SELECT * FROM posts';
  const { rows } = await pool.query(posts);
  return rows;
}

module.exports = {
  addNewPost,
  getAllPosts,
};
