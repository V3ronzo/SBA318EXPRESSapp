const express = require('express');
const router = express.Router();
const posts = require('../routes/posts');

// Get all posts
router.get('/', (req, res) => {
  const { title } = req.query;
  let filteredPosts = posts;

  if (title) {
    filteredPosts = posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
  }

  res.json(filteredPosts);
});

// Get a single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Create a new post
router.post('/', (req, res) => {
  const { title, content, authorId } = req.body;
  const newPost = { id: posts.length + 1, title, content, authorId };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
router.patch('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content, authorId } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;
  post.authorId = authorId || post.authorId;

  res.json(post);
});

// Delete a post
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];
  res.json(deletedPost);
});

module.exports = router;