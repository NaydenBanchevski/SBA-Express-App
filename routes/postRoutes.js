const express = require("express");
let posts = require("../data/posts");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(posts);
});

router.post("/", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.map((post) =>
    post.id === postId ? { ...post, ...req.body } : post
  );
  res.json(posts.find((post) => post.id === postId));
});

router.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.status(204).send();
});

router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userPosts = posts.filter((post) => post.authorId === userId);
  if (userPosts.length > 0) {
    res.json(userPosts);
  } else {
    res
      .status(404)
      .json({ message: `No posts found for user with ID ${userId}` });
  }
});

module.exports = router;
