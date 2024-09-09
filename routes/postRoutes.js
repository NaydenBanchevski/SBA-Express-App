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

module.exports = router;
