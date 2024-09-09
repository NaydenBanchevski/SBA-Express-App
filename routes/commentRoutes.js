const express = require("express");
let comments = require("../data/comments");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(comments);
});

router.post("/", (req, res) => {
  const newComment = { id: comments.length + 1, ...req.body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;
