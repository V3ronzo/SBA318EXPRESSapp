const express = require('express');
const router = express.Router();
const comments = require('../routes/comments');

// Get all comments for a post
router.get('/post/:postId', (req, res) => {
  const postComments = comments.filter(c => c.postId === parseInt(req.params.postId));
  res.json(postComments);
});

// Create a new comment
router.post('/', (req, res) => {
  const { postId, content, authorId } = req.body;
  const newComment = { id: comments.length + 1, postId, content, authorId };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Update a comment
router.patch('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const { content } = req.body;
  comment.content = content || comment.content;

  res.json(comment);
});

// Delete a comment
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (commentIndex === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  const deletedComment = comments.splice(commentIndex, 1)[0];
  res.json(deletedComment);
});

module.exports = router;