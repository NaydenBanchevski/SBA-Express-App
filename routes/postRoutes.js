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

module.exports = router;
