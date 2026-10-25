const postQueries = require('../db/queries/post');

async function setNewPost(req, res) {
  const { postContent } = req.body;
  const id = req.user.id;
  const date = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  if (!id || !postContent) {
    return res.redirect('/');
  }
  await postQueries.addNewPost(id, postContent, date);
  res.redirect('/');
}

async function editPost(req, res) {
  const { postId, content } = req.body;
  const userId = req.user.id;
  const date = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (!postId || !content) {
    return res.redirect('/');
  }
  if (req.user.username == 'admin') {
    await postQueries.editPostAdmin(postId, content, date);
    return res.redirect('/');
  }

  await postQueries.editPost(postId, userId, content, date);
  res.redirect('/');
}

async function deletePost(req, res) {
  const { postId } = req.body;
  const userId = req.user.id;

  if (!postId) {
    return res.redirect('/');
  }
  if (req.user.username == 'admin') {
    await postQueries.deletePostAdmin(postId);
    return res.redirect('/');
  }

  await postQueries.deletePost(postId, userId);
  res.redirect('/');
}

// added a second verification for the session
// so this time we also match the session where we were logged in
// to avoid cookie duplication (it's not the best solution but a good practice)

function ensureSecureSession(req, res, next) {
  // 1. Check if Passport has an active authenticated session
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }

  // 2. Verify the session fingerprint
  const currentBrowser = req.headers['user-agent'];
  if (req.session.fingerprint !== currentBrowser) {
    // If the browser signature changed, destroy the session and log them out
    return req.logout((err) => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.status(401).json({ error: 'Security alert: Session environment mismatch.' });
      });
    });
  }
  next();
}

module.exports = {
  setNewPost,
  editPost,
  deletePost,
  ensureSecureSession,
};
