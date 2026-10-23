const pool = require('../pool');

async function addNewPost(id, postContent) {
  const insertPost = `
  INSERT INTO posts (content, user_id) 
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

async function editPost(postId, userId, postContent) {
  const updatePost = `
    UPDATE posts
    SET content = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;

  const { rows } = await pool.query(updatePost, [postContent, postId, userId]);
  return rows[0] || null;
}

async function deletePost(postId, userId) {
  const deletePostQuery = `
    DELETE FROM posts
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(deletePostQuery, [postId, userId]);
  return rows[0] || null;
}

module.exports = {
  addNewPost,
  getAllPosts,
  editPost,
  deletePost,
};
