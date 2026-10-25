const pool = require('../pool');

async function addNewPost(id, postContent, date) {
  const insertPost = `
  INSERT INTO posts (content, user_id, latest_date) 
  VALUES ($1, $2, $3) 
  RETURNING *;`;
  const { rows } = await pool.query(insertPost, [postContent, id, date]);
  return rows;
}

async function getAllPosts() {
  const posts = 'SELECT * FROM posts';
  const { rows } = await pool.query(posts);
  return rows;
}

async function editPost(postId, userId, postContent, date) {
  const updatePost = `
    UPDATE posts
    SET content = $1,
        latest_date = $2
    WHERE id = $3 AND user_id = $4
    RETURNING *;
  `;

  const editedDate = `${date} edited`;
  const { rows } = await pool.query(updatePost, [postContent, editedDate, postId, userId]);
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

async function editPostAdmin(postId, postContent, date) {
  const updatePost = `
    UPDATE posts
    SET content = $1,
        latest_date = $2
    WHERE id = $3 
    RETURNING *;
  `;

  const editedDate = `${date} edited by admin`;
  const { rows } = await pool.query(updatePost, [postContent, editedDate, postId]);
  return rows[0] || null;
}

async function deletePostAdmin(postId) {
  const deletePostQuery = `
    DELETE FROM posts
    WHERE id = $1 
    RETURNING *;
  `;

  const { rows } = await pool.query(deletePostQuery, [postId]);
  return rows[0] || null;
}

module.exports = {
  addNewPost,
  getAllPosts,
  editPost,
  deletePost,
  editPostAdmin,
  deletePostAdmin,
};
